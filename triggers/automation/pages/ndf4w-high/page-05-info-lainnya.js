/**
 * Page 5: Info Lainnya (Additional Information)
 * Form: form_info_lainnya_show
 */
export const Page5InfoLainnya = (taskId, params = {}) => ({
  formName: "form_info_lainnya_show",
  payload: {
    "$.customer.personal.mother_maiden_name": "TEST",
    "$.customer.contact.email": "",
    "$.customer.professional.npwp_type": "NPWP",
    "$.customer.domicile.bkr_form": "AKT_JUALBELI",
    "$.customer.domicile.is_name_bkr_equal": "true",
    "ltw.custom_customer_professional_economic_sector": "KONTRUKSI",
    "ltw.custom_customer_professional_industry": "ANYAM-ANYAMAN, KERAJINAN, FURNITUR, UKIRAN DARI KAYU & BARANG LAIN DARI KAYU",
    "$.customer.professional.company_sub_district_code": "31.74.07.1001",
    "$.customer.emergency_contact.name": "TEST",
    "$.customer.emergency_contact.relation_with_customer": "FRIEND",
    "$.customer.emergency_contact.mobile_number": "+628111223322",
    "$.customer.emergency_contact.street_address": "TEST TEST TEST",
    "$.customer.emergency_contact.sub_district_code": "36.74.07.1002",
    "$.customer.emergency_contact.rt": "003",
    "$.customer.emergency_contact.rw": "003",
    "$.documents.ktp.document_id": "3a501dfb-fcc1-40a1-a8b3-9e27e6fdae21",
    "$.documents.employment_evidence.document_id": "",
    "$.documents.npwp.document_id": "bc91ec74-d25b-4680-a13b-89e56fe6dd5b",
    action: "submit",
  },
});
