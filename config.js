const baseConfig = {
  lgs_base_url: "http://127.0.0.1:8081",
  lts_base_url: "http://127.0.0.1:8082",
  mq_publish_url:
    "http://localhost:15672/api/exchanges/%2f/amq.default/publish",
  mq_user: "guest",
  mq_password: "guest",
  arango_url: "http://127.0.0.1:8529",
  arango_db: "test",
  arango_user: "root",
  arango_password: "root",

  // Automation configuration
  automation: {
    // Task polling settings (waitForTask)
    task_poll_interval_ms: 3000,
    task_poll_timeout_ms: 120000,

    // Form state change retry settings (waitForFormChange)
    form_change_max_retries: 10,
    form_change_retry_delay_ms: 5000,

    // Form resubmission settings (when form is stuck)
    form_resubmit_enabled: true,

    // Form submission delay (executeFormSequence)
    form_submission_delay_ms: 2000,
  },
};

export default baseConfig;
