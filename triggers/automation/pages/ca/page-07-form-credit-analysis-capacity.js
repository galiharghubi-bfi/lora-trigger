/**
 * Page 7: Capacity
 * Form: form_credit_analysis_capacity
 * Sets default values for capacity fields
 */
export const Page7Capacity = () => ({
  formName: "form_credit_analysis_capacity",
  payload: {
    "$.underwriting.capacity.consumer_work_location_minimum_wage_type": "UMP",
    "$.ltw.capacity.consumer_ump_umk_code": "Aceh (NAD)",
    "$.underwriting.capacity.consumer_work_location_minimum_wage": "2905119",
    "$.underwriting.capacity.spouse_work_location_minimum_wage_type": "UMP",
    "$.ltw.capacity.spouse_ump_umk_code": "Banten",
    "$.underwriting.capacity.spouse_work_location_minimum_wage": "3685616",
    "$.documents.income_proof.document_id":
      "eb075101-72f0-4f1c-89f5-30d504eb4382",
    "$.ltw.employment_income_proof_document_revision_checkbox": "false",
    "$.documents.business_photo.document_id":
      "a188cea8-b9e0-4ef9-b33a-a138ab7a0051",
    "$.ltw.business_photo_document_revision_checkbox": "false",
    "$.documents.business_location.document_id":
      "c507e104-36c1-49d6-8d7d-4931fee86559",
    "$.ltw.business_location_document_revision_checkbox": "false",
    "$.documents.business_legality.document_id":
      "c507e104-36c1-49d6-8d7d-4931fee86559",
    "$.ltw.business_legality_document_revision_checkbox": "false",
    "$.underwriting.capacity.consumer_occupation": "PNS/Karyawan Swasta",
    "$.ltw.capacity.evidence_of_capacity_professional_wiraswasta": "",
    "$.ltw.capacity.evidence_of_capacity_pns_karyawan_swasta":
      '[{"evidence_type":"Interview / Estimasi Income","evidence_type_on_behalf":"Debitur","should_include_in_capacity_calculation":false,"m1_income":123123112,"m2_income":null,"m3_income":null,"other_income":null}]',
    action: "forward",
  },
});
