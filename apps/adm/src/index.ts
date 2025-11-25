import { getEnv, AdminEnvSchema, type AdminEnv } from "@cloudcache/platform-env";
import { getCloudcacheValidatedBadge } from "@cloudcache/worker-utils";
import { createLoggerFromRequest, getCorrelationId } from "@cloudcache/platform-logging";
import {
  createErrorResponse,
  handleCORS,
  canonicalizePath,
  shouldRedirect,
  createRedirectResponse,
  isMethodAllowed,
  createMethodNotAllowedResponse,
  addSecurityHeaders,
  createJSONResponse,
} from "@cloudcache/platform-http";

declare const __VERSION__: string;

const FAVICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWlJREFUWEftl1tsFGUUx//nm53Z3XZbCpSr3AqkFSRUaEuCIAEUAz5ohFIh3lChghciEaokICiIgfjggyjBcFFCqLWlEoxQKLYqVUICFSEqhXIrFC2Udm27l9md75jZQrvLDmVbHnxxnnZnz+V3zvmf78sSuvhwYdYDAL8M6XqXcsqbuxgG1BVHLsqYAkYRADukHEI5lde6Esf06TQA7856BlJuCSUHPqLsY8u6mrxTAGzCfp25HMRrW8GpCdIYdi/VxwzAZZNtqG/eCHBuW7WEtTTr2Mp7qT4mAN4xOg1x2sdgng6HBvh0wDDA56sqiVCMxAFbaVHVla6C3FEDXDDSJf+q2yCS+y6AZrdFJGi+Dr5ysfWVEF6yuTYgcc4H9MrmQGdBLAH485Q+rLv3U88BD8KmRsY0guCaU4A02qfh0MCGKKGeqbPo+d9aOgMRBcDbJjs4ePpH6tYnC0KJisWNl0F6A9gcxW0Pqc7deN2TTUQcK0Q0wFfp6yGUPJBFc1QCXzoOsIysPgyGHEkvUm7j9k4D8OrVAqO+XQeH+nZIaBYPN9UA3rqOYyvqRRr4aBo9vs8fC0SoTC4Y70QctsOn59zRiRnsMcXeXr2lbbAZZKOtSBrzJj1Z0cTfjBqI5qupEGoQjkGnaObR+nA/4oIxvSCUYoAnxEJ8VxvFDW48C5DiAdkawHp/MLfOk0QANvsecvZdSrPOh9aIuDDjDIDhUYFv7bxVxjv9ZjSC9fMddonMjdGNa+TsO41mXjlhArQr1ipwRyDhcFojuOWcOdC7NilkoKhnCJnpkQCxud5mxWBcBvgu4jTbbVYfvjH2bvOJizOGtUUUF5aybF7Y9p3jQHIo2o7g8NShzvjAyjmA3G3Bw5MYPicMbxwUtB5awuEDOX3tK6zYiyKWnQ/0n8B67eFbFiRGAh6ndV8oAGhnweSx/L3F3RsrvtsLT9CF5Ynr0UfUAYJhn3AEIsndqknF8UskgKnWUmcFDN94GPGA937r5MILOE2lW58XptPli2OQd6g45P+GayPS1ZOhz1rGSdgG3by7yL4v+iQ83C8Tvr8r0DxcQzAhGkD9B4gz295+F1hSSoGKyrnwBPrjYfk9CAxyeaBlXAACN8egxL9jfRmVDF2Fpu6ro1fzOpBwKXaldyRqUhrgSkmzBijM/AHgSRH+CbWA6+qdQ95a15jWloKgHjn0UH1x9AiKMx6DgZKwTH4k1xhw1sWF3sWUIMz7dnunqxr+uEWUVXcwJMTwkphBKMw4Aqc2rvVCohsgegqjxa/wVk2ENNIgrYQRwwFC5rrYT8DILqfMzYFnnz6XDlXURQIUZT4B5j1BacPx2sygy+mZuObAKj2/aEglL5ntbPI2TffrWuni4MYU1v0NREJXmEYENc2d/+V9lXNnV0+ETVzftSvlT33ZzLHqhqLKOXNqhgopByd0H/yT212dpsKmGYI9xMoMhXGwDaD1Ot57HA4tvez3Sb4tx17NY+ZTIJ63M3/IvJaFM5YQCz8E98tt2JRMwM8Go4GIXzIPfxUiLwBeAYjSnSOeK/JcdfyhCiX7hfpP3iLi/ZJkmZBqIYNvCIEdkrGECbntAAVjp0LQIRDtfa9s3fun61JzwchHvGMcvF58lvRaqSp4gWTelXvj094gMS0osU4TtFhC6kHZslIViR8So3Zzz0XlYDlWEHvn12/qxoJSmdQ1wvBnAyKRhDzKTLNZUb5oB9g22YFe+iOI10poSnnQaqpNC2dMlQq12AzWYSMloBtSUxUVhsEQNEAatmqF0N0QshFsJLMUtQQapCjkD0pJwqE0kt/QWHIPReEqw2FP6PQ/oxjk1imT/wH+8w78C6AoQ9jJ3s9uAAAAAElFTkSuQmCC";

