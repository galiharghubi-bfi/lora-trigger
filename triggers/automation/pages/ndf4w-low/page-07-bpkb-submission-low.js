/**
 * Page 7: BPKB Submission (LOW RISK)
 * Form: form_bpkb_submission_show
 * BPKB submission method and branch selection
 */
export const Page7BpkbSubmissionLow = (taskId, params = {}) => ({
  formName: "form_bpkb_submission_show",
  payload: {
    "$.process.survey_task.bpkb_submission.submission_method": "BRANCH_DROPOFF",
    "$.ltw.custom_branch_pos_id": "5670000",
    "$.ltw.custom_branch_pos_id_recommended": "5670000",
    "$.process.survey_task.bpkb_submission.verificator_notes": "",
    "$.documents.debtor_signature.document_id": "",
    "$.documents.bpkb_receipt_2.document_id": "",
    "$.documents.customer_receipt_2.document_id": "",
    "$.documents.payment_receipt.document_id": "",
    action: "submit",
  },
});
