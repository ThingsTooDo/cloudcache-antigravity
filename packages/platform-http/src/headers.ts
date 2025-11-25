/**
 * Security headers to add to all responses
 */
export const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
} as const;

/**
 * Add security headers to a response
 */
export function addSecurityHeaders(response: Response, correlationId?: string): Response {
  const newResponse = response.clone();

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });

  if (correlationId) {
    newResponse.headers.set("X-Correlation-ID", correlationId);
  }

  return newResponse;
}

/**
 * CORS headers for API responses
 */
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Correlation-ID",
  "Access-Control-Max-Age": "86400",
} as const;

/**
 * Add CORS headers to a response
 */
export function addCORSHeaders(response: Response): Response {
  const newResponse = response.clone();
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}
