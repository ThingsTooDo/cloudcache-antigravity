import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { authenticate } from "../shopify.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const env = context.env as any;
  const { topic, shop, session, admin } = await authenticate(env).webhook(request);

  // Route to specific webhook handlers
  switch (topic) {
    case "APP_UNINSTALLED":
      // Clean up sessions for this shop
      if (session) {
        await env.APP_KV.delete(`session:${session.id}`);
      }
      console.log(`App uninstalled from shop: ${shop}`);
      break;

    case "SHOP_UPDATE":
      // Update shop metadata
      console.log(`Shop updated: ${shop}`);
      break;

    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }

  return new Response(null, { status: 200 });
};
