import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { Page, Layout, Card, DataTable, Text } from "@shopify/polaris";
import { ShopifyAppBridge } from "../components/AppBridgeProvider";
import { authenticate } from "../shopify.server";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const env = context.env as any;
  const { admin } = await authenticate(env).admin(request);

  // Fetch products from Shopify Admin API
  const response = await admin.graphql(
    `#graphql
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              status
              totalInventory
            }
          }
        }
      }`
  );

  const data = await response.json();
  const products = data.data?.products?.edges?.map((edge: any) => edge.node) || [];

  return { products };
};

export default function Products() {
  const { products } = useLoaderData<typeof loader>();
  const { host, apiKey } = useOutletContext<{ host: string; apiKey: string }>();

  const rows = products.map((product: any) => [
    product.title,
    product.handle,
    product.status,
    product.totalInventory?.toString() || "0",
  ]);

  const content = (
    <Page title="Products" backAction={{ url: "/" }}>
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">
              Product List
            </Text>
            <DataTable
              columnContentTypes={["text", "text", "text", "numeric"]}
              headings={["Title", "Handle", "Status", "Inventory"]}
              rows={rows}
            />
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
