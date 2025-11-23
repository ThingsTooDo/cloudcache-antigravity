import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(request, env, ctx) {
    try {
      // Serve static assets from the site bucket (./dist)
      return await getAssetFromKV(request);
    } catch (e) {
      // Fallback 404 for missing assets
      return new Response("Not found", { status: 404 });
    }
  },
};
