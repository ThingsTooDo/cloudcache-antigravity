import { getEnv, AppEnvSchema } from "@cloudcache/platform-env";
import { createLoggerFromRequest, getCorrelationId } from "@cloudcache/platform-logging";
import { createErrorResponse, handleCORS, canonicalizePath, shouldRedirect, createRedirectResponse, isMethodAllowed, createMethodNotAllowedResponse, addSecurityHeaders, createJSONResponse, } from "@cloudcache/platform-http";
import { renderPage } from "./templates/splash";
import { ToggleManager } from "./lib/toggle-manager";
import { getCustomerContext } from "./lib/customer-context";
import { CustomerZoneManager } from "./lib/customer-zones";
import scheduled from "./scheduled";
const FAVICON_BASE64 = "AAABAAIAEBAAAAEAIADGAQAAJgAAACAgAAABACAAiwMAAOwBAACJUE5HDQoaCgAAAA1JSERSAAAAEAAAABAIBgAAAB/z/2EAAAABc1JHQgCuzhzpAAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAQoAMABAAAAAEAAAAQAAAAADRVcfIAAAEwSURBVDgR7ZC/L0NRFMc/9762GIjGYhGmjn62EjFa+AvEIhKdJN1IRCLpIGIhsXXqJlY2C4MBbWKukJA0BqQWVNVr33GfvtfQ0L+gd7jfc8/9/jg50DqqcQWyOd5DOHBE0RlmJHhLp97CNqyiXuVd+ilYeyp+vOjrtF/UscKcEUe5qwbI2RGUpHFIg0QQ2sCZl92paZ8f8AsXZTm6gdIrvDi1dq4KuRL0WTDaDsoMLBiN7BtC2CX9nkB0wnyGeJWagXubTMZC3tv0XRMoe40GAyiZBBgKwqQnmjDY8TPHEDTJ/wySXgLcVw7oUpcMWI/Pn91Pa5n42/XhFYVMNq8SJ6k/DdR2NqXWL5RaOFNmiTc82DMqdto7e74zaIv+HrvyUc774qYoS7FYU0Lrs76BL/LgWyHfgEGBAAAAAElFTSuQmCCiVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAC9UlEQVRYCe1UTUhUURT+7hsdhzQhoUXUmEaLsEKNJswgLSgQghZhGzcp9EtQllCLIMJVEmVBPwTtrI1RtIigoCbaFCS0KAqslAyiJEsdf0Zn3u07d94bx9c8kXDXHOa+c8695+c7331vgJzkGMgx8L8zoOZLgL5Z0wRbncZvew3WB+MI4gtC6jGKrE5VHe2XOvr51nIkrGOYtHZiWpdiGnGMI4rJxFF18MW3bL3mBUBfYPNiqwsjNtCXBFYHgHV5QAHTF1tTsHCcjcCGnUiooLETPJvWwAR1Qt1TLU/3ZAPAKvMQjRPQLDZKACIfCUIyK/PFC0LjmhhQmfMw3vW1rjfnWR5Wlr2/txQqTLERFnXlA0G8TdDjntlmcwEpkm5sHHmU6BvbB/TFbXXiZIovA3pffQjh8aukuZEJIcQ5/VRmKu13BCDLlTCvJlIwAyiFjKfCjF5BYOdp1Ljhon0BoDh2BirQkg4eS1vZDfbFhmBqesMA2RBtSEnba73Jc1yB1WiS3SIx5/69FVx/ExGEnHLmKpzmMryI7Cnw3mbLHAB0WSrUjADEHD07P+WVk/pSLlcM49542VRRN8TV/legMEHEwqn5oYKhQdry6eVxReOpGiGqLQxz40xfyXEB0Daik0jqdsdJK38GNNFKDaEuXVSK0RnKYLKWzUNOkxTN6eIpwxQhINWm2p71eA7neAmh2jnULq6ADDfrExtIvOFOFcKWxirS4Xx20v/Jp0o79v77RO3g3UJJswqCWBRefrvobG+nt7n4vgyoK696OGyboVaGcF9Grc5hyF5CRINYae2gfsA1TIDD9380vL48dtK6VdpR+LJkt+lnx6cw2vu5zjhZHg53WU58tvShqjIE8vtg23vV9Z7uzLCGS/1NSvEvm7K/rxWbh4iNorX+uqwrGTaO5+HLgCduxrWsejrd3uYS8Ki17E7k18OO5v5TP2sympPJA3K+IKIPb+zQzdVLF6TYvxTRRyKRf8nL5eQYyDGQY8CPgT8p4ed9RS416QAAAABJRU5ErkJggg==";
export default {
    scheduled: scheduled.scheduled,
    async fetch(request, env) {
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
            return createJSONResponse({ status: "ok", service: "app", version: __VERSION__ }, 200, correlationId);
        }
        // From here on, routes require environment validation
        let appEnv;
        try {
            appEnv = getEnv(AppEnvSchema, env);
        }
        catch (error) {
            return createErrorResponse("ENV_VALIDATION_ERROR", error instanceof Error ? error.message : "Environment validation failed", correlationId, 500);
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
                        await toggleManager.syncFromCloudflare(customerId, "rocket-loader", zoneId, appEnv.CF_API_TOKEN);
                        rocketLoaderEnabled = await toggleManager.getState(customerId, "rocket-loader");
                        // Also ensure zone mapping exists
                        const zoneManager = new CustomerZoneManager(db);
                        await zoneManager.setZoneId(customerId, zoneId);
                    }
                    catch (e) {
                        logger.error("Failed to initial sync Rocket Loader", { error: e });
                    }
                }
            }
            // Default to false if still null
            if (rocketLoaderEnabled === null)
                rocketLoaderEnabled = false;
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
            return createJSONResponse({
                status: "ready",
                service: "app",
                env: {
                    hasShopifyKey: !!appEnv.SHOPIFY_API_KEY,
                    hasAccessCredentials: !!appEnv.CF_ACCESS_CLIENT_ID,
                },
            }, 200, correlationId);
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
async function handleAPIRoute(request, pathname, env, logger) {
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
        const missingCreds = [];
        if (!env.CF_API_TOKEN)
            missingCreds.push("CF_API_TOKEN");
        if (!env.CF_ACCOUNT_ID)
            missingCreds.push("CF_ACCOUNT_ID");
        if (!env.CF_ZONE_ID)
            missingCreds.push("CF_ZONE_ID");
        if (missingCreds.length > 0) {
            logger.warn("Cloudflare API credentials not configured", {
                missing: missingCreds,
            });
            return createErrorResponse("CONFIGURATION_ERROR", `Missing required Cloudflare API credentials: ${missingCreds.join(", ")}. Please configure these secrets in your Cloudflare Workers environment.`, correlationId, 500);
        }
        try {
            // Validate request body
            let body;
            try {
                body = await request.json();
            }
            catch (parseError) {
                logger.warn("Invalid JSON in request body", { error: parseError });
                return createErrorResponse("INVALID_REQUEST", "Invalid JSON in request body", correlationId, 400);
            }
            if (typeof body.enabled !== "boolean") {
                return createErrorResponse("INVALID_REQUEST", "Request body must include 'enabled' as a boolean", correlationId, 400);
            }
            const enabled = body.enabled;
            const db = env.APP_D1;
            const toggleManager = new ToggleManager(db, env);
            const customerContext = await getCustomerContext(request, env);
            const customerId = customerContext?.customerId || "default";
            // Get Zone ID
            const zoneManager = new CustomerZoneManager(db);
            let zoneId = await zoneManager.getZoneId(customerId);
            if (!zoneId) {
                // Fallback to global env
                zoneId = env.CF_ZONE_ID;
                if (zoneId) {
                    // Save for future
                    await zoneManager.setZoneId(customerId, zoneId);
                }
            }
            if (!zoneId) {
                return createErrorResponse("CONFIGURATION_ERROR", "No Zone ID found for customer", correlationId, 500);
            }
            // Use ToggleManager to set state
            await toggleManager.setState(customerId, "rocket-loader", enabled, zoneId, env.CF_API_TOKEN);
            logger.info("Rocket Loader toggled successfully", { enabled });
            return createJSONResponse({
                success: true,
                optimization: "rocket-loader",
                enabled,
                timestamp: Date.now(),
            }, 200, correlationId);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            logger.error("Error toggling Rocket Loader", {
                error: errorMessage,
                stack: error instanceof Error ? error.stack : undefined,
            });
            return createErrorResponse("INTERNAL_ERROR", `Failed to toggle Rocket Loader: ${errorMessage}`, correlationId, 500);
        }
    }
    // Add more API routes here
    logger.warn("API route not found", { pathname });
    return createErrorResponse("NOT_FOUND", `API route ${pathname} not found`, correlationId, 404);
}
async function handleAuthRoute(request, pathname, env, logger) {
    const correlationId = logger.correlationId;
    // OAuth routes will be implemented here
    logger.info("Auth route accessed", { pathname });
    return createErrorResponse("NOT_IMPLEMENTED", `Auth route ${pathname} not yet implemented`, correlationId, 501);
}
async function handleWebhookRoute(request, pathname, env, logger) {
    const correlationId = logger.correlationId;
    // Webhook routes will be implemented here
    logger.info("Webhook route accessed", { pathname });
    return createErrorResponse("NOT_IMPLEMENTED", `Webhook route ${pathname} not yet implemented`, correlationId, 501);
}
