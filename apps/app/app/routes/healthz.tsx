import { json } from "@remix-run/cloudflare";

export async function loader() {
    return json({
        status: "ok",
        service: "app",
        // In a real app, you'd inject the version at build time
        // For now, we'll use a placeholder or try to read it if available
        version: process.env.GIT_HASH || "unknown",
    });
}
