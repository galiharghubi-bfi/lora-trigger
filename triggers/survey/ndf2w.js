import { faker } from "@faker-js/faker/locale/id_ID";
import baseConfig from "../../config.js";
import { StartApplication } from "../start-application.js";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { generateNdf2wPayload } from "./payloads/ndf2w.js";

export const mapActor = {
  admin: {
    resource_identifiers: "000000",
    resource_type_code: "ADMIN_SURVEY",
    location_type_code: "VIRTUAL",
  },
  vd: {
    resource_identifiers: "000004",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "CUSTOMER_HOME",
  },
  vd_branch_visit: {
    resource_identifiers: "999005",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "BFI_OFFICE",
  },
  vd_custom: {
    resource_identifiers: "999006",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "BFI_OFFICE",
  },
};

export const Ndf2w = async (actor) => {
  const { workflowId, start } = await StartApplication();
  try {
    await start;

    const licensePlate = generateLicensePlate();
    const customerName =
      `${faker.person.firstName()} ${faker.person.lastName()}`.toUpperCase();

    let payload = generateNdf2wPayload({
      licensePlate,
      customerName,
    });

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
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "2W_REGULAR_SURVEY",
      appointment_uuid: crypto.randomUUID(),
      ...(mapActor[actor] ?? mapActor["admin"]),
    });
  } catch (error) {
    console.error(error);
  }
};
