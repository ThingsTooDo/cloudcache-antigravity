import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./build/server/index.js";

const handleRequest = createRequestHandler(build, "production");

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/healthz") {
      return new Response(JSON.stringify({ status: "ok", service: "shopify-worker" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    try {
      return await handleRequest(request, env, ctx);
    } catch (e) {
      return new Response("Worker Error: " + e.message + "\n" + e.stack, { status: 500 });
    }
  },
};
