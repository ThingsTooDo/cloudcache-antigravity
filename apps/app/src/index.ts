import { getEnv, AppEnvSchema, type AppEnv } from "@cloudcache/platform-env";
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
import { renderPage } from "./templates/splash";
import { ToggleManager } from "./lib/toggle-manager";
import { getCustomerContext } from "./lib/customer-context";
import { CustomerZoneManager } from "./lib/customer-zones";
import scheduled from "./scheduled";

declare const __VERSION__: string;

const FAVICON_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABWlJREFUWEftl1tsFGUUx//nm53Z3XZbCpSr3AqkFSRUaEuCIAEUAz5ohFIh3lChghciEaokICiIgfjggyjBcFFCqLWlEoxQKLYqVUICFSEqhXIrFC2Udm27l9md75jZQrvLDmVbHnxxnnZnz+V3zvmf78sSuvhwYdYDAL8M6XqXcsqbuxgG1BVHLsqYAkYRADukHEI5lde6Esf06TQA7856BlJuCSUHPqLsY8u6mrxTAGzCfp25HMRrW8GpCdIYdi/VxwzAZZNtqG/eCHBuW7WEtTTr2Mp7qT4mAN4xOg1x2sdgng6HBvh0wDDA56sqiVCMxAFbaVHVla6C3FEDXDDSJf+q2yCS+y6AZrdFJGi+Dr5ysfWVEF6yuTYgcc4H9MrmQGdBLAH485Q+rLv3U88BD8KmRsY0guCaU4A02qfh0MCGKKGeqbPo+d9aOgMRBcDbJjs4ePpH6tYnC0KJisWNl0F6A9gcxW0Pqc7deN2TTUQcK0Q0wFfp6yGUPJBFc1QCXzoOsIysPgyGHEkvUm7j9k4D8OrVAqO+XQeH+nZIaBYPN9UA3rqOYyvqRRr4aBo9vs8fC0SoTC4Y70QctsOn59zRiRnsMcXeXr2lbbAZZKOtSBrzJj1Z0cTfjBqI5qupEGoQjkGnaObR+nA/4oIxvSCUYoAnxEJ8VxvFDW48C5DiAdkawHp/MLfOk0QANvsecvZdSrPOh9aIuDDjDIDhUYFv7bxVxjv9ZjSC9fMddonMjdGNa+TsO41mXjlhArQr1ipwRyDhcFojuOWcOdC7NilkoKhnCJnpkQCxud5mxWBcBvgu4jTbbVYfvjH2bvOJizOGtUUUF5aybF7Y9p3jQHIo2o7g8NShzvjAyjmA3G3Bw5MYPicMbxwUtB5awuEDOX3tK6zYiyKWnQ/0n8B67eFbFiRGAh6ndV8oAGhnweSx/L3F3RsrvtsLT9CF5Ynr0UfUAYJhn3AEIsndqknF8UskgKnWUmcFDN94GPGA937r5MILOE2lW58XptPli2OQd6g45P+GayPS1ZOhz1rGSdgG3by7yL4v+iQ83C8Tvr8r0DxcQzAhGkD9B4gz295+F1hSSoGKyrnwBPrjYfk9CAxyeaBlXAACN8egxL9jfRmVDF2Fpu6ro1fzOpBwKXaldyRqUhrgSkmzBijM/AHgSRH+CbWA6+qdQ95a15jWloKgHjn0UH1x9AiKMx6DgZKwTH4k1xhw1sWF3sWUIMz7dnunqxr+uEWUVXcwJMTwkphBKMw4Aqc2rvVCohsgegqjxa/wVk2ENNIgrYQRwwFC5rrYT8DILqfMzYFnnz6XDlXURQIUZT4B5j1BacPx2sygy+mZuObAKj2/aEglL5ntbPI2TffrWuni4MYU1v0NREJXmEYENc2d/+V9lXNnV0+ETVzftSvlT33ZzLHqhqLKOXNqhgopByd0H/yT212dpsKmGYI9xMoMhXGwDaD1Ot57HA4tvez3Sb4tx17NY+ZTIJ63M3/IvJaFM5YQCz8E98tt2JRMwM8Go4GIXzIPfxUiLwBeAYjSnSOeK/JcdfyhCiX7hfpP3iLi/ZJkmZBqIYNvCIEdkrGECbntAAVjp0LQIRDtfa9s3fun61JzwchHvGMcvF58lvRaqSp4gWTelXvj094gMS0osU4TtFhC6kHZslIViR8So3Zzz0XlYDlWEHvn12/qxoJSmdQ1wvBnAyKRhDzKTLNZUb5oB9g22YFe+iOI10poSnnQaqpNC2dMlQq12AzWYSMloBtSUxUVhsEQNEAatmqF0N0QshFsJLMUtQQapCjkD0pJwqE0kt/QWHIPReEqw2FP6PQ/oxjk1imT/wH+8w78C6AoQ9jJ3s9uAAAAAElFTkSuQmCC";

