import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "@shopify/polaris/build/esm/styles.css";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const host = url.searchParams.get("host");
  const apiKey = process.env.SHOPIFY_API_KEY || "";

  return { host, apiKey };
}

export default function App() {
  const { host, apiKey } = useLoaderData<typeof loader>();

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ host, apiKey }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
