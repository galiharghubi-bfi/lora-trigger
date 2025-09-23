import { Ndf4w, Ndf2w } from "./triggers/survey/index.js";
import { Ca } from "./triggers/underwriting/index.js";
import { Ops } from "./triggers/bpkbreview/index.js";
(async () => {
  const taskType = process.argv[2];
  const triggerType = process.argv[3];
  if (!taskType || (taskType === "survey" && !triggerType)) {
    console.log("Invalid task type or trigger type");
    return;
  }
  switch (taskType) {
    case "survey":
      switch (triggerType) {
        case "ndf2w":
          console.log("✔ Triggering survey, product type: ndf2w");
          await Ndf2w();
          break;
        case "ndf4w":
          console.log("✔ Triggering survey, product type: ndf4w");
          await Ndf4w();
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
