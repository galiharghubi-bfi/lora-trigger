/**
 * Page 10: Financing Page (Final Verification)
 * Form: form_financing_stage_2_show
 */
export const Page10FinancingFinal = (taskId, params = {}) => ({
  formName: "form_financing_stage_2_show",
  payload: {
    "$.process.asset_pricing.price": "155000000",
    "$.loan_structure.ltv": "0.581877",
    "$.loan_structure.funding_ratio": "0.548387",
    "$.loan_structure.max_funding": "125800000",
    "$.loan_structure.interest_rate": "0.165",
    "$.loan_structure.life_insurance_premium": "496500",
    "$.loan_structure.asset_insurance_premium": "782000",
    "$.loan_structure.admin_fee": "2300000",
    "$.loan_structure.provision_fee": "1062500",
    "$.loan_structure.capitalized_ntf_amount": "90191000",
    "$.loan_structure.tenure": "12",
    "$.loan_structure.provisional_amount": "85000000",
    loan_amount_field: "85000000",
    "$.loan_structure.monthly_installment": "8204500",
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
