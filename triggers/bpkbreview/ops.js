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
  "$.asset.license_plate": generateLicensePlate(),
  "$.status.application": "pre_approved",
  "$.customer.ktp.name": fakerName(),
  "$.loan_structure.product_id": 2,
  "$.process.survey_task.survey_branch_id": "401",
  "$.process.survey_task.surveyor_employee_id": "000001",
  "$.process.operations_task.processing_branch_id": "401",
  "$.submission_date": "2025-04-08T15:30:00Z",
  "$.asset.bpkb_address": "Jl. villa permata",
  "$.asset.bpkb_number": "D123456789",
  "$.asset.bpkb_owner_name": fakerName(),
  "$.asset.asset_code": "MTRHONDA.VARIO.125FICBS",
  "$.asset.manufacturing_year": "2024",
  "$.asset.unit_color": "BLUE",
  "$.asset.chassis_number": "P1234567890129831",
  "$.asset.engine_number": "E1234567890",
  "$.asset.bpkb_invoice_number": "INV/2025/03/12/01ABC",
  "$.channel.ekyc_authority": "partner",
  "$.documents.bpkb_page_1.document_id": "845db5fb-cd70-4e37-a220-ad4b66bb4c85",
  "$.documents.bpkb_page_2.document_id": "f64d342b-581a-4a71-bee9-8ee9cd582d44",
  "$.documents.bpkb_page_3.document_id": "03f3dfcf-54ce-488d-9bcf-328a11e20be5",
  "$.documents.bpkb_page_4.document_id": "03f3dfcf-54ce-488d-9bcf-328a11e20be5",
  "$.documents.bpkb_page_5.document_id": "03f3dfcf-54ce-488d-9bcf-328a11e20be5",
  "$.documents.bpkb_invoice.document_id":
    "760fc814-433e-4b80-8a02-b84595148309",
  "$.documents.bpkb_receipt_2.document_id":
    "03f3dfcf-54ce-488d-9bcf-328a11e20be5",
  "$.documents.debtor_signature.document_id":
    "845db5fb-cd70-4e37-a220-ad4b66bb4c85",
  "$.documents.spouse_signature.document_id":
    "f64d342b-581a-4a71-bee9-8ee9cd582d44",
  "$.documents.stnk.document_id": "1bc60281-3655-41c3-a4df-75ce2bbd57a8",
  "$.documents.tax_notice.document_id": "1bc60281-3655-41c3-a4df-75ce2bbd57a8",
  "$.documents.ktp.document_id": "1bc60281-3655-41c3-a4df-75ce2bbd57a8",
  "$.documents.spouse_ktp.document_id": "1bc60281-3655-41c3-a4df-75ce2bbd57a8",
  "$.process.stnk_ocr_result.bpkb_number": "01234567",
  "$.process.stnk_ocr_result.chassis_number": "JM1DE11Y1D0112345",
  "$.process.stnk_ocr_result.engine_number": "ZYB12345",
  "$.process.stnk_ocr_result.license_plate": "B1234ZZ",
  "$.process.stnk_ocr_result.manufacturing_year": "2020",
  "$.process.stnk_ocr_result.stnk_expiration_date": "2025-03-12",
  "$.process.stnk_ocr_result.stnk_number": "07654321",
  "$.process.stnk_ocr_result.tax_expiration_date": "2025-03-12",
  "$.process.stnk_ocr_result.unit_color": "Hitam",
  "$.process.stnk_ocr_result.vehicle_brand": "TOYOTA",
  "$.process.bpkb_ocr_result.bpkb_address": "Jl Menara Avengers No 1",
  "$.process.bpkb_ocr_result.bpkb_invoice_number": "FA/AA/12345678",
  "$.process.bpkb_ocr_result.bpkb_number": "01234567",
  "$.process.bpkb_ocr_result.bpkb_owner_name": fakerName(),
  "$.process.bpkb_ocr_result.chassis_number": "JM1DE11Y1D0112345",
  "$.process.bpkb_ocr_result.engine_number": "ZYB12345",
  "$.process.bpkb_ocr_result.license_plate": "B1234ZZ",
  "$.process.bpkb_ocr_result.manufacturing_year": "2020",
  "$.process.bpkb_ocr_result.unit_color": "Hitam",
  "$.process.bpkb_ocr_result.vehicle_brand": "TOYOTA",
  "$.asset.tax_expiration_date": "2025-03-12",
  "$.asset.stnk_number": "07654321",
  "$.asset.stnk_expiration_date": "2025-03-12",
  "$.asset.bpkb_ownership": "1",
  "$.documents.asset_document_status": "IN_TRANSIT_CUSTOMER_TO_BRANCH",
  "$.process.asset_pricing.price": 2500000,
  "$.loan_structure.admin_fee": 2500,
  "$.loan_structure.provision_fee": 500000,
  "$.loan_structure.max_funding": 30000000,
  "$.loan_structure.interest_rate": 0.5,
  "$.loan_structure.life_insurance_premium": 50000000,
  "$.loan_structure.product_offering": 35,
  "$.customer.ktp.birth_date": "1999-02-21",
  "$.customer.domicile.address.sub_district_code": "36.74.01.1005",
  "$.process.returning.customer_type": "NEW",
  "$.customer.personal.marital_status_code": "M",
  "$.customer.bank_information.account_name": fakerName(),
  "$.customer.bank_information.account_number": "111643252",
  "$.customer.bank_information.bank_id": "47",
  "$.loan_structure.tenure": 24,
  "$.loan_structure.original_amount": 10000000,
  "$.loan_structure.billing_date": "2025-05-30",
  "$.loan_structure.capitalized_ntf_amount": 1000000,
  "$.loan_structure.ltv": 0.87,
  "$.loan_structure.monthly_installment": 300000,
  "$.loan_structure.funding_ratio": 0.87,
  "$.survey_financing.additional_fees.tax_arrears": 0,
  "$.survey_financing.additional_fees.tax_arrears_note": "",
  "$.survey_financing.additional_fees.vehicle_unblock_arrears": 0,
  "$.survey_financing.additional_fees.vehicle_unblock_arrears_note": "",
  "$.process.operations_task.processing_branch_name": "Jambi",
  "$.process.survey_task.survey_branch_name": "Jambi",
  "$.customer.ktp.birth_place": "Bandung",
  "$.customer.ktp.gender": "M",
  "$.process.survey_task.bpkb_submission.submission_method": "BRANCH_DROPOFF",
  "$.survey_appointment.start_time": getTime(),
  "$.survey_appointment.end_time": getTime(),
  "$.survey_appointment.survey_location_type": "virtual",
  "$.survey_appointment.survey_resource_type": "vd",
  "$.survey_appointment.survey_type": "INSTANT", // INSTANT, SIMPLE, REGULAR
  "$.channel.marketing_id": "2311NC0006",
  "$.loan_structure.provisional_amount": 10000000,
  "$.process.survey_task.bpkb_submission.submission_appointment_time":
    "2025-06-16T11:55:02Z",
  "$.customer.contact.mobile_number": "+628131131113",
  "$.survey_appointment.survey_resource_type": "vd",
  "$.survey_appointment.preferred_timezone": "Asia/Jakarta",
  "$.process.loan_estimation.max_funding_ratio": 1.0,
  "$.process.pd_model_overlay.s1.max_funding_ratio": 1.0,
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
