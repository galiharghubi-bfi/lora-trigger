/**
 * NDF4W LOW RISK Form Pages
 * Form payload templates for 4W Low Risk survey automation
 */

// Re-export Page1PIN from HIGH RISK (same for both risk levels)
export { Page1PIN } from "../ndf4w-high/page-01-pin.js";

// Export all LOW RISK specific page functions
export { Page2VerificationLow } from "./page-02-verification-low.js";
export { Page3AssetDocumentLow } from "./page-03-asset-document-low.js";
export { Page4AssetConditionLow } from "./page-04-asset-condition-low.js";
export { Page5PersonalInformationLow } from "./page-05-personal-information-low.js";
export { Page6FinancingLow } from "./page-06-financing-low.js";
export { Page7BpkbSubmissionLow } from "./page-07-bpkb-submission-low.js";
export { Page8AssetDocumentMandatoryLow } from "./page-08-asset-document-mandatory-low.js";
export { Page9FinancingStage2Low } from "./page-09-financing-stage-2-low.js";
export { Page10SuccessLow } from "./page-10-success-low.js";

// Import for internal use in LOW_RISK_FORM_SEQUENCE
import { Page1PIN } from "../ndf4w-high/page-01-pin.js";
import { Page2VerificationLow } from "./page-02-verification-low.js";
import { Page3AssetDocumentLow } from "./page-03-asset-document-low.js";
import { Page4AssetConditionLow } from "./page-04-asset-condition-low.js";
import { Page5PersonalInformationLow } from "./page-05-personal-information-low.js";
import { Page6FinancingLow } from "./page-06-financing-low.js";
import { Page7BpkbSubmissionLow } from "./page-07-bpkb-submission-low.js";
import { Page8AssetDocumentMandatoryLow } from "./page-08-asset-document-mandatory-low.js";
import { Page9FinancingStage2Low } from "./page-09-financing-stage-2-low.js";
import { Page10SuccessLow } from "./page-10-success-low.js";

/**
 * Form sequence for 4W Low Risk survey automation
 * Different from HIGH RISK: skips Info Tambahan, adds Success page, different form names and payloads
 */
export const LOW_RISK_FORM_SEQUENCE = [
  Page1PIN, // Same PIN page for both HIGH and LOW RISK
  Page2VerificationLow,
  Page3AssetDocumentLow,
  Page4AssetConditionLow,
  Page5PersonalInformationLow,
  Page6FinancingLow,
  Page7BpkbSubmissionLow,
  Page8AssetDocumentMandatoryLow,
  Page9FinancingStage2Low,
  Page10SuccessLow,
];
