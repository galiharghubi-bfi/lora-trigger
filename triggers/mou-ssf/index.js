import { faker } from "@faker-js/faker/locale/id_ID";
import baseConfig from "../../config.js";
import { generateLicensePlate } from "../utils/license_plate.js";

const licensePlate = generateLicensePlate();

// MOU SSF payload based on ReadSet defined in TRD
const customerName = faker.person.fullName();
const payload = {
  // ReadSet - Required fields
  "$.branch.id": "602",
  "$.branch.name": "Tangerang",
  "$.lead.product_id": "SSF",
  "$.customer.profile": "personal",
  "$.customer.type": "new",
  "$.business.main_showroom.name": faker.company.name(),
  
  // Process - Task assignment (HO employee ID)
  "$.process.survey_task.surveyor_employee_id": "000020",
  
  // Customer KTP information
  "$.customer.ktp.nik": "3174044410660002",
  "$.customer.ktp.name": customerName,
  "$.customer.ktp.birth_date": "1990-01-15",
  "$.customer.ktp.birth_place": "Jakarta",
  
  // Customer contact information
  "$.customer.contact.mobile_number": "+6281228749973",
  "$.customer.contact.email": faker.internet.email(),
};

export const MouSsf = async () => {
  const workflowId = crypto.randomUUID();
  
  // Start MOU SSF workflow with correct document schema
  const startPayload = {
    id: workflowId,
    name: "mou-ssf-v0_0_1",
  };
  
  try {
    const startResponse = await fetch(`${baseConfig.lgs_base_url}/application/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(startPayload),
    });
    
    if (!startResponse.ok) {
      throw new Error(`Failed to start workflow: ${await startResponse.text()}`);
    }
    
    console.log(`✔ MOU SSF Workflow started with ID: ${workflowId}`);
    
    // Add data to the workflow
    const dataResponse = await fetch(`${baseConfig.lgs_base_url}/application/${workflowId}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!dataResponse.ok) {
      throw new Error(`Failed to add data: ${await dataResponse.text()}`);
    }
    
    console.log(`✔ MOU SSF Task generated with workflowId: ${workflowId}`);
    console.log(`✔ Customer name: ${customerName}`);
    console.log(`✔ NIK: ${payload["$.customer.ktp.nik"]}`);
    console.log(`✔ Phone: ${payload["$.customer.contact.mobile_number"]}`);
    console.log(`✔ Product: ${payload["$.lead.product_id"]}`);
    console.log(`✔ Branch: ${payload["$.branch.id"]}`);
    console.log(`✔ Showroom: ${payload["$.business.main_showroom.name"]}`);
  } catch (error) {
    console.error("Error creating MOU SSF task:", error);
    throw error;
  }
};
