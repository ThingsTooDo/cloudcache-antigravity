import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
    return [
        { title: "CloudCache ShopApp" },
        { name: "description", content: "Welcome to CloudCache ShopApp" },
    ];
};

export default function Index() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
            <h1>Welcome to CloudCache ShopApp</h1>
            <p>
                This is a Remix app running on Cloudflare Workers, integrated with Shopify.
            </p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href="https://remix.run/docs"
                        rel="noreferrer"
                    >
                        Remix Docs
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href="https://shopify.dev/docs/apps/tools/cli"
                        rel="noreferrer"
                    >
                        Shopify CLI Docs
                    </a>
                </li>
            </ul>
        </div>
    );
}
