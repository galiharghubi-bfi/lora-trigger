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
    task_poll_interval_ms: 3000,        // Poll every 3 seconds
    task_poll_timeout_ms: 120000,       // 2 minutes total timeout

    // Form state change retry settings (waitForFormChange)
    form_change_max_retries: 3,         // Max retry attempts
    form_change_retry_delay_ms: 10000,  // 10 seconds between retries

    // Form submission delay (executeFormSequence)
    form_submission_delay_ms: 5000,     // 5 seconds between pages
  },
};

export default baseConfig;
