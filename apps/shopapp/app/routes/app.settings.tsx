import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import { Page, Layout, Card, FormLayout, TextField, Button, BlockStack } from "@shopify/polaris";
import { ShopifyAppBridge } from "../components/AppBridgeProvider";
import { authenticate } from "../shopify.server";
import { useState } from "react";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
    const env = context.env as any;
    const { session } = await authenticate(env).admin(request);

    return { shop: session?.shop || "Unknown" };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const env = context.env as any;
    await authenticate(env).admin(request);

    const formData = await request.formData();
    const setting = formData.get("setting");

    // Save settings to KV or process as needed
    console.log("Settings updated:", setting);

    return { success: true };
};

export default function Settings() {
    const { shop } = useLoaderData<typeof loader>();
    const { host, apiKey } = useOutletContext<{ host: string; apiKey: string }>();
    const [settingValue, setSettingValue] = useState("");

    const content = (
        <Page
            title="Settings"
            backAction={{ url: "/" }}
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="400">
                            <FormLayout>
                                <TextField
                                    label="App Setting"
                                    value={settingValue}
                                    onChange={setSettingValue}
                                    autoComplete="off"
                                    helpText="Configure your app settings here"
                                />
                                <Form method="post">
                                    <input type="hidden" name="setting" value={settingValue} />
                                    <Button submit>Save Settings</Button>
                                </Form>
                            </FormLayout>
                        </BlockStack>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="200">
                            <p><strong>Shop:</strong> {shop}</p>
                            <p><strong>Status:</strong> Connected</p>
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
