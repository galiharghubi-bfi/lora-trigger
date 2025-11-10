/**
 * Page 8: Penyerahan BPKB (BPKB Submission)
 * Form: form_penyerahan_bpkb_show
 */
export const Page8PenyerahanBPKB = (taskId, params = {}) => ({
  formName: "form_penyerahan_bpkb_show",
  payload: {
    "$.process.survey_task.bpkb_submission.submission_method": "HOME_PICKUP",
    "$.ltw.custom_branch_pos_id": "4630000",
    "$.ltw.custom_branch_pos_id_recommended": "4630000",
    "appointment-date-time__date__ltw_survey_task_bpkb_submission_submission_appointment_with_selected_time": "2025-10-31",
    "$.ltw.survey_task.bpkb_submission.submission_appointment_with_selected_time": "2025-10-31T04:00:00.000Z",
    "appointment-date-time__date__ltw_survey_task_bpkb_submission_submission_appointment_with_default_time": "",
    "$.ltw.survey_task.bpkb_submission.submission_appointment_with_default_time": "",
    "$.process.survey_task.bpkb_submission.verificator_notes": "",
    "$.process.survey_task.bpkb_submission.submission_domicile_address.street_address": "JL. JAKARTA RAYA",
    "$.process.survey_task.bpkb_submission.submission_domicile_address.sub_district_code": "32.73.27.1003",
    action: "submit",
  },
});
