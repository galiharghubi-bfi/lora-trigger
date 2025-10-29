import { Ndf4w, Ndf2w } from "./triggers/survey/index.js";
import { Ca } from "./triggers/underwriting/index.js";
import { Ops } from "./triggers/bpkbreview/index.js";
import {Ndf4wMq} from "./triggers/survey/ndf4w-mq.js";

function parseArgs() {
  const [, , taskType, triggerType, ...rest] = process.argv;

  const namedArgs = rest.reduce((acc, arg) => {
    const [key, value] = arg.split("=");
    if (key && value) acc[key] = value;
    return acc;
  }, {});

  return {
    taskType,
    triggerType,
    actor: namedArgs.actor || "admin",
    workflowId: namedArgs.workflow,
    appointmentId: namedArgs.appointment,
  };
}

(async () => {
  const { taskType, triggerType, actor, workflowId, appointmentId } = parseArgs();

  if (!taskType || (taskType === "survey" && !triggerType)) {
    console.error("❌ Invalid task type or missing trigger type");
    return;
  }

  switch (taskType) {
    case "survey":
      switch (triggerType) {
        case "ndf2w":
          console.log("✔ Triggering survey, product type: ndf2w");
          await Ndf2w(actor.toLowerCase());
          break;
        case "ndf4w":
          console.log("✔ Triggering survey, product type: ndf4w");
          await Ndf4w(actor.toLowerCase());
          break;
        case "ndf4w-mq":
          if (!workflowId || !appointmentId) {
            console.error("❌ Missing workflow or appointment for ndf4w-mq trigger");
            return;
          }

          console.log("✔ Triggering survey mq only, product type: ndf4w");
          await Ndf4wMq(actor.toLowerCase(), workflowId, appointmentId);
          break;
        default:
          console.log("Invalid trigger type");
          break;
      }
      break;
    case "underwriting":
      switch (triggerType) {
        case "ca":
          console.log("✔ Triggering underwriting, trigger type: ca");
          await Ca();
          break;
        default:
          console.log("Invalid trigger type");
          break;
      }
      break;
    case "bpkbreview":
      switch (triggerType) {
        case "ops":
          console.log("✔ Triggering operation, trigger type: ops");
          await Ops();
          break;
        default:
          console.log("Invalid trigger type");
          break;
      }
      break;
    default:
      console.log("Invalid task type");
      break;
  }
})();
