import baseConfig from "../../config.js";
import { CaFormAutomation } from "../automation/ca-form-submission.js";
import { StartApplication } from "../start-application.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { generatePayloadCa } from "./payloads/ca.js";

const licensePlate = generateLicensePlate();

export const CaWithAutomation = async ({ continuationId, customerName }) => {
  let name = customerName || "DEFAULT_CUSTOMER";
  try {
    let id;
    if (!continuationId) {
      const { workflowId, start } = await StartApplication();
      id = workflowId;
      const payload = generatePayloadCa(licensePlate);
      name = payload["$.customer.ktp.name"];
      await start;
      await fetch(`${baseConfig.lgs_base_url}/application/${id}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(`✔ Task generated with workflowId: ${id}`);
      console.log(`✔ License plate: ${payload["$.asset.license_plate"]}`);
      console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
    } else {
      id = continuationId;
    }

    await CaFormAutomation(id, "000003", licensePlate, name, "high");
  } catch (error) {
    console.error(error);
  }
};
