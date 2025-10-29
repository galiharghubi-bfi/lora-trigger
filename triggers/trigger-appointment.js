import baseConfig from "../config.js";

const url = baseConfig.mq_publish_url;
const username = baseConfig.mq_user;
const password = baseConfig.mq_password;

const queue = "q.lgs.scheduling.appointments.work";
const start = new Date();
start.setHours(18, 0, 0, 0);

const end = new Date(start.getTime() + 30 * 60 * 1000);
// const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

const appointment_time_target_start = start.toISOString();
const appointment_time_target_end = end.toISOString();

export const sendMq = async (workflowId, videoUrl, opts = {}) => {
  const {
    activity_type_code = "2W_VIRTUAL_SURVEY",
    appointment_uuid = crypto.randomUUID(),
    resource_identifiers,
    resource_type_code,
  } = opts

  const payload = {
    appointment_full_detail: {
      appointment_uuid,
      appointment_number: `2025${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      activity_type_code,
      appointment_reference: workflowId,
      location_type_code: "CUSTOMER_HOME",
      location_descriptor: "400",
      description: "",
      appointment_date_target: "2025-12-31",
      appointment_time_target_start,
      appointment_time_target_end,
      target_duration_minutes: 30,
      timezone_identifier: "Asia/Jakarta",
      priority_level: 0,
      system_owner_lookup_code: "SYSTEM_OWNER_LOS",
      process_identifier_lookup_code: "PROCESS_IDENTIFIER_SURVEY_SCHEDULE",
      canceled: false,
      cancel_reason:
        "Rescheduled to appointment 908275be-048a-4872-84e7-f7590b60e85a",
      canceled_at: "2025-04-15T06:26:19.923628Z",
      rescheduled: false,
      reschedule_reason:
        "Digital Partnership res-cheduling for partner bfi-qa-partner-goto on loan_submission_id f792d5b7-3461-4b6b-aa3f-07c11320ea32",
      rescheduled_at: new Date().toISOString(),
      rescheduled_to_appointment_uuid: "908275be-048a-4872-84e7-f7590b60e85a",
      resources: [
        {
          resource_identifiers,
          resource_type_code,
          resource_uuid: "3a794b35-6d6a-459b-89fa-b96fa589fd1a",
          pre_travel_duration_minutes: 30,
          post_travel_duration_minutes: 30,
          attribute_1: "test",
          attribute_2: "lipsum",
          attribute_3: "lipsum",
        },
        {
          resource_uuid: "3a794b35-6d6a-459b-89fa-b96fa589fd1a",
          resource_identifiers: "000001",
          pre_travel_duration_minutes: 30,
          post_travel_duration_minutes: 30,
          resource_type_code: "PROSPECT",
          attribute_1: "lipsum",
          attribute_2: "lipsum",
          attribute_3: "lipsum",
        },
      ],
      process_fields: [
        {
          process_field_key: "survey_pin",
          process_field_value: "123456",
          description: "Survey PIN",
        },
        {
          process_field_key: "survey_video_url",
          process_field_value: videoUrl,
          description: "Survey Video URL",
        },
      ],
    },
  };

  const body = {
    properties: {
      content_type: "application/json",
      delivery_mode: 2,
    },
    routing_key: queue,
    payload: JSON.stringify(payload),
    payload_encoding: "string",
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await res.json();
  if (result.routed) {
    console.log(`✔ Message sent to queue ${queue}`);
  } else {
    console.error("✘ Failed to route message:", result);
  }
};
