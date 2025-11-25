import { HealthConfig } from "./types";

export function getLivenessResponse(cfg: HealthConfig): Response {
  const body = {
    service: cfg.service,
    env: cfg.envName || "unknown",
    version: typeof __VERSION__ !== "undefined" ? __VERSION__ : "local",
    ok: true,
    ts: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
