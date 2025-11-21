/**
 * Page 3: Purpose
 * Form: form_credit_analysis_purpose
 * Sets default values for purpose fields
 */
export const Page3Purpose = () => ({
  formName: "form_credit_analysis_purpose",
  payload: {
    "$.underwriting.purpose.purpose_of_financing": "Produktif",
    "$.ltw.custom_purpose_finance_code": "Kendaraan untuk usaha",
    "$.loan_structure.purpose.finance_purpose_details": "-",
    action: "forward",
  },
});
