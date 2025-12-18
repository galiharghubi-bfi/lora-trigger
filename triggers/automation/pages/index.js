/**
 * Form payload templates for 4W survey automation (HIGH RISK and LOW RISK)
 * Re-exports from subdirectories for organized structure
 */

// Re-export HIGH RISK pages and sequence
export {
  Page1PIN,
  Page2Verification,
  Page3AssetDocument,
  Page4AssetCondition,
  Page5InfoLainnya,
  Page6InfoTambahan,
  Page7Financing,
  Page8PenyerahanBPKB,
  Page9AssetDokumen,
  Page10FinancingFinal,
  HIGH_RISK_FORM_SEQUENCE,
} from "./ndf4w-high/index.js";

// Re-export LOW RISK pages and sequence
export {
  Page2VerificationLow,
  Page3AssetDocumentLow,
  Page4AssetConditionLow,
  Page5PersonalInformationLow,
  Page6FinancingLow,
  Page7BpkbSubmissionLow,
  Page8AssetDocumentMandatoryLow,
  Page9FinancingStage2Low,
  Page10SuccessLow,
  LOW_RISK_FORM_SEQUENCE,
} from "./ndf4w-low/index.js";

export {
  Page1SelfAssign,
  Page2Profile,
  Page3Purpose,
  Page4Character,
  CA_FORM_SEQUENCE,
} from "./ca/index.js";

export {
  NDF2WPage1PIN,
  NDF2WPage2Verification,
  NDF2WPage3AssetDocument,
  NDF2WPage4AssetCondition,
  NDF2WPage5InfoLainnya,
  NDF2WPage6InfoTambahan,
  NDF2WPage7PenyerahanBPKB,
  NDF2WPage8AssetDokumen,
  NDF2W_FORM_SEQUENCE,
} from "./ndf2w/index.js";

// Export DEFAULT_FORM_SEQUENCE as alias for HIGH_RISK_FORM_SEQUENCE (backward compatibility)
export { HIGH_RISK_FORM_SEQUENCE as DEFAULT_FORM_SEQUENCE } from "./ndf4w-high/index.js";
