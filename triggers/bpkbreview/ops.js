import { StartApplication } from "../start-application.js";
import baseConfig from "../../config.js";
import { faker } from "@faker-js/faker/locale/id_ID";
import { generateLicensePlate } from "../utils/license_plate.js";
import { cleansedName } from "../utils/cleanse.js";

const fakerName = () =>
  `${cleansedName(faker.person.firstName())} ${cleansedName(
    faker.person.lastName()
  )}`;

const getTime = () => {
  const start = new Date();
  start.setHours(18, 30, 0, 0);
  return start.toISOString();
};

const licensePlate = generateLicensePlate();

const payload = {
  "$.loan_structure.risk_level": "MEDIUM",
  "$.channel.marketing_id": "2311NC0006",
  "$.channel.partner_id": "15871124-0258-4e3f-9f31-bc995e348a8d",
  "$.channel.partner_internal_name": "partner-goto",
  "$.channel.soa_id": "28",
  "$.process.survey_task.bpkb_submission.verificator_notes": "coba",
  "$.asset.bpkb_sub_district_code": "12.21.05.2026",
  "$.channel.ekyc_authority": "partner",
  "$.status.application": "pre_approved",
  "$.submission_date": "2025-09-08T11:40:40Z",
  "$.asset.asset_code": "MTRHONDA.VARIO.125FICBS",
  "$.customer.ktp.name": `${faker.person.firstName()} ${faker.person.lastName()}`,
  "$.asset.bpkb_address": "Perum Taman Bojongsari No.58",
  "$.asset.bpkb_invoice_number": "19069692004JK9012027",
  "$.asset.bpkb_number": "P-04020234",
  "$.asset.bpkb_owner_name": "Data Adams",
  "$.asset.bpkb_ownership": "1",
  "$.asset.chassis_number": "P1234567890129831",
  "$.asset.engine_number": "L15Z15605255",
  "$.asset.license_plate": licensePlate,
  "$.asset.manufacturing_year": "2019",
  "$.asset.stnk_expiration_date": "2029-06-24",
  "$.asset.stnk_number": "53358770",
  "$.asset.tax_expiration_date": "2029-06-24",
  "$.asset.unit_color": "MERAH",
  "$.customer.bank_information.account_name": "Data Adams",
  "$.customer.bank_information.account_number": "111643252",
  "$.customer.bank_information.bank_id": "47",
  "$.customer.domicile.address.sub_district_code": "32.73.21.1001",
  "$.customer.ktp.birth_date": "1995-02-21",
  "$.customer.personal.marital_status_code": "M",
  "$.loan_structure.admin_fee": 1574208,
  "$.loan_structure.provisional_amount": 9000000,
  "$.loan_structure.capitalized_ntf_amount": 11680208.33,
  "$.loan_structure.funding_ratio": 0.87,
  "$.loan_structure.interest_rate": 0.5,
  "$.loan_structure.life_insurance_premium": 50000000,
  "$.loan_structure.ltv": 0.94,
  "$.loan_structure.max_funding": 9920000,
  "$.loan_structure.monthly_installment": 705500,
  "$.loan_structure.product_id": 2,
  "$.loan_structure.product_offering": 35,
  "$.loan_structure.provision_fee": 428291,
  "$.loan_structure.tenure": 24,
  "$.process.asset_pricing.price": 12400000,
  "$.process.bpkb_ocr_result.bpkb_address": "Perum Taman Bojongsari No.58",
  "$.process.bpkb_ocr_result.bpkb_invoice_number": "19069692004JK9012027",
  "$.process.bpkb_ocr_result.bpkb_number": "P-04020234",
  "$.process.bpkb_ocr_result.bpkb_owner_name": "Data Adams",
  "$.process.bpkb_ocr_result.chassis_number": "P1234567890129831",
  "$.process.bpkb_ocr_result.engine_number": "L15Z15605255",
  "$.process.bpkb_ocr_result.license_plate": "JA 6585 Z",
  "$.process.bpkb_ocr_result.manufacturing_year": "2018",
  "$.process.bpkb_ocr_result.unit_color": "MERAH",
  "$.process.bpkb_ocr_result.vehicle_brand": "HONDA",
  "$.process.operations_task.processing_branch_id": "463",
  "$.process.operations_task.processing_branch_name": "BANDUNG",
  "$.process.returning.customer_type": "NEW",
  "$.process.stnk_ocr_result.bpkb_number": "P-04020234",
  "$.process.stnk_ocr_result.chassis_number": "P1234567890129831",
  "$.process.stnk_ocr_result.engine_number": "L15Z15605255",
  "$.process.stnk_ocr_result.license_plate": "JA6585Z",
  "$.process.stnk_ocr_result.manufacturing_year": "2018",
  "$.process.stnk_ocr_result.stnk_expiration_date": "2029-06-24",
  "$.process.stnk_ocr_result.stnk_number": "53358770",
  "$.process.stnk_ocr_result.tax_expiration_date": "2029-06-24",
  "$.process.stnk_ocr_result.unit_color": "MERAH",
  "$.process.stnk_ocr_result.vehicle_brand": "HONDA",
  "$.documents.bpkb_page_1.document_id": "69cb6bdc-7c76-414f-9799-7455fb2ae07e",
  "$.documents.bpkb_page_2.document_id": "8cce9447-12a5-4778-a62c-f567ca48af33",
  "$.documents.bpkb_page_3.document_id": "2d984d49-1e0f-4c64-99ba-88017cf8b538",
  "$.documents.bpkb_page_4.document_id": "fe9091b2-ffbc-412b-acc0-464cff52f1af",
  "$.documents.bpkb_page_5.document_id": "4148bbb0-c20f-4a36-88e0-249498bbdf06",
  "$.documents.bpkb_invoice.document_id": "1ea55185-684d-4161-a36a-c174f642c9a3",
  "$.documents.bpkb_receipt_2.document_id": "5ff16053-7dee-4c44-b7e7-f8d34ce2d45b",
  "$.documents.debtor_signature.document_id": "dd483eb5-2619-4df7-bcea-bd9c5e60922b",
  "$.documents.spouse_signature.document_id": "a5cf87e2-063d-49c7-8d49-4cd57d066230",
  "$.documents.stnk.document_id": "9eb9c549-13f7-4351-a331-cebf8ea6f7e3",
  "$.documents.tax_notice.document_id": "9eb9c549-13f7-4351-a331-cebf8ea6f7e3",
  "$.documents.ktp.document_id": "58610e31-2350-426c-91fb-b9d0e9aad2d0",
  "$.documents.spouse_ktp.document_id": "f96bdee9-bf31-426f-9393-98992e0bc0b2",
  "$.documents.asset.asset_front.document_id": "03f3dfcf-54ce-488d-9bcf-328a11e20be5",
  "$.survey_financing.additional_fees.tax_arrears": 200000,
  "$.survey_financing.additional_fees.tax_arrears_note": "Tunggakan pajak 1 bulan",
  "$.survey_financing.additional_fees.vehicle_unblock_arrears": 500000,
  "$.survey_financing.additional_fees.vehicle_unblock_arrears_note": "Biaya buka blokir 2",
  "$.survey_financing.additional_fees.stnk_arrears": 300000,
  "$.survey_financing.additional_fees.stnk_arrears_note": "Tunggakan STNK",
  "$.survey_financing.additional_fees.bbn_arrears": 150000,
  "$.survey_financing.additional_fees.bbn_arrears_note": "Tunggakan BBN",
  "$.spouse.ktp.name": "ALICE",
  "$.documents.asset_document_status": "IN_TRANSIT_CUSTOMER_TO_BRANCH",
  "$.process.survey_task.bpkb_submission.submission_method": "BRANCH_DROPOFF",
  "$.customer.ktp.birth_place": "Bandung",
  "$.customer.ktp.gender": "M",
  "$.customer.domicile.address.street_address": "Jl. Griya Pesona Indah No.35",
  "$.survey_appointment.start_time": "2025-10-21T11:40:40.377Z",
  "$.survey_appointment.end_time": "2025-10-21T12:10:40.377Z",
  "$.survey_appointment.survey_location_type": "virtual",
  "$.process.survey_task.survey_branch_id": "463",
  "$.process.survey_task.survey_branch_name": "BANDUNG",
  "$.process.survey_task.surveyor_employee_id": "000000",
  "$.channel.marketing_id": "2311NC0006",
  "$.process.survey_task.bpkb_submission.submission_appointment_time": "2025-08-04T11:55:02Z",
  "$.customer.contact.mobile_number": "+628131131113",
  "$.survey_appointment.survey_resource_type": "admin_survey",
  "$.survey_appointment.survey_type": "INSTANT",
  "$.survey_appointment.preferred_timezone": "Asia/Jakarta",
  "$.loan_structure.original_amount": 5000000,

  "$.documents.selfie.document_id": "f53699dc-9e09-424b-9cfb-a6f15ae55892",
  "$.documents.asset.asset_left_side.document_id": "4188bbfd-e7e3-430d-b185-0c5501d1f603",
  "$.documents.asset.asset_rear.document_id": "63e65101-c21e-489d-ac04-b4cd08a11d3f",
  "$.documents.asset.asset_right_side.document_id": "1e565ee0-374c-4881-bc62-04ecf031abae",
  "$.documents.asset.engine_number.document_id": "191bf099-ee3b-41b6-baa1-5a6f1af3ade1",
  "$.documents.asset.selfie_with_vehicle.document_id": "720ff461-0f02-454f-8d9d-5d28fcab804c",
  "$.documents.asset.speedometer.document_id": "e0269eef-57d3-4180-80f1-6b428c168a53",
  "$.documents.chassis_number.document_id": "1d2dede5-bc3f-4301-92e7-f3ea1cf5bae4",
  "$.documents.employment_evidence.document_id": "20b28292-8d1f-45c1-b1c3-b861a1b0bcda",
  "$.documents.house.document_id": "3c1eea8b-1a16-4879-8337-b230eea9c4a5",
  "$.documents.npwp.document_id": "25d32134-cc12-4fa6-9f1a-ca1aa4d281dc",
  "$.documents.payment_receipt.document_id": "502c236a-50a4-4656-a925-b5f5b31c0e9b",

  "$.process.loan_estimation.max_funding_ratio": 1,
  "$.process.pd_model_overlay.s1.max_funding_ratio": 1,
  "$.process.vehicle_verification_score.s1.max_funding_ratio": 1
};

export const Ops = async () => {
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
    console.log(`✔ License plate: ${payload["$.asset.license_plate"]}`);
    console.log(`✔ Customer name: ${payload["$.customer.ktp.name"]}`);
  } catch (error) {
    console.error(error);
  }
};