export default {
  async fetch(request: Request, env: unknown): Promise<Response> {
    const correlationId = getCorrelationId(request);
    const url = new URL(request.url);
    const pathname = canonicalizePath(url.pathname);

    // Handle simple routes that don't require environment validation
    // These routes should work even in local dev without secrets

    // Serve favicon
    if (pathname === "/favicon.ico") {
      const faviconData = Uint8Array.from(atob(FAVICON_BASE64), (c) => c.charCodeAt(0));
      const response = new Response(faviconData.buffer, {
        headers: {
          "Content-Type": "image/x-icon",
          "Cache-Control": "public, max-age=31536000",
        },
      });
      return addSecurityHeaders(response, correlationId);
    }

    // Health check endpoints (simple version, no env validation)
    if (pathname === "/healthz") {
      const response = createJSONResponse(
        { status: "ok", service: "admin", version: __VERSION__ },
        200,
        correlationId
      );
      return response;
    }

    // Root route - show validation marker (no env validation needed)
    if (pathname === "/") {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADM</title>
  <style>
    body { margin: 0; padding: 0; height: 100vh; display: grid; grid-template-rows: 60px 1fr 60px; grid-template-columns: 200px 1fr; font-family: sans-serif; background: #FFFFFF; }
    .header { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .sidebar { display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .footer { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .main { display: flex; justify-content: center; align-items: center; }
    .title { font-size: 30px; color: red; animation: slideIn 1s ease-out; }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="header">Header</div>
  <div class="sidebar">Left Sidebar</div>
  <div class="main" style="flex-direction: column;">
    <div class="title" title="I love Cloudflare (adm)">I love Cloudflare (adm)</div>
    <a href="/about" style="margin-top: 20px; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">About page</a>
  </div>
  <div class="footer">Footer</div>
  <div id="cloudcache-validated-badge" style="display:none">Cloudcache Validated</div>
</body>
</html>
      `.trim();
      const response = new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      return addSecurityHeaders(response, correlationId);
    }

    // About Page
    if (pathname === "/about") {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADM</title>
  <style>
    body { margin: 0; padding: 0; height: 100vh; display: grid; grid-template-rows: 60px 1fr 60px; grid-template-columns: 200px 1fr; font-family: sans-serif; background: #FFFFFF; }
    .header { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .sidebar { display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .footer { grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; font-size: 20px; color: black; }
    .main { display: flex; justify-content: center; align-items: center; }
    .title { font-size: 30px; color: red; animation: slideIn 1s ease-out; }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="header">Header</div>
  <div class="sidebar">Left Sidebar</div>
  <div class="main">
    <div class="title">About Page</div>
  </div>
  <div class="footer">Footer</div>
</body>
</html>
      `.trim();
      const response = new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
        },
      });
      return addSecurityHeaders(response, correlationId);
    }

    // From here on, routes require environment validation
    // Validate environment variables (fail fast)
    let adminEnv: AdminEnv;
    try {
      adminEnv = getEnv(AdminEnvSchema, env);
    } catch (error) {
      return createErrorResponse(
        "ENV_VALIDATION_ERROR",
        error instanceof Error ? error.message : "Environment validation failed",
        correlationId,
        500
      );
    }

    // Create logger with correlation ID
    const logger = createLoggerFromRequest(request);

    // Handle CORS preflight
    const corsResponse = handleCORS(request);
    if (corsResponse) {
      return addSecurityHeaders(corsResponse, correlationId);
    }

    // Handle trailing slash redirect
    const redirectPath = shouldRedirect(url.pathname);
    if (redirectPath) {
      return createRedirectResponse(redirectPath, false);
    }

    if (pathname === "/readyz") {
      // Deep health check - verify environment is valid
      const response = createJSONResponse(
        {
          status: "ready",
          service: "admin",
          env: {
            hasAccessCredentials: !!adminEnv.CF_ACCESS_CLIENT_ID,
          },
        },
        200,
        correlationId
      );
      return response;
    }

    // API routes
    if (pathname.startsWith("/api/v1/")) {
      return handleAPIRoute(request, pathname, adminEnv, logger);
    }

    // 404 Not Found
    logger.warn("Route not found", { pathname, method: request.method });
    return createErrorResponse("NOT_FOUND", `Route ${pathname} not found`, correlationId, 404);
  },
};

async function handleAPIRoute(
  request: Request,
  pathname: string,
  env: AdminEnv,
  logger: ReturnType<typeof createLoggerFromRequest>
): Promise<Response> {
  const correlationId = logger.correlationId;

  // API v1 ping endpoint
  if (pathname === "/api/v1/ping") {
    if (!isMethodAllowed(request, ["GET", "OPTIONS"])) {
      return createMethodNotAllowedResponse(request, ["GET", "OPTIONS"], correlationId);
    }
    return createJSONResponse({ pong: true, timestamp: Date.now() }, 200, correlationId);
  }

  // Add more API routes here
  logger.warn("API route not found", { pathname });
  return createErrorResponse("NOT_FOUND", `API route ${pathname} not found`, correlationId, 404);
}
