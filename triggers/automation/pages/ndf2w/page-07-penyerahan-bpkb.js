import dayjs from "dayjs";

/**
 * Page 7: Penyerahan BPKB (BPKB Submission)
 * Form: form_bpkb_submission_show
 */
export const Page7PenyerahanBPKB = (taskId, params = {}) => ({
  formName: "form_bpkb_submission_show",
  payload: {
    "$.process.survey_task.bpkb_submission.submission_method": "BRANCH_DROPOFF",
    "$.ltw.custom_branch_pos_id": "5370013",
    "$.ltw.custom_branch_pos_id_recommended": "5370013",
    "appointment-date-time__date__ltw_survey_task_bpkb_submission_submission_appointment_with_selected_time":
      "",
    "$.ltw.survey_task.bpkb_submission.submission_appointment_with_selected_time":
      "",
    "appointment-date-time__date__ltw_survey_task_bpkb_submission_submission_appointment_with_default_time":
      "2025-12-25",
    "$.ltw.survey_task.bpkb_submission.submission_appointment_with_default_time":
      "2025-12-25T02:00:00.000Z",
    "$.process.survey_task.bpkb_submission.verificator_notes": "",
    "$.process.survey_task.bpkb_submission.submission_domicile_address.street_address":
      "JL KEBAGUSAN AJA",
    "$.process.survey_task.bpkb_submission.submission_domicile_address.sub_district_code":
      "32.73.27.1003",
    action: "submit",
  },
});
