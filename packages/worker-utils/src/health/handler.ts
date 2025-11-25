import { HealthConfig, EnvLike } from "./types";
import { getLivenessResponse } from "./liveness";
import { getReadinessResponse } from "./readiness";

export function createHealthHandler(cfg: HealthConfig) {
  return {
    async handle(request: Request, env: EnvLike): Promise<Response> {
      const url = new URL(request.url);
      const path = url.pathname;

      if (path === "/healthz") {
        return getLivenessResponse(cfg);
      }

      if (path === "/readyz") {
        return getReadinessResponse(request, env, cfg);
      }

      return new Response("NOT_FOUND", { status: 404 });
    },
  };
}
