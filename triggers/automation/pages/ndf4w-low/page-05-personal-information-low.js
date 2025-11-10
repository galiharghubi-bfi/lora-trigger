/**
 * Page 5: Personal Information (LOW RISK)
 * Form: form_personal_information_show
 * Additional customer information, employment, and emergency contact
 */
export const Page5PersonalInformationLow = (taskId, params = {}) => ({
  formName: "form_personal_information_show",
  payload: {
    "$.customer.personal.mother_maiden_name": "TEST TEST TEST",
    "$.customer.contact.email": "LULLABYANGEL22@GMAIL.COM",
    "$.customer.professional.npwp_type": "NPWP",
    "$.customer.domicile.bkr_form": "SRTF_RMH",
    "$.customer.domicile.is_name_bkr_equal": "true",
    "ltw.custom_customer_professional_economic_sector": "PERTAMBANGAN",
    "ltw.custom_customer_professional_industry":
      "MESIN PERTAMBANGAN, PENGGALIAN & KONSTRUKSI",
    "$.customer.professional.company_sub_district_code": "31.74.07.1001",
    "$.customer.emergency_contact.name": "TEST TEST TEST",
    "$.customer.emergency_contact.relation_with_customer": "FRIEND",
    "$.customer.emergency_contact.mobile_number": "+628111223322",
    "$.customer.emergency_contact.street_address": "TEST TEST TEST",
    "$.customer.emergency_contact.sub_district_code": "36.74.07.1002",
    "$.customer.emergency_contact.rt": "003",
    "$.customer.emergency_contact.rw": "003",
    "$.documents.ktp.document_id": "1a298e4a-7f28-446d-bb0a-fa47db34c173",
    "$.documents.employment_evidence.document_id":
      "78190841-eb00-472a-8a48-86dd337f2757",
    "$.documents.npwp.document_id": "c61874ba-4b9b-4b0b-8320-d4df0122fd22",
    action: "submit",
  },
});
