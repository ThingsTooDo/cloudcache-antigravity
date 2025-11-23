import { z } from "zod";
/**
 * OAuth callback query parameters schema
 */
export const OAuthCallbackSchema = z.object({
    code: z.string().min(1, "Authorization code is required"),
    state: z.string().min(1, "State parameter is required"),
    shop: z.string().optional(),
    hmac: z.string().optional(),
    timestamp: z.string().optional(),
});
/**
 * Validate OAuth callback parameters
 */
export function validateOAuthCallback(params) {
    try {
        return OAuthCallbackSchema.parse(params);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const details = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
            throw new Error(`OAuth callback validation failed: ${details}`);
        }
        throw error;
    }
}
/**
 * Shopify webhook payload schema (basic structure)
 */
export const ShopifyWebhookSchema = z.object({
    id: z.number().optional(),
    shop: z.string().optional(),
    topic: z.string().optional(),
    data: z.unknown().optional(),
});
/**
 * Validate Shopify webhook payload
 */
export function validateWebhookPayload(payload) {
    try {
        return ShopifyWebhookSchema.parse(payload);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const details = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
            throw new Error(`Webhook payload validation failed: ${details}`);
        }
        throw error;
    }
}
/**
 * Generic validation helper with typed errors
 */
export function validate(schema, data) {
    try {
        return schema.parse(data);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const details = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
            throw new Error(`Validation failed: ${details}`);
        }
        throw error;
    }
}
