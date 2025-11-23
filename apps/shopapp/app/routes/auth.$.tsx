import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticate } from "../shopify.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = context.env as any;
  await authenticate(env).admin(request);

  return null;
};
