/**
 * Page 1: Self Assign
 * Form: form_credit_analysis_assignment
 * Assigns a random underwriter to the application
 */
export const Page1SelfAssign = (taskId, params = {}) => ({
  formName: "form_credit_analysis_assignment",
  payload: {
    action: "assign",
  },
});
