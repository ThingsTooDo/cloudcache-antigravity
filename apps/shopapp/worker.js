// @ts-nocheck
import * as build from "./build/server/index.js";

export default {
    async fetch(request, env, ctx) {
        try {
            const loadContext = { env };
            const response = await build.handleRequest(
                request,
                200,
                new Headers(),
                build,
                loadContext
            );
            return response;
        } catch (error) {
            console.error("Worker error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    },
};
