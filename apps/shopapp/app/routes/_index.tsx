import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { Page, Layout, Card, Text, BlockStack, InlineStack, Button } from "@shopify/polaris";
import { ShopifyAppBridge } from "../components/AppBridgeProvider";
import { authenticate } from "../shopify.server";

export const meta: MetaFunction = () => {
  return [
    { title: "CloudCache ShopApp" },
    { name: "description", content: "Shopify app powered by CloudCache" },
  ];
};

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = context.env as any;

  try {
    const { session } = await authenticate(env).admin(request);
    return { shop: session?.shop || "Unknown", authenticated: true };
  } catch (error) {
    return { shop: "Unknown", authenticated: false };
  }
};

export default function Index() {
  const { shop, authenticated } = useLoaderData<typeof loader>();
  const { host, apiKey } = useOutletContext<{ host: string; apiKey: string }>();

  const content = (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Welcome to CloudCache ShopApp
              </Text>
              <Text as="p" variant="bodyMd">
                {authenticated ? `Connected to shop: ${shop}` : "Not authenticated"}
              </Text>
              <InlineStack gap="300">
                <Button url="/app/products">Manage Products</Button>
                <Button url="/app/settings">Settings</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  if (host && apiKey) {
    return (
      <ShopifyAppBridge apiKey={apiKey} host={host}>
        {content}
      </ShopifyAppBridge>
    );
  }

  return content;
}
