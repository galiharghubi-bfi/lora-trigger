/**
 * Page 5: Info Lainnya (Additional Information)
 * Form: form_personal_information_show
 */
export const Page5InfoLainnya = (taskId, params = {}) => ({
  formName: "form_personal_information_show",
  payload: {
    "$.customer.personal.mother_maiden_name": "ASDASDASD ASDASDASD",
    "$.customer.contact.email": "TESTSSS@GMAIL.COM",
    "$.customer.professional.npwp_type": "NPWP",
    "ltw.custom_customer_professional_economic_sector": "TRANSPORTASI",
    "ltw.custom_customer_professional_industry": "ALAS KAKI",
    "$.customer.professional.company_sub_district_code": "31.74.07.1001",
    "$.customer.emergency_contact.name": "ASDASDASD ASDASDASD",
    "$.customer.emergency_contact.relation_with_customer": "CHILD",
    "$.customer.emergency_contact.mobile_number": "+6282312312312",
    "$.customer.emergency_contact.street_address": "testing testing testin",
    "$.customer.emergency_contact.sub_district_code": "12.71.05.1002",
    "$.customer.emergency_contact.rt": "123",
    "$.customer.emergency_contact.rw": "321",
    "$.documents.ktp.document_id": "1a82f0ab-9369-4053-bd54-329736d5b072",
    "$.documents.employment_evidence.document_id": "",
    "$.documents.npwp.document_id": "",
    action: "submit",
  },
});