export default {
  scheduled: scheduled.scheduled,
  async fetch(request: Request, env: unknown): Promise<Response> {
    const correlationId = getCorrelationId(request);
    const url = new URL(request.url);
    const pathname = canonicalizePath(url.pathname);

    // Handle simple routes that don't require environment validation
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

    if (pathname === "/healthz") {
      return createJSONResponse(
        { status: "ok", service: "app", version: __VERSION__ },
        200,
        correlationId
      );
    }

    // From here on, routes require environment validation
    let appEnv: AppEnv;
    try {
      appEnv = getEnv(AppEnvSchema, env);
    } catch (error) {
      return createErrorResponse(
        "ENV_VALIDATION_ERROR",
        error instanceof Error ? error.message : "Environment validation failed",
        correlationId,
        500
      );
    }

    const logger = createLoggerFromRequest(request);

    // Handle root route with new page template
    if (pathname === "/") {
      const db = appEnv.APP_D1;
      const toggleManager = new ToggleManager(db, appEnv);
      const customerContext = await getCustomerContext(request, appEnv);

      // Default to global env if no customer context (legacy/single-tenant fallback)
      const customerId = customerContext?.customerId || "default";

      // Try to get state from D1
      let rocketLoaderEnabled = await toggleManager.getState(customerId, "rocket-loader");

      // If null (not in D1), try to sync if we have credentials
      if (rocketLoaderEnabled === null) {
        const zoneId = appEnv.CF_ZONE_ID; // Fallback to global zone ID
        if (zoneId && appEnv.CF_API_TOKEN) {
          try {
            await toggleManager.syncFromCloudflare(
              customerId,
              "rocket-loader",
              zoneId,
              appEnv.CF_API_TOKEN
            );
            rocketLoaderEnabled = await toggleManager.getState(customerId, "rocket-loader");

            // Also ensure zone mapping exists
            const zoneManager = new CustomerZoneManager(db);
            await zoneManager.setZoneId(customerId, zoneId);
          } catch (e) {
            logger.error("Failed to initial sync Rocket Loader", { error: e });
          }
        }
      }

      // Default to false if still null
      if (rocketLoaderEnabled === null) rocketLoaderEnabled = false;

      const html = renderPage({
        faviconBase64: FAVICON_BASE64,
        dashboardTitle: "Cloudcache Dashboard",
        storeName: "Your Store",
        planName: "Free Plan",
        optimizations: [
          {
            id: "rocket-loader",
            title: "Rocket Loader™",
            description: "Improve paint times for pages that include JavaScript.",
            enabled: rocketLoaderEnabled,
          },
        ],
        footer: {
          copyright: `© ${new Date().getFullYear()} Cloudcache. All rights reserved.`,
        },
      });

      const response = new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
      return addSecurityHeaders(response, correlationId);
    }

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
      // Deep health check
      return createJSONResponse(
        {
          status: "ready",
          service: "app",
          env: {
            hasShopifyKey: !!appEnv.SHOPIFY_API_KEY,
            hasAccessCredentials: !!appEnv.CF_ACCESS_CLIENT_ID,
          },
        },
        200,
        correlationId
      );
    }

    // API routes
    if (pathname.startsWith("/api/v1/")) {
      return handleAPIRoute(request, pathname, appEnv, logger);
    }

    // Auth routes
    if (pathname.startsWith("/auth/")) {
      return handleAuthRoute(request, pathname, appEnv, logger);
    }

    // Webhook routes
    if (pathname.startsWith("/webhooks/")) {
      return handleWebhookRoute(request, pathname, appEnv, logger);
    }

    // 404 Not Found
    logger.warn("Route not found", { pathname, method: request.method });
    return createErrorResponse("NOT_FOUND", `Route ${pathname} not found`, correlationId, 404);
  },
};

