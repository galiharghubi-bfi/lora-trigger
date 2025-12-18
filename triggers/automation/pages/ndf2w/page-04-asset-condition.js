/**
 * Page 4: Asset & Condition
 * Form: form_asset_condition_show
 */
export const Page4AssetCondition = (taskId, params = {}) => ({
  formName: "form_asset_condition_show",
  payload: {
    "$.asset.unit_physical_condition_normal": "true",
    "$.asset.is_motorcycle_component_complete": "true",
    "ltw.custom_asset_no_mark_of_accident_2W": "YES",
    "$.asset.unit_able_to_turn_on": "true",
    "$.asset.unit_type_and_physical_condition_appropriate": "true",
    "$.asset.engine_and_chassis_number_with_document_appropriate": "true",
    "ltw.loan_structure.finance_purpose_type": "P",
    "$.loan_structure.purpose.finance_purpose_id": "11",
    "ltw.custom_customer_professional_occupation_code":
      "DRIVER TAXI ONLINE / OJEK ONLINE",
    "ltw.custom_customer_professional_occupation_type_code": "Employee",
    "$.customer.professional.proof_monthly_income": "20000000",
    "$.customer.professional.proof_variable_income": "0",
    action: "submit",
  },
});
