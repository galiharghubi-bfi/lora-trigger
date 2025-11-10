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

// Export DEFAULT_FORM_SEQUENCE as alias for HIGH_RISK_FORM_SEQUENCE (backward compatibility)
export { HIGH_RISK_FORM_SEQUENCE as DEFAULT_FORM_SEQUENCE } from "./ndf4w-high/index.js";
