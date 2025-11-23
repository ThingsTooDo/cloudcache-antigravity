import { useEffect } from "react";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { Banner, Layout, Page } from "@shopify/polaris";

interface ShopifyAppBridgeProps {
    children: React.ReactNode;
    apiKey: string;
    host: string;
}

export function ShopifyAppBridge({ children, apiKey, host }: ShopifyAppBridgeProps) {
    const config = {
        apiKey,
        host,
        forceRedirect: true,
    };

    return (
        <AppBridgeProvider config={config}>
            {children}
        </AppBridgeProvider>
    );
}

export function AppBridgeError() {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Banner
                        title="App Bridge Error"
                        tone="critical"
                    >
                        This app must be loaded within the Shopify admin.
                    </Banner>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
