/**
 * NDF4W HIGH RISK Form Pages
 * Form payload templates for 4W High Risk survey automation
 */

// Export all HIGH RISK page functions
export { Page1PIN } from "./page-01-pin.js";
export { Page2Verification } from "./page-02-verification.js";
export { Page3AssetDocument } from "./page-03-asset-document.js";
export { Page4AssetCondition } from "./page-04-asset-condition.js";
export { Page5InfoLainnya } from "./page-05-info-lainnya.js";
export { Page6InfoTambahan } from "./page-06-info-tambahan.js";
export { Page7Financing } from "./page-07-financing.js";
export { Page8PenyerahanBPKB } from "./page-08-penyerahan-bpkb.js";
export { Page9AssetDokumen } from "./page-09-asset-dokumen.js";
export { Page10FinancingFinal } from "./page-10-financing-final.js";

// Import for internal use in HIGH_RISK_FORM_SEQUENCE
import { Page1PIN } from "./page-01-pin.js";
import { Page2Verification } from "./page-02-verification.js";
import { Page3AssetDocument } from "./page-03-asset-document.js";
import { Page4AssetCondition } from "./page-04-asset-condition.js";
import { Page5InfoLainnya } from "./page-05-info-lainnya.js";
import { Page6InfoTambahan } from "./page-06-info-tambahan.js";
import { Page7Financing } from "./page-07-financing.js";
import { Page8PenyerahanBPKB } from "./page-08-penyerahan-bpkb.js";
import { Page9AssetDokumen } from "./page-09-asset-dokumen.js";
import { Page10FinancingFinal } from "./page-10-financing-final.js";

/**
 * Form sequence for 4W High Risk survey automation
 * Complete the survey from PIN entry to final financing verification
 */
export const HIGH_RISK_FORM_SEQUENCE = [
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
];
