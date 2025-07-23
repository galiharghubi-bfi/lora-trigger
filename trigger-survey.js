import { StartApplication } from "./start-application.js";
import baseConfig from "./config.js";
import { faker } from "@faker-js/faker";
import { sendMq } from "./trigger-appointment.js";
const generateLicensePlate = () => {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomLetters(min, max) {
    const length = randomInt(min, max);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length }, () => chars[randomInt(0, 25)]).join("");
  }

  const part1 = randomLetters(1, 2);
  const part2 = randomInt(1, 9999).toString();
  const part3 = randomLetters(1, 3);

  return `${part1}${part2}${part3}`;
};

const licensePlate = generateLicensePlate();
// const licensePlate = "LZ5835AZZ";
const payload = {
  "$.asset.asset_code": "MTRHONDA.VARIO.125FICBS",
  "$.asset.bpkb_ownership": "1",
  "$.asset.bpkb_status": "on_hand",
  "$.asset.license_plate": licensePlate,
  "$.asset.manufacturing_year": "2021",
  "$.asset.tax_status": "tax_paid_off",
  "$.channel.ekyc_authority": "partner",
  "$.channel.ktp_forgery_authority": "partner",
  "$.channel.ktp_ocr_required": false,
  "$.channel.marketing_id": "2403NC0005",
  "$.channel.partner_id": "907d075e-5cef-4179-940e-794946b6eb33",
  "$.channel.partner_internal_name": "partner-goto",
  "$.channel.soa_id": "28",
  "$.customer.bank_information.account_name": "MULTIFINANCE ANAK BANGSA GOTO",
  "$.customer.bank_information.account_number": "0010988888",
  "$.customer.bank_information.bank_id": 47,
  "$.customer.contact.mobile_number": "+6282178593737",
  "$.customer.domicile.address.street_address": "Jl. Jakarta Raya",
  "$.customer.domicile.address.sub_district_code": "12.71.05.1002",
  "$.customer.domicile.ownership_code": "SD",
  "$.customer.ktp.birth_date": "1997-04-24",
  "$.customer.ktp.birth_place": "MANOKWARI",
  "$.customer.ktp.gender": "M",
  "$.customer.ktp.name": `${faker.person.firstName()} ${faker.person.lastName()}`,
  "$.customer.ktp.nik": "3328182404970002",
  "$.customer.ktp.street_address": "JALAN JALAN",
  "$.customer.ktp.sub_district_code": "32.01.36.2004",
  "$.customer.ktp.zip_code": "16841",
  "$.customer.personal.marital_status_code": "S",
  "$.customer.professional.education_code": "S1",
  "$.customer.professional.monthly_income": "10000000",
  "$.customer.professional.occupation_type_code": "M",
  "$.documents.ktp.document_id": "e8c507c0-94f7-4418-9d1a-8a4d5e180c2f",
  "$.documents.selfie.document_id": "e8c507c0-94f7-4418-9d1a-8a4d5e180c2f",
  "$.loan_structure.product_id": 2,
  "$.loan_structure.product_offering": 11,
  "$.loan_structure.original_amount": "12690000",
  "$.loan_structure.tenure": 12,
  "$.customer.professional.occupation_code": "PNSBPKAGTU",
};

(async () => {
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
})();
