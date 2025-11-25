import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import AppBridgeReact from "@shopify/app-bridge-react";

const { Provider } = AppBridgeReact;
import { Banner, Layout, Page } from "@shopify/polaris";

interface ShopifyAppBridgeProps {
  children: React.ReactNode;
  apiKey: string;
  host: string;
}

export function ShopifyAppBridge({ children, apiKey, host }: ShopifyAppBridgeProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const appBridgeConfig = {
    apiKey,
    host,
    forceRedirect: true,
  };

  const routerConfig = useMemo(
    () => ({
      location,
      history: { replace: (path: string) => navigate(path, { replace: true }) },
    }),
    [location, navigate],
  );

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {children}
    </Provider>
  );
}

export function AppBridgeError() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Banner title="App Bridge Error" tone="critical">
            This app must be loaded within the Shopify admin.
          </Banner>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
