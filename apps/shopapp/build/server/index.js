import { jsx, jsxs } from "react/jsx-runtime";
import {
  RemixServer,
  useLoaderData,
  Meta,
  Links,
  Outlet,
  ScrollRestoration,
  Scripts,
  useOutletContext,
  Form,
} from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToReadableStream } from "react-dom/server";
import {
  Page,
  Layout,
  Card,
  Text,
  DataTable,
  BlockStack,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import { shopifyApp, AppDistribution, ApiVersion } from "@shopify/shopify-app-remix/server";
import { useState } from "react";
async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
  loadContext
) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      // If you wish to abort the rendering process, you can pass a signal here.
      // Please refer to the templates for example son how to configure this.
      // signal: controller.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    }
  );
  if (isBotRequest(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
const entryServer = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: handleRequest,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
async function loader$4({ request }) {
  const url = new URL(request.url);
  const host = url.searchParams.get("host");
  const apiKey = process.env.SHOPIFY_API_KEY || "";
  return { host, apiKey };
}
function App() {
  const { host, apiKey } = useLoaderData();
  return /* @__PURE__ */ jsxs("html", {
    children: [
      /* @__PURE__ */ jsxs("head", {
        children: [
          /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
          /* @__PURE__ */ jsx("meta", {
            name: "viewport",
            content: "width=device-width,initial-scale=1",
          }),
          /* @__PURE__ */ jsx(Meta, {}),
          /* @__PURE__ */ jsx(Links, {}),
        ],
      }),
      /* @__PURE__ */ jsxs("body", {
        children: [
          /* @__PURE__ */ jsx(Outlet, { context: { host, apiKey } }),
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(Scripts, {}),
        ],
      }),
    ],
  });
}
const route0 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: App,
      loader: loader$4,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function ShopifyAppBridge({ children, apiKey, host }) {
  const config = {
    apiKey,
    host,
    forceRedirect: true,
  };
  return /* @__PURE__ */ jsx(Provider, { config, children });
}
function createKVSessionStorage(kv) {
  return {
    async loadSession(id) {
      const data = await kv.get(`session:${id}`, "json");
      return data || void 0;
    },
    async storeSession(session) {
      const id = session.id;
      await kv.put(`session:${id}`, JSON.stringify(session), {
        expirationTtl: 60 * 60 * 24 * 30,
        // 30 days in seconds
      });
      return true;
    },
    async deleteSession(id) {
      await kv.delete(`session:${id}`);
      return true;
    },
    async deleteSessions(ids) {
      await Promise.all(ids.map((id) => kv.delete(`session:${id}`)));
      return true;
    },
    async findSessionsByShop(shop) {
      const shopIndexKey = `shop:${shop}:sessions`;
      const sessionIds = await kv.get(shopIndexKey, "json");
      if (!sessionIds || !Array.isArray(sessionIds)) {
        return [];
      }
      const sessions = await Promise.all(
        sessionIds.map(async (id) => {
          const session = await kv.get(`session:${id}`, "json");
          return session;
        })
      );
      return sessions.filter(Boolean);
    },
  };
}
let shopifyInstance = null;
function getShopify(env) {
  if (!shopifyInstance) {
    shopifyInstance = shopifyApp({
      apiKey: env.SHOPIFY_API_KEY || "SHOPIFY_API_KEY",
      apiSecretKey: env.SHOPIFY_API_SECRET || "SHOPIFY_API_SECRET",
      apiVersion: ApiVersion.October24,
      scopes: env.SCOPES?.split(",") || ["read_products"],
      appUrl: env.SHOPIFY_APP_URL || "https://shopapp.cloudcache.ai",
      authPathPrefix: "/auth",
      sessionStorage: createKVSessionStorage(env.APP_KV),
      distribution: AppDistribution.AppStore,
      future: {
        unstable_newEmbeddedAuthStrategy: true,
      },
    });
  }
  return shopifyInstance;
}
function authenticate(env) {
  return getShopify(env).authenticate;
}
function login(env) {
  return getShopify(env).login;
}
const loader$3 = async ({ request, context }) => {
  const env = context.env;
  const { admin } = await authenticate(env).admin(request);
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
  const products = data.data?.products?.edges?.map((edge) => edge.node) || [];
  return { products };
};
function Products() {
  const { products } = useLoaderData();
  const { host, apiKey } = useOutletContext();
  const rows = products.map((product) => [
    product.title,
    product.handle,
    product.status,
    product.totalInventory?.toString() || "0",
  ]);
  const content = /* @__PURE__ */ jsx(Page, {
    title: "Products",
    backAction: { url: "/" },
    children: /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx(Layout.Section, {
        children: /* @__PURE__ */ jsxs(Card, {
          children: [
            /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Product List" }),
            /* @__PURE__ */ jsx(DataTable, {
              columnContentTypes: ["text", "text", "text", "numeric"],
              headings: ["Title", "Handle", "Status", "Inventory"],
              rows,
            }),
          ],
        }),
      }),
    }),
  });
  if (host && apiKey) {
    return /* @__PURE__ */ jsx(ShopifyAppBridge, { apiKey, host, children: content });
  }
  return content;
}
const route1 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: Products,
      loader: loader$3,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const loader$2 = async ({ request, context }) => {
  const env = context.env;
  const { session } = await authenticate(env).admin(request);
  return { shop: session?.shop || "Unknown" };
};
const action$1 = async ({ request, context }) => {
  const env = context.env;
  await authenticate(env).admin(request);
  const formData = await request.formData();
  const setting = formData.get("setting");
  console.log("Settings updated:", setting);
  return { success: true };
};
function Settings() {
  const { shop } = useLoaderData();
  const { host, apiKey } = useOutletContext();
  const [settingValue, setSettingValue] = useState("");
  const content = /* @__PURE__ */ jsx(Page, {
    title: "Settings",
    backAction: { url: "/" },
    children: /* @__PURE__ */ jsxs(Layout, {
      children: [
        /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsx(BlockStack, {
              gap: "400",
              children: /* @__PURE__ */ jsxs(FormLayout, {
                children: [
                  /* @__PURE__ */ jsx(TextField, {
                    label: "App Setting",
                    value: settingValue,
                    onChange: setSettingValue,
                    autoComplete: "off",
                    helpText: "Configure your app settings here",
                  }),
                  /* @__PURE__ */ jsxs(Form, {
                    method: "post",
                    children: [
                      /* @__PURE__ */ jsx("input", {
                        type: "hidden",
                        name: "setting",
                        value: settingValue,
                      }),
                      /* @__PURE__ */ jsx(Button, { submit: true, children: "Save Settings" }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
        /* @__PURE__ */ jsx(Layout.Section, {
          children: /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs(BlockStack, {
              gap: "200",
              children: [
                /* @__PURE__ */ jsxs("p", {
                  children: [/* @__PURE__ */ jsx("strong", { children: "Shop:" }), " ", shop],
                }),
                /* @__PURE__ */ jsxs("p", {
                  children: [/* @__PURE__ */ jsx("strong", { children: "Status:" }), " Connected"],
                }),
              ],
            }),
          }),
        }),
      ],
    }),
  });
  if (host && apiKey) {
    return /* @__PURE__ */ jsx(ShopifyAppBridge, { apiKey, host, children: content });
  }
  return content;
}
const route2 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      action: action$1,
      default: Settings,
      loader: loader$2,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const loader$1 = async ({ request, context }) => {
  const env = context.env;
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  if (!shop) {
    throw new Response("Missing shop parameter", { status: 400 });
  }
  return await login(env)(request);
};
const route3 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      loader: loader$1,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const action = async ({ request, context }) => {
  const env = context.env;
  const { topic, shop, session, admin } = await authenticate(env).webhook(request);
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await env.APP_KV.delete(`session:${session.id}`);
      }
      console.log(`App uninstalled from shop: ${shop}`);
      break;
    case "SHOP_UPDATE":
      console.log(`Shop updated: ${shop}`);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }
  return new Response(null, { status: 200 });
};
const route4 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      action,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const meta = () => {
  return [{ title: "This is Cloudcache Shopapp Preview" }];
};
function Index() {
  return /* @__PURE__ */ jsxs("html", {
    children: [
      /* @__PURE__ */ jsx("head", {
        children: /* @__PURE__ */ jsx("style", {
          children: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; }
          .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            background-color: white;
          }
          .header {
            display: flex;
            align-items: center;
            justifyContent: center;
            fontSize: 20px;
            color: black;
            padding: 20px;
            border-bottom: 1px solid #ccc;
          }
          .main {
            display: flex;
            flex: 1;
            overflow: hidden;
          }
          .sidebar {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: black;
            padding: 20px;
            border-right: 1px solid #ccc;
          }
          .content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .title {
            font-size: 30px;
          }
          .title-red {
            color: red;
          }
          .title-black {
            color: black;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: black;
            padding: 20px;
            border-top: 1px solid #ccc;
          }
        `,
        }),
      }),
      /* @__PURE__ */ jsx("body", {
        children: /* @__PURE__ */ jsxs("div", {
          className: "container",
          children: [
            /* @__PURE__ */ jsx("div", { className: "header", children: "Header" }),
            /* @__PURE__ */ jsxs("div", {
              className: "main",
              children: [
                /* @__PURE__ */ jsx("div", { className: "sidebar", children: "Left sidebar" }),
                /* @__PURE__ */ jsx("div", {
                  className: "content",
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "title",
                    children: [
                      /* @__PURE__ */ jsx("span", {
                        className: "title-red",
                        children: "This is Cloudcache Shopapp ",
                      }),
                      /* @__PURE__ */ jsx("span", {
                        className: "title-black",
                        children: "Preview",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", { className: "footer", children: "Footer" }),
          ],
        }),
      }),
    ],
  });
}
const route5 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      default: Index,
      meta,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const loader = async ({ request, context }) => {
  const env = context.env;
  await authenticate(env).admin(request);
  return null;
};
const route6 = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      loader,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
const serverManifest = {
  entry: {
    module: "/assets/entry.client-4ktp4pRO.js",
    imports: ["/assets/jsx-runtime-BgjmLhhW.js", "/assets/components-DT2cD7Eo.js"],
    css: [],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: true,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/root-BkSR22qB.js",
      imports: ["/assets/jsx-runtime-BgjmLhhW.js", "/assets/components-DT2cD7Eo.js"],
      css: ["/assets/root-Cst8-6Q9.css"],
    },
    "routes/app.products": {
      id: "routes/app.products",
      parentId: "root",
      path: "app/products",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: true,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/app.products-ehDF4UHL.js",
      imports: [
        "/assets/jsx-runtime-BgjmLhhW.js",
        "/assets/AppBridgeProvider-D5vJUI4H.js",
        "/assets/components-DT2cD7Eo.js",
      ],
      css: [],
    },
    "routes/app.settings": {
      id: "routes/app.settings",
      parentId: "root",
      path: "app/settings",
      index: void 0,
      caseSensitive: void 0,
      hasAction: true,
      hasLoader: true,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/app.settings-BqpMTYW5.js",
      imports: [
        "/assets/jsx-runtime-BgjmLhhW.js",
        "/assets/AppBridgeProvider-D5vJUI4H.js",
        "/assets/components-DT2cD7Eo.js",
      ],
      css: [],
    },
    "routes/auth.login": {
      id: "routes/auth.login",
      parentId: "root",
      path: "auth/login",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: true,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/auth.login-l0sNRNKZ.js",
      imports: [],
      css: [],
    },
    "routes/webhooks": {
      id: "routes/webhooks",
      parentId: "root",
      path: "webhooks",
      index: void 0,
      caseSensitive: void 0,
      hasAction: true,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/webhooks-l0sNRNKZ.js",
      imports: [],
      css: [],
    },
    "routes/_index": {
      id: "routes/_index",
      parentId: "root",
      path: void 0,
      index: true,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/_index-CQb5HeK1.js",
      imports: ["/assets/jsx-runtime-BgjmLhhW.js"],
      css: [],
    },
    "routes/auth.$": {
      id: "routes/auth.$",
      parentId: "root",
      path: "auth/*",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: true,
      hasClientAction: false,
      hasClientLoader: false,
      hasErrorBoundary: false,
      module: "/assets/auth._-l0sNRNKZ.js",
      imports: [],
      css: [],
    },
  },
  url: "/assets/manifest-3cb1ccf3.js",
  version: "3cb1ccf3",
};
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = {
  v3_fetcherPersist: true,
  v3_relativeSplatPath: true,
  v3_throwAbortReason: true,
  v3_routeConfig: false,
  v3_singleFetch: false,
  v3_lazyRouteDiscovery: false,
  unstable_optimizeDeps: false,
};
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0,
  },
  "routes/app.products": {
    id: "routes/app.products",
    parentId: "root",
    path: "app/products",
    index: void 0,
    caseSensitive: void 0,
    module: route1,
  },
  "routes/app.settings": {
    id: "routes/app.settings",
    parentId: "root",
    path: "app/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route2,
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route3,
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: route4,
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5,
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route6,
  },
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes,
};
