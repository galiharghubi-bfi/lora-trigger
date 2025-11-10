import { Ndf4w } from "./ndf4w.js";
import { Ndf4wFormAutomation } from "../automation/ndf4w-form-submission.js";
import { faker } from "@faker-js/faker/locale/id_ID";
import baseConfig from "../../config.js";
import { StartApplication } from "../start-application.js";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { mapActor } from "./ndf2w.js";

/**
 * Enhanced NDF4W trigger that creates the application and then
 * automatically completes all survey form pages
 * @param {string} actor - Actor type (admin, vd, etc.)
 * @returns {Promise<void>}
 */
export const Ndf4wWithAutomation = async (actor) => {
  const { workflowId, start } = await StartApplication();
  const licensePlate = generateLicensePlate();
  const customerName = `${faker.person.firstName()} ${faker.person.lastName()}`.toUpperCase();

  const payload = {
    "$.asset.stnk_status": "ACTIVE",
    "$.asset.asset_code": "DAIHATSU.AYLA.D10AT",
    "$.asset.bpkb_ownership": "1",
    "$.asset.bpkb_status": "on_hand",
    "$.asset.license_plate": licensePlate,
    "$.asset.manufacturing_year": 2021,
    "$.asset.tax_status": "tax_paid_off",
    "$.channel.activity_id": "DPBR",
    "$.channel.ekyc_authority": "partner",
    "$.channel.partner_id": "15871124-0258-4e3f-9f31-bc995e348a8d",
    "$.channel.ktp_ocr_required": false,
    "$.channel.marketing_id": "2311NC0006",
    "$.channel.partner_internal_name": "partner-goto",
    "$.channel.soa_id": "28",
    "$.customer.bank_information.account_name": "MULTIFINANCE ANAK BANGSA GOTO",
    "$.customer.bank_information.account_number": "0010988888",
    "$.customer.bank_information.bank_id": 47,
    "$.customer.contact.mobile_number": "+6282178593737",
    "$.customer.domicile.address.street_address": "JL. JAKARTA RAYA",
    "$.customer.domicile.address.sub_district_code": "32.73.27.1003",
    "$.customer.domicile.ownership_code": "SD",
    "$.customer.ktp.birth_date": "1997-04-24",
    "$.customer.ktp.birth_place": "MANOKWARI",
    "$.customer.ktp.gender": "M",
    "$.customer.ktp.name": customerName,
    "$.customer.ktp.nik": "3674066302020005",
    "$.customer.ktp.street_address": "JALAN JALAN",
    "$.customer.ktp.sub_district_code": "32.01.36.2004",
    "$.customer.ktp.zip_code": "16841",
    "$.customer.personal.marital_status_code": "S",
    "$.customer.professional.education_code": "S1",
    "$.customer.professional.monthly_income": "10000000",
    "$.customer.professional.occupation_type_code": "M",
    "$.documents.ktp.document_id": "1a82f0ab-9369-4053-bd54-329736d5b072",
    "$.documents.selfie.document_id": "b66028a9-78c9-4976-8784-990bd1636a9e",
    "$.loan_structure.original_amount": 12690000,
    "$.loan_structure.product_id": 1,
    "$.loan_structure.product_offering": 37,
    "$.loan_structure.tenure": 12,
    "$.process.survey_task.surveyor_employee_name": "Joko Anwar",
    "$.customer.personal.number_dependents": 5,
  };

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
    console.log(`✔ Customer name: ${customerName}`);

    // Wait before sending MQ message
    console.log(`\nWaiting 15 seconds before sending appointment...`);
    await new Promise((resolve) => setTimeout(resolve, 15000));

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
    await Ndf4wFormAutomation(workflowId, userId, licensePlate, customerName);
  } catch (error) {
    console.error(`\n✖ Error in NDF4W with automation:`, error);
    throw error;
  }
};
