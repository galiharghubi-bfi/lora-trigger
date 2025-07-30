import { Ndf4w, Ndf2w } from "./triggers/survey/index.js";
import { Ca } from "./triggers/underwriting/index.js";
(async () => {
  const triggerType = process.argv[2];
  const productType = process.argv[3];
  if (!triggerType || (triggerType === "survey" && !productType)) {
    console.log("Invalid trigger type or product type");
    return;
  }
  switch (triggerType) {
    case "survey":
      switch (productType) {
        case "ndf2w":
          console.log("✔ Triggering survey, product type: ndf2w");
          await Ndf2w();
          break;
        case "ndf4w":
          console.log("✔ Triggering survey, product type: ndf4w");
          await Ndf4w();
          break;
        default:
          console.log("Invalid product type");
          break;
      }
      break;
    case "underwriting":
      console.log("✔ Triggering underwriting, product type: ca");
      await Ca();
      break;
    default:
      console.log("Invalid trigger type");
      break;
  }
})();
