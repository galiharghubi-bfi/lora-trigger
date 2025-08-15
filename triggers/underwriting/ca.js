import { StartApplication } from "../start-application.js";
import baseConfig from "../../config.js";
import { faker } from "@faker-js/faker";
import { sendMq } from "../trigger-appointment.js";
import { cleansedName } from "../utils/cleanse.js";
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
  "$.status.application": "approved",
  "$.asset.license_plate": licensePlate,
  "$.customer.ktp.nik": "3173334212960003",
  "$.customer.ktp.name": `${cleansedName(
    faker.person.firstName()
  )} ${cleansedName(faker.person.lastName())}`,
  "$.loan_structure.risk_level": "HIGH",
  "$.loan_structure.product_id": 1,
  "$.process.survey_task.survey_branch_id": "401",
  "$.process.survey_task.surveyor_employee_id": "000004",
  "$.process.operations_task.processing_branch_id": "401",
  "$.submission_date": "2025-04-07T18:00:00Z",
  "$.customer.contact.mobile_number": "+6281234567891",
  "$.customer.ktp.birth_date": "1980-12-03",
  "$.customer.ktp.birth_place": "jakarta",
  "$.customer.ktp.gender": "F",
  "$.customer.professional.npwp": "123123123123123",
  "$.customer.personal.marital_status_code": "M",
  "$.spouse.ktp.nik": "3173334212960003",
  "$.spouse.ktp.name": `${cleansedName(
    faker.person.firstName()
  )} ${cleansedName(faker.person.lastName())}`,
  "$.spouse.mobile_number": "+6281234567890",
  "$.customer.personal.number_dependents": 2,
  "$.documents.ktp.document_id": "9888d558-8480-4dbe-95fd-07e2dadbede3",
  "$.documents.kk.document_id": "dc9991b3-a826-481d-bc19-1bdccf555f75",
  "$.documents.selfie.document_id": "17d25972-e99f-4ec0-91d9-540a7090cdb2",
  "$.documents.spouse_ktp.document_id": "2e564529-d5b4-407b-adfe-a725d903bb3b",
  "$.documents.interview.document_id": "4f7a5a7e-32f7-46a9-8c4e-f409bd7e0163",
  "$.documents.npwp.document_id": "4ba5fb49-5cf8-4513-b3be-6eb2664f9b66",
  "$.documents.marriage_certificate.document_id":
    "c168598b-39d7-4164-bb14-cdb1f49ad50b",
  "$.documents.divorce_certificate.document_id":
    "7c5c3f30-5d28-4efb-90a9-1d25c302a668",
  "$.documents.death_certificate.document_id":
    "b01e39bf-4f1d-4c29-87dd-5ef29c4c3bc3",
  "$.documents.debtor_signature.document_id":
    "7119ccfd-d256-4c8e-9ad5-c18387ac42e4",
  "$.documents.spouse_signature.document_id":
    "31156555-2489-4708-bf19-e8f57e4fb390",
  "$.loan_structure.purpose.finance_purpose": "3",
  "$.loan_structure.purpose.finance_purpose_details":
    "Detail Kendaraan untuk Usaha",
  "$.process.returning.customer_type": "RO_EXP",
  "$.loan_structure.monthly_installment": 2900000,
  "$.loan_structure.provisional_amount": 10000000,
  "$.customer.domicile.ownership_code": "KL",
  "$.customer.domicile.address.street_address": "Ini alamat yaaaa 192810",
  "$.customer.domicile.stay_since": 2023,
  "$.customer.domicile.bkr_form": "RK_LISTRIK",
  "$.customer.domicile.name_on_bkr": "SUPARMAN",
  "$.documents.house_ownership.document_id":
    "c507e104-36c1-49d6-8d7d-4931fee86559",
  "$.documents.house.document_id": "5142ab92-82b1-49b1-a4dc-4d175ba2a75f",
  "$.asset.asset_code": "MITSUBISHI.XPANDER.CROSS15MT",
  "$.asset.manufacturing_year": 2024,
  "$.asset.asset_usage": "COMMERCIAL",
  "$.process.asset_pricing.price": 150000000,
  "$.loan_structure.ltv": 0.7929,
  "$.loan_structure.tenure": 6,
  "$.loan_structure.interest_rate": 0.0312,
  "$.loan_structure.ntf_amount":198000000,
  "$.loan_structure.product_offering": 1,
  "$.asset.bpkb_ownership": "1",
  "$.asset.bpkb_owner_name": "Adhitya",
  "$.documents.asset.asset_front.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_rear.document_id":
    "23828c5e-7c35-4ef1-aea6-72b9305deda7",
  "$.documents.asset.asset_front_left_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_rear_right_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_rear_left_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_front_right_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_interior_center_sid.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_left_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.asset_right_side.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.engine_number.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.selfie_with_vehicle.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.asset.speedometer.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.bpkb_receipt_2.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.customer_receipt_2.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.payment_receipt.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
    "$.documents.bpkb_page_1.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.bpkb_page_2.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.bpkb_page_3.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.bpkb_page_4.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.bpkb_page_5.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.vehicle_inspection.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.invoice.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.ktp_bpkb.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.chassis_number.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.stnk.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.tax_notice.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.release_letter.document_id":
    "ed668a54-93ec-4f36-a888-f84007baf190",
  "$.documents.income_proof.document_id":
    "31156555-2489-4708-bf19-e8f57e4fb390",
  "$.documents.business_photo.document_id":
    "31156555-2489-4708-bf19-e8f57e4fb390",
  "$.documents.business_location.document_id":
    "31156555-2489-4708-bf19-e8f57e4fb390",
  "$.documents.business_legality.document_id":
    "31156555-2489-4708-bf19-e8f57e4fb390",
  "$.process.credit_checking.neighborhood.source_1.information_source":
    "NEIGHBOR",
  "$.process.credit_checking.neighborhood.source_1.informant_name": "Kim Jisoo",
  "$.process.credit_checking.neighborhood.source_1.informant_mobile_number":
    "+6281234567890",
  "$.process.credit_checking.neighborhood.source_1.occupation_code":
    "BURARTASRT",
  "$.customer.professional.business_suitability": true,
  "$.process.credit_checking.neighborhood.source_1.family_reputation":
    "POSITIF",
  "$.process.credit_checking.neighborhood.source_1.debtor_spouse_uses_asset_more_than_once": true,
  "$.process.credit_checking.neighborhood.source_1.unit_seen_at_residence_more_than_once": true,
  "$.process.credit_checking.neighborhood.source_1.consumer_often_at_home": true,
  "$.process.credit_checking.neighborhood.source_1.consumer_affiliate_with_organization": false,
  "$.process.credit_checking.neighborhood.source_1.house_suitability": true,
  "$.asset.bpkb_ownership_period": "FROM_1_TO_6_MONTH",
  "$.process.credit_checking.neighborhood.source_1.other_information":
    "Jualan bakso di siang hari, jualan ketoprak di malam hari.",
  "$.customer.emergency_contact.name": "Jennie Kim",
  "$.customer.emergency_contact.relation_with_customer": "FAMILY",
  "$.customer.emergency_contact.street_address":
    "Jalan Pahlawan Seratus No. 1000, Serpong",
  "$.customer.emergency_contact.mobile_number": "+6281234567890",
  "$.branch.branch_id": "401",
  "$.process.survey_task.survey_branch_name": "MEDAN",
  "$.channel.partner_internal_name": "partner-goto",
  "$.channel.soa_id": "28",
  "$.channel.partner_id": "907d075e-5cef-4179-940e-794946b6eb33",
  "$.customer.domicile.address.sub_district_code": "15.07.02.2008",
};

export const Ca = async () => {
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
  } catch (error) {
    console.error(error);
  }
};
