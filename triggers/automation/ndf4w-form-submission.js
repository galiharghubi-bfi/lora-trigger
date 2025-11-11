import { Database } from "arangojs";
import baseConfig from "../../config.js";
import { DEFAULT_FORM_SEQUENCE, LOW_RISK_FORM_SEQUENCE } from "./pages/index.js";

/**
 * Utility function to wait/sleep for a specified duration
 * @param {number} ms - Milliseconds to wait
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Query ArangoDB to find the SURVEY task for a given workflow ID (single query)
 * @param {string} workflowId - The workflow/document ID
 * @returns {Promise<string|null>} - Task ID or null if not found
 */
export const queryTask = async (workflowId) => {
  try {
    const db = new Database({
      url: baseConfig.arango_url,
      auth: {
        username: baseConfig.arango_user,
        password: baseConfig.arango_password,
      },
      databaseName: baseConfig.arango_db,
    });

    const query = `
      FOR task IN task
        FILTER task.document_id == @workflowId
        FILTER task.type == "SURVEY"
        LIMIT 1
        RETURN task.id
    `;

    const cursor = await db.query(query, { workflowId });
    const results = await cursor.all();

    if (results.length > 0) {
      return results[0];
    }

    return null;
  } catch (error) {
    console.error(`✖ Error querying ArangoDB:`, error.message);
    return null;
  }
};

/**
 * Wait for task to be created with retry logic
 * @param {string} workflowId - The workflow/document ID
 * @param {number} retryInterval - Time between retries in ms (default: from config)
 * @param {number} timeout - Total timeout in ms (default: from config)
 * @returns {Promise<string>} - Task ID
 * @throws {Error} - If task not found within timeout
 */
