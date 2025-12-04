/**
 * Page 6: Collateral
 * Form: form_credit_analysis_collateral
 * Sets default values for collateral fields
 */
export const Page6Collateral = () => ({
  formName: "form_credit_analysis_collateral",
  payload: {
    "$.ltw.asset_vehicle_brand_revision_checkbox": "true",
    "$.ltw.asset_vehicle_manufacturing_year_revision_checkbox": "true",
    "$.ltw.asset_provisional_amount_revision_checkbox": "false",
    "$.ltw.asset_tenure_revision_checkbox": "false",
    "$.ltw.asset_vehicle_bpkb_ownership_revision_checkbox": "false",
    "$.ltw.asset_bpkb_owner_name_revision_checkbox": "false",
    "$.underwriting.collateral.unit_user": "SPOUSE",
    "$.underwriting.collateral.total_contracts_in_submission": "1",
    "$.underwriting.collateral.asset_category": "A",
    "$.asset.asset_usage": "COMMERCIAL",
    "$.documents.asset.asset_front.document_id":
      "eb4196d1-73f8-4f12-989a-4f62fb8ed1e0",
    "$.ltw.asset_document_front_revision_checkbox": "false",
    "$.documents.asset.asset_rear.document_id":
      "d316e28d-941c-4b7e-9cb4-86fc8eb6aaa5",
    "$.ltw.asset_document_rear_revision_checkbox": "false",
    "$.documents.asset.asset_front_right_side.document_id":
      "ed855b62-ecac-4610-8801-25efaa8141b2",
    "$.ltw.asset_document_front_right_side_revision_checkbox": "false",
    "$.documents.asset.asset_front_left_side.document_id":
      "19c9d46d-2a1a-48e4-b5f7-b39c2aec5309",
    "$.ltw.asset_document_front_left_side_revision_checkbox": "false",
    "$.documents.asset.asset_rear_right_side.document_id":
      "6629261a-8f65-4f9c-a601-13dde8d488ef",
    "$.ltw.asset_document_rear_right_side_revision_checkbox": "false",
    "$.documents.asset.asset_rear_left_side.document_id":
      "76e603f3-90eb-4243-8545-7ce4e99f4182",
    "$.ltw.asset_document_rear_left_side_revision_checkbox": "false",
    "$.documents.asset.asset_interior_center_sid.document_id":
      "f8da0044-ea1d-411e-98d7-9494064b2cdf",
    "$.ltw.asset_document_interior_center_side_revision_checkbox": "false",
    "$.documents.asset.asset_left_side.document_id":
      "02892031-e018-4430-b673-c8e628b2191f",
    "$.ltw.asset_document_left_side_revision_checkbox": "false",
    "$.documents.asset.asset_right_side.document_id":
      "455f6b94-5a63-496a-ac38-6e2d47aa6372",
    "$.ltw.asset_document_right_side_revision_checkbox": "false",
    "$.documents.asset.engine_number.document_id":
      "37a71585-fa6c-441c-91c1-8dfd6264a4e8",
    "$.ltw.asset_document_engine_number_revision_checkbox": "false",
    "$.documents.asset.speedometer.document_id":
      "3bb0edda-c3e0-4d5c-bee6-56ea985bcf64",
    "$.ltw.asset_document_speedometer_revision_checkbox": "false",
    "$.documents.bpkb_receipt_2.document_id":
      "99a0c247-94c1-480e-adb3-6d4bc46b9a8e",
    "$.ltw.asset_document_blanko_bpkb_revision_checkbox": "false",
    "$.documents.customer_receipt_2.document_id":
      "71c3357b-76df-444f-8480-b4741ea30bce",
    "$.ltw.asset_document_blanko_customer_revision_checkbox": "false",
    "$.documents.payment_receipt.document_id":
      "4f7a5a7e-32f7-46a9-8c4e-f409bd7e0163",
    "$.ltw.asset_document_payment_receipt_revision_checkbox": "false",
    "$.documents.bpkb_page_1.document_id":
      "4cff8632-eb75-469e-8be7-00a7486f2e17",
    "$.ltw.asset_document_bpkb_page_1_revision_checkbox": "false",
    "$.documents.bpkb_page_2.document_id":
      "e41e5ef9-236b-4b56-bd9c-9ec1bd1a040f",
    "$.ltw.asset_document_bpkb_page_2_revision_checkbox": "false",
    "$.documents.bpkb_page_3.document_id":
      "7c02f985-d1ad-4776-a118-4547403b5b1f",
    "$.ltw.asset_document_bpkb_page_3_revision_checkbox": "false",
    "$.documents.bpkb_page_4.document_id":
      "5821fecf-19a2-4f0f-a3eb-23b53685302d",
    "$.ltw.asset_document_bpkb_page_4_revision_checkbox": "false",
    "$.documents.bpkb_page_5.document_id":
      "99a0c247-94c1-480e-adb3-6d4bc46b9a8e",
    "$.ltw.asset_document_bpkb_page_5_revision_checkbox": "false",
    "$.documents.vehicle_inspection.document_id":
      "99a0c247-94c1-480e-adb3-6d4bc46b9a8e",
    "$.ltw.asset_document_vehicle_inspection_revision_checkbox": "false",
    "$.documents.invoice.document_id": "4f7a5a7e-32f7-46a9-8c4e-f409bd7e0163",
    "$.ltw.asset_document_invoice_revision_checkbox": "false",
    "$.documents.ktp_bpkb.document_id": "99a0c247-94c1-480e-adb3-6d4bc46b9a8e",
    "$.ltw.asset_document_ktp_bpkb_revision_checkbox": "false",
    "$.documents.chassis_number.document_id":
      "a188cea8-b9e0-4ef9-b33a-a138ab7a0051",
    "$.ltw.asset_document_chassis_number_revision_checkbox": "false",
    "$.documents.tax_notice.document_id":
      "eb07c500-081e-4b72-8a7e-8e672f48d093",
    "$.ltw.asset_document_tax_notice_revision_checkbox": "false",
    "$.documents.stnk.document_id": "785a1709-8f37-4893-b3a9-dc1189c96f34",
    "$.ltw.asset_document_stnk_revision_checkbox": "false",
    "$.documents.release_letter.document_id":
      "99a0c247-94c1-480e-adb3-6d4bc46b9a8e",
    "$.ltw.asset_document_release_letter_revision_checkbox": "false",
    action: "forward",
  },
});
