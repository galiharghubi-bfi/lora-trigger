import { Page1PIN as NDF2WPage1PIN } from "./page-01-pin";
import { Page2Verification as NDF2WPage2Verification } from "./page-02-verification";
import { Page3AssetDocument as NDF2WPage3AssetDocument } from "./page-03-asset-document";
import { Page4AssetCondition as NDF2WPage4AssetCondition } from "./page-04-asset-condition";
import { Page5InfoLainnya as NDF2WPage5InfoLainnya } from "./page-05-info-lainnya";
import { Page6InfoTambahan as NDF2WPage6InfoTambahan } from "./page-06-financing";
import { Page7PenyerahanBPKB as NDF2WPage7PenyerahanBPKB } from "./page-07-penyerahan-bpkb";
import { Page8AssetDokumen as NDF2WPage8AssetDokumen } from "./page-08-asset-dokumen";

export {
  NDF2WPage1PIN,
  NDF2WPage2Verification,
  NDF2WPage3AssetDocument,
  NDF2WPage4AssetCondition,
  NDF2WPage5InfoLainnya,
  NDF2WPage6InfoTambahan,
  NDF2WPage7PenyerahanBPKB,
  NDF2WPage8AssetDokumen,
};

export const NDF2W_FORM_SEQUENCE = [
  NDF2WPage1PIN,
  NDF2WPage2Verification,
  NDF2WPage3AssetDocument,
  NDF2WPage4AssetCondition,
  NDF2WPage5InfoLainnya,
  NDF2WPage6InfoTambahan,
  NDF2WPage7PenyerahanBPKB,
  NDF2WPage8AssetDokumen,
];
