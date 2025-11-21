/**
 * Page 4: Character
 * Form: form_credit_analysis_character
 * Sets default values for character fields
 */
export const Page4Character = () => ({
  formName: "form_credit_analysis_character",
  payload: {
    "$.underwriting.character.ro_bfi_total_exposure_including_application": "",
    "$.underwriting.character.ro_bfi_total_monthly_installment_including_application":
      "",
    "$.process.obligor.latest_exposure": "0",
    "$.underwriting.character.pefindo_max_past_due_last_6_month": "0",
    "$.underwriting.character.pefindo_rating": "COLL1",
    "$.underwriting.character.pefindo_total_active_contract": "0",
    "$.underwriting.character.pefindo_last_update": "",
    "$.underwriting.character.other_financing_record": "-",
    "$.underwriting.character.total_other_installment_amount": "0",
    "$.underwriting.character.total_monthly_installment_pefindo": "",
    "$.underwriting.character.total_osp_pefindo": "",
    "$.underwriting.character.max_past_due_days_pefindo": "",
    "$.ltw.character.pefindo_information_data": "",
    action: "forward",
  },
});
