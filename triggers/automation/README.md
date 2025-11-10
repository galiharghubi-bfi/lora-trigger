# 4W High Risk Form Automation

Automated form submission for 4W High Risk survey workflow, completing all 10 pages from PIN entry to final financing verification.

## Overview

This automation script:
1. Creates a NDF4W application submission
2. Waits for the SURVEY task to be created in ArangoDB
3. Automatically completes all 10 form pages in sequence
4. Handles form state transitions with retry logic
5. Validates each page submission before proceeding

## Prerequisites

1. **Install Dependencies**
   ```bash
   cd lora-trigger
   npm install
   # or
   pnpm install
   ```

2. **ArangoDB Access**
   - Ensure ArangoDB is running at `http://localhost:8529`
   - Database: `test`
   - Credentials configured in `config.js` (default: `root:root`)

3. **Backend Services Running**
   - Schema Service (port 8080)
   - Gateway Service (port 8081)
   - Task Service (port 8082)
   - All Temporal workers active

## Usage

### Run Full Automation

```bash
# Run with default admin actor
node index.js automation ndf4w-full

# Run with specific actor (admin, vd, vd_branch_visit, vd_custom)
node index.js automation ndf4w-full actor=vd
```

### What Happens

1. **Application Creation** (~5 seconds)
   - Generates random license plate and customer name
   - Creates NDF4W application via Gateway Service
   - Sends appointment to MQ
   - Returns `workflowId`

2. **Task Discovery** (~15 seconds)
   - Waits for task creation in ArangoDB
   - Queries for SURVEY task matching `workflowId`
   - Retrieves `taskId`

3. **Form Sequence Execution** (~2-3 minutes)
   - Page 1: PIN Challenge
   - Page 2: Verification (Customer, Asset, Loan)
   - Page 3: Asset & Document (Initial)
   - Page 4: Asset & Condition
   - Page 5: Info Lainnya
   - Page 6: Info Tambahan
   - Page 7: Financing
   - Page 8: Penyerahan BPKB
   - Page 9: Asset & Dokumen (Comprehensive)
   - Page 10: Financing Final

4. **Completion**
   - Logs final task state
   - Returns success status

## Configuration

All automation timing and retry settings are configured in [`config.js`](../../config.js):

```javascript
automation: {
  // Task polling settings (waitForTask)
  task_poll_interval_ms: 3000,        // Poll every 3 seconds
  task_poll_timeout_ms: 120000,       // 2 minutes total timeout

  // Form state change retry settings (waitForFormChange)
  form_change_max_retries: 3,         // Max retry attempts
  form_change_retry_delay_ms: 10000,  // 10 seconds between retries

  // Form submission delay (executeFormSequence)
  form_submission_delay_ms: 5000,     // 5 seconds between pages
}
```

### Task Polling
- **Interval:** Poll ArangoDB every **3 seconds** to check if task is created
- **Timeout:** Stop polling after **2 minutes** if task not found
- **Smart Wait:** Starts automation immediately when task is found (no static wait!)

### Form Submission
- **Delay between pages:** **5 seconds** after successful submission
- **Retry on no state change:** **3 attempts**, **10 seconds** between each

### ArangoDB Settings

```javascript
arango_url: "http://127.0.0.1:8529",
arango_db: "test",
arango_user: "root",
arango_password: "root",
```

## Custom Form Sequences

You can create custom page sequences by modifying the order or skipping pages:

```javascript
import {
  Page1PIN,
  Page2Verification,
  Page7Financing
} from "./pages/index.js";

// Custom sequence (only PIN + Verification + Financing)
const customSequence = [
  Page1PIN,
  Page2Verification,
  Page7Financing,
];

await executeFormSequence(taskId, customSequence, { licensePlate });
```

## Architecture

### Files

- **`pages/`** - Individual page payload template files
  - Each page exports a function: `PageXName(taskId, params)`
  - Returns `{ formName, payload }`
  - Easy to modify or add new pages
  - Exported via `pages/index.js`

- **`ndf4w-form-submission.js`** - Core automation logic
  - `waitForTask(workflowId)` - Query ArangoDB
  - `getTaskDetail(taskId)` - GET current form state
  - `submitForm(taskId, payload)` - POST form data
  - `waitForFormChange()` - Retry logic for state transitions
  - `executeFormSequence()` - Orchestrate page submissions
  - `Ndf4wFormAutomation()` - Main entry point

- **`ndf4w-with-automation.js`** - Integration wrapper
  - Combines original `Ndf4w` trigger with automation
  - Captures workflow metadata (ID, license plate, customer name)
  - Executes full automation after application creation

- **`index.js`** - Re-exports for easy imports

### Error Handling

- **Form Submission Errors**: Logged but don't stop execution
- **State Transition Timeout**: Retries up to 3 times with 10s delay
- **Task Not Found**: Throws error and stops automation
- **Database Connection Errors**: Throws error immediately

## Troubleshooting

### Task Not Found
```
⚠ No SURVEY task found for workflow: xxx
```
**Solution**:
- Check Temporal workers are running
- Verify workflow was created successfully
- Increase initial wait time (line 197 in `ndf4w-form-submission.js`)

### Form State Not Changing
```
⚠ Form still "form_verification_show" after attempt 3/3
```
**Solution**:
- Check Task Service logs for errors
- Verify payload data is valid
- Manually test the page in UI to see if there are validation errors

### ArangoDB Connection Refused
```
✖ Error querying ArangoDB: connect ECONNREFUSED 127.0.0.1:8529
```
**Solution**:
- Start ArangoDB: `docker-compose up -d arangodb` (from lora-tools/docker/shared)
- Verify credentials in `config.js`

### HTTP 400/500 Errors
```
✖ Error submitting form: HTTP 400: Bad Request
```
**Solution**:
- Check payload format in `pages/` files
- Compare with successful Insomnia requests
- Verify document IDs are valid UUIDs

## Testing Individual Pages

You can test single pages without running the full sequence:

```javascript
import { submitForm } from "./ndf4w-form-submission.js";
import { Page2Verification } from "./pages/index.js";

const taskId = "your-task-id-here";
const { payload } = Page2Verification(taskId, {
  licensePlate: "B1234XYZ"
});

await submitForm(taskId, payload);
```

## Future Enhancements

Potential improvements:
- Add support for LOW RISK variant
- Add support for NDF2W automation
- Parameterize document IDs (upload real documents)
- Add screenshots on errors
- Generate test report with timestamps
- Support for conditional page flows (skip pages based on risk level)

## Related Files

- Original trigger: [`triggers/survey/ndf4w.js`](../survey/ndf4w.js)
- Insomnia collection: [`Insomnia_2025-11-07.yaml`](../../Insomnia_2025-11-07.yaml)
- Configuration: [`config.js`](../../config.js)
