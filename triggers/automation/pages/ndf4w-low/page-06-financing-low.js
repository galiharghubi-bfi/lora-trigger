/**
 * Page 6: Financing (LOW RISK)
 * Form: form_financing_show
 * Loan structure and financing details
 */
export const Page6FinancingLow = (taskId, params = {}) => ({
  formName: "form_financing_show",
  payload: {
    "$.process.asset_pricing.price": "171000000",
    "$.loan_structure.ltv": "0.09755",
    "$.loan_structure.funding_ratio": "0.078947",
    "$.loan_structure.max_funding": "139200000",
    "$.loan_structure.interest_rate": "0.17",
    "$.loan_structure.life_insurance_premium": "92000",
    "$.loan_structure.asset_insurance_premium": "852500",
    "$.loan_structure.admin_fee": "1450000",
    "$.loan_structure.provision_fee": "236500",
    "$.loan_structure.capitalized_ntf_amount": "16681000",
    "$.loan_structure.tenure": "12",
    "$.loan_structure.provisional_amount": "13500000",
    loan_amount_field: "13500000",
    "$.loan_structure.monthly_installment": "1521500",
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
