import {faker} from "@faker-js/faker";
import baseConfig from "../../config.js";
import {StartApplication} from "../start-application.js";
import {sendMq} from "../trigger-appointment.js";
import {cleansedName} from "../utils/cleanse.js";
import {generateLicensePlate} from "../utils/license_plate.js";

const licensePlate = generateLicensePlate();

const payload = {
  "$.asset.asset_code": "MTRHONDA.PCX.150",
  "$.asset.bpkb_ownership": "1",
  "$.asset.bpkb_status": "on_hand",
  "$.asset.license_plate": licensePlate,
  "$.asset.manufacturing_year": "2017",
  "$.asset.stnk_status": "ACTIVE",
  "$.asset.tax_status": "tax_paid_off",
  "$.channel.activity_id": "DPBR",
  "$.channel.ekyc_authority": "partner",
  "$.channel.ktp_forgery_authority": "partner",
  "$.channel.ktp_ocr_required": false,
  "$.channel.marketing_id": "2311NC0008",
  "$.channel.partner_id": "15871124-0258-4e3f-9f31-bc995e348a8d",
  "$.channel.partner_internal_name": "partner-goto",
  "$.channel.soa_id": "28",
  "$.customer.bank_information.account_name": "MULTIFINANCE ANAK BANGSA GOTO",
  "$.customer.bank_information.account_number": "0010988888",
  "$.customer.bank_information.bank_id": 47,
  "$.customer.contact.email": "TESTSSS@GMAIL.COM",
  "$.customer.contact.mobile_number": "+6281234567890",
  "$.customer.domicile.address.street_address": "JL KEBAGUSAN AJA",
  "$.customer.domicile.address.sub_district_code": "32.73.27.1003",
  "$.customer.domicile.ownership_code": "SD",
  "$.customer.ktp.birth_date": "1999-08-22",
  "$.customer.ktp.birth_place": "MANOKWARI",
  "$.customer.ktp.city": "Bandung",
  "$.customer.ktp.district": "Gedebage",
  "$.customer.ktp.gender": "F",
  "$.customer.ktp.name": `${cleansedName(faker.person.firstName())} ${cleansedName(faker.person.lastName())}`,
  "$.customer.ktp.nik": "3603281212930010",
  "$.customer.ktp.province": "Jawa Barat",
  "$.customer.ktp.street_address": "JALAN JALAN",
  "$.customer.ktp.sub_district": "Rancabolang (Rancabalong)",
  "$.customer.ktp.sub_district_code": "32.73.27.1003",
  "$.customer.ktp.zip_code": "40295",
  "$.customer.personal.marital_status_code": "S",
  "$.customer.personal.number_dependents": "1",
  "$.customer.professional.education_code": "S1",
  "$.customer.professional.length_current_job": "LESS_THAN_15",
  "$.customer.professional.monthly_income": "50000000",
  "$.customer.professional.npwp": "3515041309730001",
  "$.customer.professional.npwp_matches_nik": false,
  "$.customer.professional.occupation_type_code": "M",
  "$.documents.ktp.document_id": "1a82f0ab-9369-4053-bd54-329736d5b072",
  "$.documents.selfie.document_id": "b66028a9-78c9-4976-8784-990bd1636a9e",
  "$.loan_structure.original_amount": 13875000,
  "$.loan_structure.product_id": 2,
  "$.loan_structure.product_offering": 35,
  "$.loan_structure.tenure": 12,
  "$.process.user_consent_timestamp": "2025-08-15T08:51:13.50673499Z"
}

export const mapActor = {
  admin: {
    resource_identifiers: "000000",
    resource_type_code: "ADMIN_SURVEY",
    location_type_code: "VIRTUAL"
  },
  vd: {
    resource_identifiers: "000004",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "CUSTOMER_HOME"
  },
  vd_branch_visit: {
    resource_identifiers: "999005",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "BFI_OFFICE"
  },
  vd_custom: {
    resource_identifiers: "999006",
    resource_type_code: "VERIFICATOR_DIGITAL",
    location_type_code: "BFI_OFFICE"
  }
}

export const Ndf2w = async (actor) => {
  const {workflowId, start} = await StartApplication();
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
    await new Promise((resolve) => setTimeout(resolve, 300000));
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "2W_REGULAR_SURVEY",
      appointment_uuid: crypto.randomUUID(),
      ...(mapActor[actor] ?? mapActor['admin']),
    });
  } catch (error) {
    console.error(error);
  }
};
