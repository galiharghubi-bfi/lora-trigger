import { Ndf4w } from "./ndf4w.js";
import { Ndf4wFormAutomation } from "../automation/ndf4w-form-submission.js";
import { faker } from "@faker-js/faker/locale/id_ID";
import baseConfig from "../../config.js";
import { StartApplication } from "../start-application.js";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { mapActor } from "./ndf2w.js";
import { generateNdf4wHighRiskPayload } from "./payloads/ndf4w-high.js";
import { generateNdf4wLowRiskPayload } from "./payloads/ndf4w-low.js";

/**
 * Enhanced NDF4W trigger that creates the application and then
 * automatically completes all survey form pages
 * @param {string} actor - Actor type (admin, vd, etc.)
 * @returns {Promise<void>}
 */
export const Ndf4wWithAutomation = async (actor, riskLevel = "high") => {
  const { workflowId, start } = await StartApplication();
  const licensePlate = generateLicensePlate();
  const customerName = `${faker.person.firstName()} ${faker.person.lastName()}`.toUpperCase();

  let payload = generateNdf4wHighRiskPayload({
    licensePlate,
    customerName,
  });
  if (riskLevel === "low") {
    payload = generateNdf4wLowRiskPayload({
      licensePlate,
      customerName,
    })
  }

  try {
    await start;

    // Submit initial application data
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Creating NDF4W Application`);
    console.log(`${"=".repeat(60)}\n`);

    await fetch(`${baseConfig.lgs_base_url}/application/${workflowId}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Get video URL
    const res = await fetch(`${baseConfig.lts_base_url}/rtc/web/url`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const videoUrl = await res.json();

    console.log(`✔ Video URL: ${videoUrl.url}`);
    console.log(`✔ Task generated with workflowId: ${workflowId}`);
    console.log(`✔ License plate: ${licensePlate}`);
    console.log(`✔ Actor: ${actor}`);
    console.log(`✔ Risk level: ${riskLevel}`);
    console.log(`✔ Customer name: ${customerName}`);

    const selectedActor = mapActor[actor] ?? mapActor["admin"]

    // Send appointment MQ message
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "4W_REGULAR_SURVEY",
      appointment_uuid: crypto.randomUUID(),
      ...(selectedActor),
    });

    console.log(`✔ Appointment message sent to MQ\n`);

    const userId = selectedActor.resource_identifiers

    // Run form automation
    await Ndf4wFormAutomation(workflowId, userId, licensePlate, customerName, riskLevel);
  } catch (error) {
    console.error(`\n✖ Error in NDF4W with automation:`, error);
    throw error;
  }
};
