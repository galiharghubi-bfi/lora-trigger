/**
 * Page 6: Info Tambahan (Extended Information)
 * Form: form_info_tambahan_show
 */
export const Page6InfoTambahan = (taskId, params = {}) => ({
  formName: "form_info_tambahan_show",
  payload: {
    "ltw.custom_customer_personal_character_4w": "NO_NEGATIVE_INFO",
    "$.asset.bpkb_owner_name": "TEST TEST",
    "ltw.custom_vehicle_guaranteed": "OWNED_BY_DEBTOR",
    "$.customer.professional.other_business": "TEST",
    "$.customer.professional.business_suitability": "true",
    "ltw.custom_customer_employment_status": "PERMANENT_EMPLOYEE",
    "$.customer.professional.business_since_year": "2020",
    "$.customer.domicile.stay_since": "2020",
    "$.documents.house.document_id": "f31c8eb9-ddb0-44c5-85ce-e4f8c588416c",
    action: "submit",
  },
});
