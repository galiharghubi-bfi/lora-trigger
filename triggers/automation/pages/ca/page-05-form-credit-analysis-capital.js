/**
 * Page 5: Capital
 * Form: form_credit_analysis_capital
 * Sets default values for capital fields
 */
export const Page5Capital = () => ({
  formName: "form_credit_analysis_capital",
  payload: {
    "$.ltw.domicile_ownership_revision_checkbox": "false",
    "$.ltw.domicile_stay_since_revision_checkbox": "false",
    "$.ltw.domicile_address_street_revision_checkbox": "false",
    "$.ltw.domicile_bkr_form_revision_checkbox": "false",
    "$.ltw.bkr_period": "",
    "$.customer.domicile.name_on_bkr": "SUPARMAN",
    "$.documents.house.document_id": "29aca24d-4eff-433a-8a11-64a5dbf2c250",
    "$.ltw.domicile_address_house_document_revision_checkbox": "false",
    "$.documents.house_ownership.document_id":
      "d8e232eb-a4cc-4870-a8e4-4c10c98d2da8",
    "$.ltw.domicile_address_house_ownership_document_revision_checkbox":
      "false",
    action: "forward",
  },
});
