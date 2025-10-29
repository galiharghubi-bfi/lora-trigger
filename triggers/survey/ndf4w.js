import { faker } from "@faker-js/faker";
import baseConfig from "../../config.js";
import { StartApplication } from "../start-application.js";
import { sendMq } from "../trigger-appointment.js";
import { generateLicensePlate } from "../utils/license_plate.js";
import { mapActor } from "./ndf2w.js";

const licensePlate = generateLicensePlate();
// const licensePlate = "LZ5835AZZ";
const payload = {
  "$.asset.asset_code": "DAIHATSU.AYLA.D10AT",
  "$.asset.bpkb_ownership": "1",
  "$.asset.bpkb_status": "on_hand",
  "$.asset.license_plate": licensePlate,
  "$.asset.manufacturing_year": "2021",
  "$.asset.stnk_status": "ACTIVE",
  "$.asset.tax_status": "tax_paid_off",
  "$.channel.activity_id": "DPBR",
  "$.channel.ekyc_authority": "partner",
  "$.channel.ktp_forgery_authority": "bfi",
  "$.channel.ktp_ocr_required": false,
  "$.channel.marketing_id": "2403NC0006",
  "$.channel.partner_id": "15871124-0258-4e3f-9f31-bc995e348a8d",
  "$.channel.partner_internal_name": "partner-goto",
  "$.channel.soa_id": "28",
  "$.customer.bank_information.account_name": "MULTIFINANCE ANAK BANGSA GOTO",
  "$.customer.bank_information.account_number": "0010988888",
  "$.customer.bank_information.bank_id": 47,
  "$.customer.contact.email": "LULLABYANGEL22@GMAIL.COM",
  "$.customer.contact.mobile_number": "+6282268115697",
  "$.customer.domicile.address.street_address": "JL KEBAGUSAN AJA",
  "$.customer.domicile.address.sub_district_code": "32.73.27.1003",
  "$.customer.domicile.ownership_code": "SD",
  "$.customer.ktp.birth_date": "1997-06-03",
  "$.customer.ktp.birth_place": "CILALUNG",
  "$.customer.ktp.city": "Bandung",
  "$.customer.ktp.district": "Gedebage",
  "$.customer.ktp.gender": "M",
  "$.customer.ktp.name": `${faker.name.firstName('male')} ${faker.name.lastName('male')}`,
  "$.customer.ktp.nik": "3603281212930007",
  "$.customer.ktp.province": "Jawa Barat",
  "$.customer.ktp.street_address": "JALAN JALAN",
  "$.customer.ktp.sub_district": "Rancabolang (Rancabalong)",
  "$.customer.ktp.sub_district_code": "32.73.27.1003",
  "$.customer.ktp.zip_code": "40295",
  "$.customer.personal.marital_status_code": "S",
  "$.customer.personal.number_dependents": "1",
  "$.customer.professional.education_code": "S1",
  "$.customer.professional.length_current_job": "LESS_THAN_15",
  "$.customer.professional.monthly_income": "200000000",
  "$.customer.professional.npwp": "640207610689009",
  "$.customer.professional.npwp_matches_nik": false,
  "$.customer.professional.occupation_type_code": "M",
  "$.documents.ktp.document_id": "13d5a67a-3ed8-4be7-b971-84f962b0eed0",
  "$.documents.selfie.document_id": "223542c1-5e1e-4226-8ea3-12bbbb8abe13",
  "$.loan_structure.original_amount": "45000000",
  "$.loan_structure.product_id": 1,
  "$.loan_structure.product_offering": 53,
  "$.loan_structure.tenure": 12,
  "$.process.user_consent_timestamp": "2025-07-10T07:25:31.688783604Z",
  "$.customer.professional.occupation_code": "PNSBPKAGTU",
  "$.loan_structure.ltv": 0.894138,
  "$.loan_structure.funding_ratio": 0.805039,
  "$.loan_structure.max_funding": 61677000,
  "$.loan_structure.interest_rate": 0.41,
  "$.loan_structure.life_insurance_premium": 186000,
  "$.loan_structure.asset_insurance_premium": 0,
  "$.loan_structure.admin_fee": 327000,
  "$.loan_structure.provision_fee": 461375,
  "$.loan_structure.capitalized_ntf_amount": 11534375,
  "$.loan_structure.monthly_installment": 712500,
  "$.loan_structure.provisional_amount": 45000000
};

export const Ndf4w = async (actor) => {
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
    console.log(`✔ Actor: ${actor}`);
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
    await new Promise((resolve) => setTimeout(resolve, 15000));
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "4W_REGULAR_SURVEY",
      appointment_uuid: crypto.randomUUID(),
      ...(mapActor[actor] ?? mapActor['admin']),
    });
  } catch (error) {
    console.error(error);
  }
};
