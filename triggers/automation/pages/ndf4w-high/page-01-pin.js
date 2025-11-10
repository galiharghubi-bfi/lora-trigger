/**
 * Page 1: PIN Challenge
 * Form: form_pin_challenge_show
 */
export const Page1PIN = (taskId, params = {}) => ({
  formName: "form_pin_challenge_show",
  payload: {
    inputted_pin: "123456",
    action: "submit",
  },
});
