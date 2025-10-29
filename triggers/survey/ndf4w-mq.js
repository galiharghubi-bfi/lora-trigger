import baseConfig from "../../config.js";
import {sendMq} from "../trigger-appointment.js";
import {mapActor} from "./ndf2w.js";

export const Ndf4wMq = async (actor, workflowId, appointmentId) => {
  try {
    const res = await fetch(`${baseConfig.lts_base_url}/rtc/web/url`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const videoUrl = await res.json();
    await sendMq(workflowId, videoUrl.url, {
      activity_type_code: "4W_REGULAR_SURVEY",
      appointment_uuid: appointmentId ?? crypto.randomUUID(),
      ...(mapActor[actor] ?? mapActor['admin']),
    });
  } catch (error) {
    console.error(error);
  }
};
