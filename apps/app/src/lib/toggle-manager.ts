import { D1Database } from "@cloudflare/workers-types";
import { AppEnv } from "@cloudcache/platform-env";
import { CloudflareApiClient } from "./cloudflare-api-client";
import { getToggleConfig } from "./toggle-registry";

export class ToggleManager {
    private apiClient: CloudflareApiClient;

    constructor(
        private db: D1Database,
        private env: AppEnv
    ) {
        this.apiClient = new CloudflareApiClient(env);
    }

    async getState(customerId: string, toggleId: string): Promise<boolean | null> {
        // 1. Try to get from D1
        const result = await this.db
            .prepare(
                "SELECT state, last_synced_at FROM customer_toggles WHERE customer_id = ? AND toggle_id = ?"
            )
            .bind(customerId, toggleId)
            .first<{ state: string; last_synced_at: number }>();

        if (result) {
            // Check staleness (e.g., > 1 hour)
            const isStale = Date.now() - result.last_synced_at > 3600000; // 1 hour
            if (isStale) {
                // Trigger async sync (fire and forget)
                // In a real worker, we might use ctx.waitUntil, but here we just return the stale value
                // and rely on the cron job or a separate async trigger.
                console.log(`Toggle ${toggleId} for ${customerId} is stale. Scheduled sync needed.`);
            }
            return result.state === "on";
        }

        return null;
    }

    async setState(
        customerId: string,
        toggleId: string,
        enabled: boolean,
        zoneId: string,
        apiToken: string
    ): Promise<void> {
        const config = getToggleConfig(toggleId);
        if (!config) {
            throw new Error(`Invalid toggle ID: ${toggleId}`);
        }

        // 1. Update Cloudflare API
        const value = enabled ? "on" : "off";
        await this.apiClient.updateZoneSetting(zoneId, config.apiSettingId, value, apiToken);

        // 2. Update D1
        const now = Date.now();
        await this.db
            .prepare(
                `INSERT INTO customer_toggles (customer_id, toggle_id, state, last_synced_at, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(customer_id, toggle_id) DO UPDATE SET
         state = excluded.state,
         last_synced_at = excluded.last_synced_at,
         updated_at = excluded.updated_at`
            )
            .bind(customerId, toggleId, value, now, now)
            .run();
    }

    async syncFromCloudflare(
        customerId: string,
        toggleId: string,
        zoneId: string,
        apiToken: string
    ): Promise<void> {
        const config = getToggleConfig(toggleId);
        if (!config) {
            throw new Error(`Invalid toggle ID: ${toggleId}`);
        }

        // 1. Get from Cloudflare API
        const response = await this.apiClient.getZoneSetting(zoneId, config.apiSettingId, apiToken);
        const state = response.result.value === "on" ? "on" : "off";

        // 2. Update D1
        const now = Date.now();
        await this.db
            .prepare(
                `INSERT INTO customer_toggles (customer_id, toggle_id, state, last_synced_at, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(customer_id, toggle_id) DO UPDATE SET
         state = excluded.state,
         last_synced_at = excluded.last_synced_at,
         updated_at = excluded.updated_at`
            )
            .bind(customerId, toggleId, state, now, now)
            .run();
    }
}
