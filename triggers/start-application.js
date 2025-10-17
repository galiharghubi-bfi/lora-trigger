import baseConfig from "../config.js";

export function StartApplication() {
  const workflowId = crypto.randomUUID();

  const payload = {
    id: workflowId,
    name: "dp-ndf-v0_3_0",
  };
  const start = fetch(`${baseConfig.lgs_base_url}/application/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return { start, workflowId };
}