async function handleAPIRoute(
  request: Request,
  pathname: string,
  env: AppEnv,
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

  // API v1 optimizations endpoints
  if (pathname === "/api/v1/optimizations/rocket-loader") {
    if (!isMethodAllowed(request, ["POST", "OPTIONS"])) {
      return createMethodNotAllowedResponse(request, ["POST", "OPTIONS"], correlationId);
    }

    // Check if Cloudflare API credentials are available
    const missingCreds: string[] = [];
    if (!env.CF_API_TOKEN) missingCreds.push("CF_API_TOKEN");
    if (!env.CF_ACCOUNT_ID) missingCreds.push("CF_ACCOUNT_ID");
    if (!env.CF_ZONE_ID) missingCreds.push("CF_ZONE_ID");

    if (missingCreds.length > 0) {
      logger.warn("Cloudflare API credentials not configured", {
        missing: missingCreds,
      });
      return createErrorResponse(
        "CONFIGURATION_ERROR",
        `Missing required Cloudflare API credentials: ${missingCreds.join(", ")}. Please configure these secrets in your Cloudflare Workers environment.`,
        correlationId,
        500
      );
    }

    try {
      // Validate request body
      let body: { enabled?: boolean };
      try {
        body = await request.json();
      } catch (parseError) {
        logger.warn("Invalid JSON in request body", { error: parseError });
        return createErrorResponse(
          "INVALID_REQUEST",
          "Invalid JSON in request body",
          correlationId,
          400
        );
      }

      if (typeof body.enabled !== "boolean") {
        return createErrorResponse(
          "INVALID_REQUEST",
          "Request body must include 'enabled' as a boolean",
          correlationId,
          400
        );
      }

      const enabled = body.enabled;
      const db = env.APP_D1;
      const toggleManager = new ToggleManager(db, env);
      const customerContext = await getCustomerContext(request, env);
      const customerId = customerContext?.customerId || "default";

      // Get Zone ID
      const zoneManager = new CustomerZoneManager(db);
      let zoneId: string | null | undefined = await zoneManager.getZoneId(customerId);

      if (!zoneId) {
        // Fallback to global env
        zoneId = env.CF_ZONE_ID;
        if (zoneId) {
          // Save for future
          await zoneManager.setZoneId(customerId, zoneId);
        }
      }

      if (!zoneId) {
        return createErrorResponse(
          "CONFIGURATION_ERROR",
          "No Zone ID found for customer",
          correlationId,
          500
        );
      }

      // Use ToggleManager to set state
      await toggleManager.setState(customerId, "rocket-loader", enabled, zoneId, env.CF_API_TOKEN!);

      logger.info("Rocket Loader toggled successfully", { enabled });

      return createJSONResponse(
        {
          success: true,
          optimization: "rocket-loader",
          enabled,
          timestamp: Date.now(),
        },
        200,
        correlationId
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error("Error toggling Rocket Loader", {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
      });
      return createErrorResponse(
        "INTERNAL_ERROR",
        `Failed to toggle Rocket Loader: ${errorMessage}`,
        correlationId,
        500
      );
    }
  }

  // Add more API routes here
  logger.warn("API route not found", { pathname });
  return createErrorResponse("NOT_FOUND", `API route ${pathname} not found`, correlationId, 404);
}

async function handleAuthRoute(
  request: Request,
  pathname: string,
  env: AppEnv,
  logger: ReturnType<typeof createLoggerFromRequest>
): Promise<Response> {
  const correlationId = logger.correlationId;

  // OAuth routes will be implemented here
  logger.info("Auth route accessed", { pathname });
  return createErrorResponse(
    "NOT_IMPLEMENTED",
    `Auth route ${pathname} not yet implemented`,
    correlationId,
    501
  );
}

async function handleWebhookRoute(
  request: Request,
  pathname: string,
  env: AppEnv,
  logger: ReturnType<typeof createLoggerFromRequest>
): Promise<Response> {
  const correlationId = logger.correlationId;

  // Webhook routes will be implemented here
  logger.info("Webhook route accessed", { pathname });
  return createErrorResponse(
    "NOT_IMPLEMENTED",
    `Webhook route ${pathname} not yet implemented`,
    correlationId,
    501
  );
}
