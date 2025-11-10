/**
 * Page 10: Financing Page (Final Verification)
 * Form: form_financing_final_show
 */
export const Page10FinancingFinal = (taskId, params = {}) => ({
  formName: "form_financing_final_show",
  payload: {
    "$.process.asset_pricing.price": "94000000",
    "$.loan_structure.ltv": "0.170729",
    "$.loan_structure.funding_ratio": "0.135",
    "$.loan_structure.max_funding": "74900000",
    "$.loan_structure.interest_rate": "0.165",
    "$.loan_structure.life_insurance_premium": "88500",
    "$.loan_structure.asset_insurance_premium": "711000",
    "$.loan_structure.admin_fee": "2000000",
    "$.loan_structure.provision_fee": "159000",
    "$.loan_structure.capitalized_ntf_amount": "16048500",
    "$.loan_structure.tenure": "12",
    "$.loan_structure.provisional_amount": "12690000",
    loan_amount_field: "12690000",
    "$.loan_structure.monthly_installment": "1460000",
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
