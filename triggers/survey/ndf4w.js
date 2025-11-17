import { faker } from "@faker-js/faker/locale/id_ID";
import baseConfig from "../../config.js";
import { StartApplication } from "../start-application.js";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { mapActor } from "./ndf2w.js";
import { generateNdf4wHighRiskPayload } from './payloads/ndf4w-high.js'
import { generateNdf4wLowRiskPayload } from './payloads/ndf4w-low.js'

const licensePlate = generateLicensePlate();
const customerName = `${faker.person.firstName()} ${faker.person.lastName()}`.toUpperCase();

export const Ndf4w = async (actor, riskLevel = "high") => {
  const { workflowId, start } = await StartApplication();
  try {
    await start;

    let payload = generateNdf4wHighRiskPayload({
      licensePlate,
      customerName,
    });
    if (riskLevel == "low") {
      payload = generateNdf4wLowRiskPayload({
        licensePlate,
        customerName,
      });
    }

    await fetch(`${baseConfig.lgs_base_url}/application/${workflowId}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await fetch(`${baseConfig.lts_base_url}/rtc/web/url`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const videoUrl = await res.json();
    console.log(`✔ Video URL: ${videoUrl.url}`);
    console.log(`✔ Task generated with workflowId: ${workflowId}`);
    console.log(`✔ License plate: ${payload["$.asset.license_plate"]}`);
    console.log(`✔ Actor: ${actor}`);
    console.log(`✔ Risk level: ${riskLevel}`);
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "4W_REGULAR_SURVEY",
      appointment_uuid: crypto.randomUUID(),
      ...(mapActor[actor] ?? mapActor['admin']),
    });
  } catch (error) {
    console.error(error);
  }};
