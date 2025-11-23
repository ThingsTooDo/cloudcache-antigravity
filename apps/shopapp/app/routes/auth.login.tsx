import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { login } from "../shopify.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = context.env as any;
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    throw new Response("Missing shop parameter", { status: 400 });
  }

  return await login(env)(request);
};
