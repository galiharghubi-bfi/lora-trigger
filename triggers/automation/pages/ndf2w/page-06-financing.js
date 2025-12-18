/**
 * Page 6: Info Tambahan (Extended Information)
 * Form: form_additional_data_show
 */
export const Page6InfoTambahan = (taskId, params = {}) => ({
  formName: "form_additional_data_show",
  payload: {
    "$.process.asset_pricing.price": "17300000",
    "$.loan_structure.ltv": "0.80046",
    "$.loan_structure.funding_ratio": "0.75",
    "$.loan_structure.max_funding": "12975000",
    "$.loan_structure.interest_rate": "0.395",
    "$.loan_structure.life_insurance_premium": "130000",
    "$.loan_structure.admin_fee": "466000",
    "$.loan_structure.provision_fee": "276959.18",
    "$.loan_structure.capitalized_ntf_amount": "13847959.18",
    "$.loan_structure.tenure": "12",
    "$.loan_structure.provisional_amount": "12975000",
    loan_amount_field: "12975000",
    "$.loan_structure.monthly_installment": "1416000",
    "$.survey_financing.additional_fees.bbn_arrears": "0",
    "$.survey_financing.additional_fees.bbn_arrears_note": "",
    "$.survey_financing.additional_fees.installment_arrears": "0",
    "$.survey_financing.additional_fees.installment_arrears_note": "",
    "$.survey_financing.additional_fees.other_fee_arrears": "0",
    "$.survey_financing.additional_fees.other_fee_arrears_note": "",
    "$.survey_financing.additional_fees.stnk_arrears": "0",
    "$.survey_financing.additional_fees.stnk_arrears_note": "",
    "$.survey_financing.additional_fees.tax_arrears": "0",
    "$.survey_financing.additional_fees.tax_arrears_note": "",
    "$.survey_financing.additional_fees.vehicle_invoice_arrears": "0",
    "$.survey_financing.additional_fees.vehicle_invoice_arrears_note": "",
    "$.survey_financing.additional_fees.vehicle_unblock_arrears": "0",
    "$.survey_financing.additional_fees.vehicle_unblock_arrears_note": "",
    action: "submit",
  },
});
