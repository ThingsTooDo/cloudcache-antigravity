export interface Env {
  APP_KV: KVNamespace;
  SHOPIFY_API_KEY?: string;
  SHOPIFY_API_SECRET?: string;
  SHOPIFY_APP_URL?: string;
  SCOPES?: string;
}

/**
 * Creates a Cloudflare KV-based session storage for Shopify App Remix.
 * Sessions are stored with a TTL of 30 days.
 */
export function createKVSessionStorage(kv: KVNamespace) {
  return {
    async loadSession(id: string) {
      const data = await kv.get(`session:${id}`, "json");
      return data || undefined;
    },

    async storeSession(session: any) {
      const id = session.id;
      // Store with 30-day TTL (Shopify sessions typically expire in 24 hours, but we add buffer)
      await kv.put(`session:${id}`, JSON.stringify(session), {
        expirationTtl: 60 * 60 * 24 * 30, // 30 days in seconds
      });
      return true;
    },

    async deleteSession(id: string) {
      await kv.delete(`session:${id}`);
      return true;
    },

    async deleteSessions(ids: string[]) {
      await Promise.all(ids.map((id) => kv.delete(`session:${id}`)));
      return true;
    },

    async findSessionsByShop(shop: string) {
      // KV doesn't support querying by value, so we maintain a shop index
      const shopIndexKey = `shop:${shop}:sessions`;
      const sessionIds = await kv.get(shopIndexKey, "json");
      if (!sessionIds || !Array.isArray(sessionIds)) {
        return [];
      }

      const sessions = await Promise.all(
        sessionIds.map(async (id: string) => {
          const session = await kv.get(`session:${id}`, "json");
          return session;
        })
      );

      return sessions.filter(Boolean);
    },
  };
}
