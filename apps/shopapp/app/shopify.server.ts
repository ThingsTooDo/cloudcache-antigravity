import { shopifyApp, AppDistribution, ApiVersion } from "@shopify/shopify-app-remix/server";
import { createKVSessionStorage, type Env } from "./session.server";

// Note: For Cloudflare Workers, we need to initialize the Shopify app
// with the KV namespace from the request context. This is a factory function
// that creates the Shopify app instance with the proper session storage.

let shopifyInstance: ReturnType<typeof shopifyApp> | null = null;

export function getShopify(env: Env) {
  // Create a singleton instance per request context
  if (!shopifyInstance) {
    shopifyInstance = shopifyApp({
      apiKey: env.SHOPIFY_API_KEY || "SHOPIFY_API_KEY",
      apiSecretKey: env.SHOPIFY_API_SECRET || "SHOPIFY_API_SECRET",
      apiVersion: ApiVersion.October24,
      scopes: (env.SCOPES?.split(",") as any) || ["read_products"],
      appUrl: env.SHOPIFY_APP_URL || "https://shopapp.cloudcache.ai",
      authPathPrefix: "/auth",
      sessionStorage: createKVSessionStorage(env.APP_KV),
      distribution: AppDistribution.AppStore,
      future: {
        unstable_newEmbeddedAuthStrategy: true,
      },
    });
  }
  return shopifyInstance;
}

// Export helper functions that use the context-aware instance
export function authenticate(env: Env) {
  return getShopify(env).authenticate;
}

export function unauthenticated(env: Env) {
  return getShopify(env).unauthenticated;
}

export function login(env: Env) {
  return getShopify(env).login;
}

export function registerWebhooks(env: Env) {
  return getShopify(env).registerWebhooks;
}
