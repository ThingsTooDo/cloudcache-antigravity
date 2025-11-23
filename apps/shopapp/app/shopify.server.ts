import "@shopify/shopify-app-remix/adapters/web-api";
import { shopifyApp, LATEST_API_VERSION, AppDistribution } from "@shopify/shopify-app-remix/server";

// Note: In a real app, you would load these from environment variables
// For Cloudflare, these come from the context, so we might need to initialize this
// inside the loader/action or use a singleton pattern with context injection.
// For now, this is a basic setup.

export const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY || "SHOPIFY_API_KEY",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "SHOPIFY_API_SECRET",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(",") || ["read_products"],
  appUrl: process.env.SHOPIFY_APP_URL || "https://shopapp.cloudcache.ai",
  authPathPrefix: "/auth",
  sessionStorage: undefined, // You'll need a session storage strategy (e.g., KV or D1)
  distribution: AppDistribution.AppStore,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
});

export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
