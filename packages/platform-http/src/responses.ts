import { addSecurityHeaders } from "./headers";

/**
 * Standard error envelope structure
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    correlationId: string;
    details?: unknown;
  };
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  correlationId: string,
  status: number = 500,
  details?: unknown
): Response {
  const body: ErrorResponse = {
    error: {
      code,
      message,
      correlationId,
      ...(details && { details }),
    },
  };

  return Response.json(body, {
    status,
    headers: {
      "Content-Type": "application/json",
      "X-Correlation-ID": correlationId,
    },
  });
}

/**
 * Create 405 Method Not Allowed response
 */
export function createMethodNotAllowedResponse(
  request: Request,
  allowedMethods: string[],
  correlationId: string
): Response {
  return createErrorResponse(
    "METHOD_NOT_ALLOWED",
    `Method ${request.method} not allowed. Allowed methods: ${allowedMethods.join(", ")}`,
    correlationId,
    405
  );
}

/**
 * Create redirect response
 */
export function createRedirectResponse(location: string, permanent: boolean = false): Response {
  return new Response(null, {
    status: permanent ? 301 : 302,
    headers: {
      Location: location,
    },
  });
}

/**
 * Create JSON response with security headers
 */
export function createJSONResponse(
  data: unknown,
  status: number = 200,
  correlationId?: string
): Response {
  const response = Response.json(data, { status });
  return addSecurityHeaders(response, correlationId);
}
