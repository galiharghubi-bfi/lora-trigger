import baseConfig from "../../config.js";
import { CaFormAutomation } from "../automation/ca-form-submission.js";
import { StartApplication } from "../start-application.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { generatePayloadCa } from "./payloads/ca.js";

const licensePlate = generateLicensePlate();

export const CaWithAutomation = async () => {
  const { workflowId, start } = await StartApplication();
  try {
    const payload = generatePayloadCa(licensePlate);
    await start;
    await fetch(`${baseConfig.lgs_base_url}/application/${workflowId}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(`✔ Task generated with workflowId: ${workflowId}`);
    console.log(`✔ License plate: ${payload["$.asset.license_plate"]}`);
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);

    await CaFormAutomation(
      workflowId,
      "000003",
      licensePlate,
      payload["$.customer.ktp.name"],
      "high"
    );
  } catch (error) {
    console.error(error);
  }
};
