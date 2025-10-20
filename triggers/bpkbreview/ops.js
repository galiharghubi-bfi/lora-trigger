import { StartApplication } from "../start-application.js";
import baseConfig from "../../config.js";
import { faker } from "@faker-js/faker";
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

const payload = {
  "$.asset.asset_code": "MTRHONDA.PCX.150",
  "$.asset.bpkb_address":
    "KP . GEBANG RT . 003 RW . 003 CEL . SATRIA JAJA KEC . TAMBUN UTARA KABUPATEN BEKASI",
  "$.asset.bpkb_invoice_number": "1231WEWS12",
  "$.asset.bpkb_number": "P-06637346",
  "$.asset.bpkb_owner_name": "ADE SADELI",
  "$.asset.bpkb_ownership": "2",
  "$.asset.chassis_number": "MJLV8DA2H7K001231",
  "$.asset.engine_number": "2NDS903234",
  "$.asset.license_plate": "D1698UAT",
  "$.asset.manufacturing_year": 2017,
  "$.asset.stnk_expiration_date": "2025-06-13",
  "$.asset.stnk_number": "200746436",
  "$.asset.tax_expiration_date": "2025-10-10",
  "$.asset.unit_color": "HITAM METALIK",
  "$.branch.branch_id": "401",
  "$.channel.marketing_id": "2403NC0005",
  "$.channel.partner_internal_name": "partner-gopay-customer",
  "$.customer.bank_information.account_name": "MULTIFINANCE ANAK BANGSA GOTO",
  "$.customer.bank_information.account_number": "0010988888",
  "$.customer.bank_information.bank_id": 47,
  "$.customer.contact.mobile_number": "+6281234567890",
  "$.customer.domicile.address.city_name": "Bandung",
  "$.customer.domicile.address.district_name": "Gedebage",
  "$.customer.domicile.address.province_name": "Jawa Barat",
  "$.customer.domicile.address.street_address": "JL KEBAGUSAN AJA",
  "$.customer.domicile.address.sub_district_code": "32.73.27.1003",
  "$.customer.domicile.address.sub_district_name": "Rancabolang (Rancabalong)",
  "$.customer.ktp.birth_date": "1995-12-30",
  "$.customer.ktp.birth_place": "MANOKWARI",
  "$.customer.ktp.gender": "M",
  "$.customer.ktp.name": "M DRIVER COURTNEY MAGGIO",
  "$.customer.ktp.nik": "3674010210990013",
  "$.customer.personal.marital_status_code": "S",
  "$.documents.asset.asset_front.document_id":
    "fe8a5ca8-8d12-4957-8559-d63631cdfa2b",
  "$.documents.asset.asset_left_side.document_id":
    "a232392c-8d6a-45e0-971a-875fc824f80a",
  "$.documents.asset.asset_rear.document_id":
    "3aada31e-fd9e-4c76-b0ec-e3f9ba070a91",
  "$.documents.asset.asset_right_side.document_id":
    "d11f5aab-c67a-46ff-8dc6-97cc84587823",
  "$.documents.asset.engine_number.document_id":
    "c3636e91-6c0e-4d06-bb37-cad702fb71ed",
  "$.documents.asset.selfie_with_vehicle.document_id":
    "8ecef169-700c-4b8a-8cfc-4c6ea668ff0d",
  "$.documents.asset.speedometer.document_id":
    "8ff4bed3-b31c-45d0-a619-f6d11cc6759e",
  "$.documents.asset_document_status": "IN_TRANSIT_CUSTOMER_TO_BRANCH",
  "$.documents.bpkb_page_1.document_id": "22ebf654-802a-4f4b-a9a4-2c5ae02c3df6",
  "$.documents.bpkb_page_2.document_id": "162f6249-f3e8-4a8b-863e-dd7f1a680152",
  "$.documents.bpkb_page_3.document_id": "cf41a0ed-33dc-44dc-825e-fabbe4ba7846",
  "$.documents.bpkb_page_4.document_id": "d7a1d0c7-17be-48dd-81e5-0bab829232b2",
  "$.documents.chassis_number.document_id":
    "6ffcc9e1-6c1b-4332-bd4e-ed267d898400",
  "$.documents.ktp.document_id": "ba380d43-c3b5-43be-a87e-8aa56171072b",
  "$.documents.selfie.document_id": "096797e5-8840-40e2-b2c8-4fe144b0cb5c",
  "$.documents.stnk.document_id": "0dab9812-1b64-4751-b30b-9e6b07dd885b",
  "$.documents.tax_notice.document_id": "26096ee4-6ac7-4e52-be13-e45ae77b984f",
  "$.internal.taskmaster.id": "b9c25bec-f901-46c1-9d2e-897b38b1dcf1",
  "$.loan_structure.admin_fee": 416000,
  "$.loan_structure.asset_insurance_premium": 0,
  "$.loan_structure.capitalized_ntf_amount": 13822448.98,
  "$.loan_structure.funding_ratio": 0.702703,
  "$.loan_structure.interest_rate": 0.445,
  "$.loan_structure.life_insurance_premium": 130000,
  "$.loan_structure.ltv": 0.747159,
  "$.loan_structure.max_funding": 14800000,
  "$.loan_structure.monthly_installment": 1448000,
  "$.loan_structure.ntf_amount": 13000000,
  "$.loan_structure.original_amount": 13000000,
  "$.loan_structure.product_id": 2,
  "$.loan_structure.product_offering": 46,
  "$.loan_structure.provision_fee": 276448.98,
  "$.loan_structure.provisional_amount": 13000000,
  "$.loan_structure.tenure": 12,
  "$.process.asset_pricing.price": 18500000,
  "$.process.bpkb_ocr_result.bpkb_address":
    "KP . GEBANG RT . 003 RW . 003 CEL . SATRIA JAJA KEC . TAMBUN UTARA KABUPATEN BEKASI",
  "$.process.bpkb_ocr_result.bpkb_number": "P-06637346",
  "$.process.bpkb_ocr_result.bpkb_owner_name": "ADE KARNI72A2D6A6 SADELI",
  "$.process.loan_estimation.max_funding_ratio": 0.8,
  "$.process.operations_task.processing_branch_id": "401",
  "$.process.operations_task.processing_branch_name": "CIMAHI",
  "$.process.pd_model_overlay.s1.max_funding_ratio": 0.8,
  "$.process.pefindo_profile.pefindo_detail.customer.status_result": "FOUND",
  "$.process.returning.customer_type": "NEW",
  "$.process.stnk_ocr_result.chassis_number": "MJLV8DA2H7K001231",
  "$.process.stnk_ocr_result.engine_number": "10319832917",
  "$.process.stnk_ocr_result.license_plate": "B1234BTC",
  "$.process.stnk_ocr_result.manufacturing_year": "2023",
  "$.process.stnk_ocr_result.stnk_expiration_date": "2025-06-13",
  "$.process.stnk_ocr_result.stnk_number": "200746436",
  "$.process.stnk_ocr_result.tax_expiration_date": "2025-06-13",
  "$.process.stnk_ocr_result.unit_color": "HITAM METALIK",
  "$.process.stnk_ocr_result.vehicle_brand": "HONDA",
  "$.process.survey_task.bpkb_submission.submission_appointment_time":
    "2025-09-29T02:00:00.000Z",
  "$.process.survey_task.bpkb_submission.submission_method": "BRANCH_DROPOFF",
  "$.process.survey_task.survey_branch_id": "999",
  "$.process.survey_task.survey_branch_name": "HEAD OFFICE",
  "$.process.survey_task.surveyor_employee_id": "209136",
  "$.process.survey_task.surveyor_employee_name": "Jensen",
  "$.status.application": "pre_approved",
  "$.status.reservation_expiry": "2025-10-09T16:59:00Z",
  "$.submission_date": "2025-09-29T07:03:31Z",
  "$.survey_appointment.end_time": "2025-09-29T12:30:00Z",
  "$.survey_appointment.preferred_timezone": "Asia/Jakarta",
  "$.survey_appointment.start_time": "2025-09-29T12:00:00Z",
  "$.survey_appointment.survey_location_type": "virtual",
  "$.survey_appointment.survey_resource_type": "admin_survey",
  "$.survey_appointment.survey_type": "INSTANT",
  "$.survey_appointment.video_link": "https://bfi.co.id",
  "$.survey_financing.additional_fees.bbn_arrears": 0,
  "$.survey_financing.additional_fees.installment_arrears": 0,
  "$.survey_financing.additional_fees.other_fee_arrears": 0,
  "$.survey_financing.additional_fees.stnk_arrears": 0,
  "$.survey_financing.additional_fees.tax_arrears": 0,
  "$.survey_financing.additional_fees.vehicle_invoice_arrears": 0,
  "$.survey_financing.additional_fees.vehicle_unblock_arrears": 0,
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
