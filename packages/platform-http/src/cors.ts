import { CORS_HEADERS } from "./headers";

/**
 * Handle CORS preflight requests
 */
export function handleCORS(request: Request): Response | null {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }
  return null;
}

/**
 * Handle OPTIONS requests (CORS preflight)
 */
export function handleOPTIONS(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