export const waitForTask = async (
  workflowId,
  retryInterval = baseConfig.automation.task_poll_interval_ms,
  timeout = baseConfig.automation.task_poll_timeout_ms
) => {
  const startTime = Date.now();
  let attempt = 0;

  console.log(
    `Polling for task creation (retry every ${retryInterval / 1000}s, timeout: ${timeout / 1000}s)...`
  );

  while (Date.now() - startTime < timeout) {
    attempt++;
    const taskId = await queryTask(workflowId);

    if (taskId) {
      console.log(
        `✔ Found task ID: ${taskId} (after ${attempt} attempt${attempt > 1 ? "s" : ""}, ${((Date.now() - startTime) / 1000).toFixed(1)}s)`
      );
      return taskId;
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(
      `⚠ Attempt ${attempt}: Task not found yet (elapsed: ${elapsed}s), retrying...`
    );

    await sleep(retryInterval);
  }

  throw new Error(
    `Task not found for workflow ${workflowId} after ${timeout / 1000}s timeout`
  );
};

/**
 * Get the current task detail and form state
 * @param {string} taskId - The task ID
 * @param {string} userId - The user ID for x-user-id header
 * @returns {Promise<Object>} - Task detail response with form_name
 */
export const getTaskDetail = async (taskId, userId) => {
  try {
    const response = await fetch(
      `${baseConfig.lts_base_url}/task/${taskId}?mode=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "lora-trigger-automation",
          "x-user-id": userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const taskDetail = await response.json();
    return taskDetail;
  } catch (error) {
    console.error(`✖ Error getting task detail:`, error.message);
    throw error;
  }
};

/**
 * Submit form data for a specific task
 * @param {string} taskId - The task ID
 * @param {string} userId - The user ID for x-user-id header
 * @param {Object} payload - Form payload to submit
 * @returns {Promise<Object>} - Response from submission
 */
export const submitForm = async (taskId, userId, payload) => {
  try {
    const response = await fetch(
      `${baseConfig.lts_base_url}/task/${taskId}/action?mode=ssr`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "lora-trigger-automation",
          "x-user-id": userId,
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "HX-Request": "true",
          "HX-Target": "form-container",
          Origin: "http://localhost:3000",
          DNT: "1",
          "Sec-GPC": "1",
          Connection: "keep-alive",
          Referer: "http://localhost:3000/",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    return { success: true, status: response.status };
  } catch (error) {
    console.error(`✖ Error submitting form:`, error.message);
    throw error;
  }
};

/**
 * Wait for form state to change after submission with retry logic
 * @param {string} taskId - The task ID
 * @param {string} userId - The user ID for x-user-id header
 * @param {string} currentFormName - Current form name to check against
 * @param {number} maxRetries - Maximum retry attempts (default: from config)
 * @param {number} retryDelay - Delay between retries in ms (default: from config)
 * @returns {Promise<Object>} - New task detail
 */
export const waitForFormChange = async (
  taskId,
  userId,
  currentFormName,
  maxRetries = baseConfig.automation.form_change_max_retries,
  retryDelay = baseConfig.automation.form_change_retry_delay_ms
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    await sleep(retryDelay);

    const taskDetail = await getTaskDetail(taskId, userId);
    const newFormName = taskDetail.form_name || taskDetail.formName;

    if (newFormName !== currentFormName) {
      console.log(
        `✔ Form changed from "${currentFormName}" to "${newFormName}"`
      );
      return taskDetail;
    }

    console.log(
      `⚠ Form still "${currentFormName}" after attempt ${attempt}/${maxRetries}, retrying...`
    );
  }

  console.log(
    `⚠ Form did not change after ${maxRetries} retries, continuing anyway...`
  );
  return await getTaskDetail(taskId, userId);
};

/**
 * Execute a sequence of form submissions with validation and retry logic
 * @param {string} taskId - The task ID
 * @param {string} userId - The user ID for x-user-id header
 * @param {Array<Function>} formSequence - Array of form page functions
 * @param {Object} params - Parameters to pass to form functions (e.g., licensePlate)
 * @param {number} delayBetweenPages - Delay in ms between successful pages (default: from config)
 * @returns {Promise<void>}
 */
export const executeFormSequence = async (
  taskId,
  userId,
  formSequence = DEFAULT_FORM_SEQUENCE,
  params = {},
  delayBetweenPages = baseConfig.automation.form_submission_delay_ms
) => {
  console.log(
    `\n${"=".repeat(60)}\nStarting form automation for task: ${taskId}\n${"=".repeat(60)}\n`
  );

  for (let i = 0; i < formSequence.length; i++) {
    const pageNumber = i + 1;
    const pageFunction = formSequence[i];

    try {
      console.log(`\n--- Page ${pageNumber}/${formSequence.length} ---`);

      // Get current task state
      const taskDetail = await getTaskDetail(taskId, userId);
      const currentFormName = taskDetail.form_name || taskDetail.formName;
      console.log(`Current form: ${currentFormName}`);

      // Generate form payload
      const { formName: expectedFormName, payload } = pageFunction(
        taskId,
        params
      );

      // Submit form
      console.log(`Submitting form: ${expectedFormName}...`);
      await submitForm(taskId, userId, payload);
      console.log(`✔ Page ${pageNumber} submitted successfully`);

      // Wait for form to change (with retry logic)
      if (i < formSequence.length - 1) {
        await sleep(delayBetweenPages);
        await waitForFormChange(taskId, userId, currentFormName);
      }
    } catch (error) {
      console.error(`✖ Error on Page ${pageNumber}:`, error.message);
      console.log(`Continuing to next page despite error...`);
    }
  }

  console.log(
    `\n${"=".repeat(60)}\n✔ Form automation completed for task: ${taskId}\n${"=".repeat(60)}\n`
  );
};

/**
 * Main automation entry point
 * Waits for task creation, then executes the full form sequence
 * @param {string} workflowId - Workflow ID from application creation
 * @param {string} userId - User ID for x-user-id header
 * @param {string} licensePlate - License plate for the vehicle
 * @param {string} customerName - Customer name (for logging)
 * @param {string} riskLevel - Risk level: "high" or "low" (default: "high")
 * @param {Array<Function>} customSequence - Optional custom form sequence
 * @returns {Promise<void>}
 */
export const Ndf4wFormAutomation = async (
  workflowId,
  userId,
  licensePlate,
  customerName,
  riskLevel = "high",
  customSequence = null
) => {
  try {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Starting 4W ${riskLevel.toUpperCase()} Risk Form Automation`);
    console.log(`Workflow ID: ${workflowId}`);
    console.log(`License Plate: ${licensePlate}`);
    console.log(`Customer Name: ${customerName}`);
    console.log(`${"=".repeat(60)}\n`);

    // Poll for task to be created in database (3s interval, 2min timeout)
    const taskId = await waitForTask(workflowId);

    // Execute form sequence based on risk level
    const sequence = customSequence ||
      (riskLevel === "low" ? LOW_RISK_FORM_SEQUENCE : DEFAULT_FORM_SEQUENCE);
    await executeFormSequence(taskId, userId, sequence, { licensePlate });

    // Get final task state (skip for completion pages as task may be removed)
    const lastPage = sequence[sequence.length - 1];
    const lastPageInfo = lastPage(taskId, { licensePlate });
    const isCompletionPage = lastPageInfo.formName === "form_success_show";

    if (!isCompletionPage) {
      const finalTaskDetail = await getTaskDetail(taskId, userId);
      console.log(
        `\n✔ Final task state: ${finalTaskDetail.form_name || finalTaskDetail.formName}`
      );
    } else {
      console.log(`\n✔ Task completed successfully (completion page submitted)`);
    }
    console.log(`✔ Automation completed successfully!\n`);
    console.log(`✔ Workflow ID: ${workflowId}`);
    console.log(`✔ Customer Name: ${customerName}`);
  } catch (error) {
    console.error(`\n✖ Automation failed:`, error.message);
    throw error;
  }
};
