/**
 * Page 4: Asset & Condition
 * Form: form_asset_condition_show
 */
export const Page4AssetCondition = (taskId, params = {}) => ({
  formName: "form_asset_condition_show",
  payload: {
    "$.asset.unit_under_consumer_control": "true",
    "$.asset.unit_physical_condition_normal": "true",
    "$.asset.unit_no_clear_mark_of_accident": "NO",
    "$.asset.unit_able_to_turn_on": "true",
    "$.asset.unit_type_and_physical_condition_appropriate": "true",
    "$.asset.engine_and_chassis_number_with_document_appropriate": "true",
    "ltw.loan_structure.finance_purpose_type": "P",
    "$.loan_structure.purpose.finance_purpose_id": "3",
    "$.customer.personal.funds_other_than_purchase": "false",
    "$.customer.personal.installment_helper_than_spouse": "false",
    "ltw.custom_customer_professional_occupation_code":
      "DRIVER TAXI ONLINE / OJEK ONLINE",
    "ltw.custom_customer_professional_occupation_type_code": "Employee",
    "$.customer.professional.proof_monthly_income": "312000000",
    "$.customer.professional.proof_variable_income": "2030000",
    "$.customer.professional.other_business": "Warung",
    "$.customer.professional.business_suitability": "true",
    "$.customer.professional.employment_status": "PERMANENT_EMPLOYEE",
    "$.customer.professional.business_since_year": "2020",
    "ltw.custom_customer_personal_character_4w": "NO_NEGATIVE_INFO",
    "$.asset.debtor_spouse_can_identify_collateral": "true",
    action: "submit",
  },
});
