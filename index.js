import { Ndf4w, Ndf2w } from "./triggers/survey/index.js";
(async () => {
  const triggerType = process.argv[2];
  const productType = process.argv[3];
  if (!triggerType || !productType) {
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
    default:
      console.log("Invalid trigger type");
      break;
  }
})();
