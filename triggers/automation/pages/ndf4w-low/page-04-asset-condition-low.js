/**
 * Page 4: Asset & Condition (LOW RISK)
 * Form: form_asset_condition_show
 * Asset condition verification and financial information
 */
export const Page4AssetConditionLow = (taskId, params = {}) => ({
  formName: "form_asset_condition_show",
  payload: {
    "$.asset.debtor_spouse_can_identify_collateral": "true",
    "$.asset.unit_under_consumer_control": "true",
    "$.asset.unit_physical_condition_normal": "true",
    "$.asset.unit_no_clear_mark_of_accident": "NO",
    "$.asset.unit_able_to_turn_on": "true",
    "$.asset.unit_type_and_physical_condition_appropriate": "true",
    "$.asset.engine_and_chassis_number_with_document_appropriate": "true",
    "$.asset.whole_interior_condition": "GOOD",
    "ltw.loan_structure.finance_purpose_type": "P",
    "$.loan_structure.purpose.finance_purpose_id": "5",
    "$.customer.personal.monthly_installment_outside_bfi": "0",
    "$.customer.personal.funds_other_than_purchase": "false",
    "$.customer.personal.installment_helper_than_spouse": "false",
    "ltw.custom_customer_professional_occupation_code": "Engineering",
    "ltw.custom_customer_professional_occupation_type_code": "Employee",
    "$.customer.professional.proof_monthly_income": "50000000",
    "$.customer.professional.proof_variable_income": "0",
    action: "submit",
  },
});
