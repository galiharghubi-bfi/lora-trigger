import { StartApplication } from "../start-application.js";
import baseConfig from "../../config.js";
import { faker } from "@faker-js/faker";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";

const licensePlate = generateLicensePlate();
// const licensePlate = "LZ5835AZZ";
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
  "$.customer.ktp.name": `${faker.person.firstName()} ${faker.person.lastName()}`.toUpperCase(),
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
  "$.customer.personal.number_dependents": 5
};

export const Ndf4w = async () => {
  const { workflowId, start } = await StartApplication();
  try {
    await start;
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
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
    await new Promise((resolve) => setTimeout(resolve, 30000));
    await sendMq(workflowId, videoUrl.url);
  } catch (error) {
    console.error(error);
  }
};
