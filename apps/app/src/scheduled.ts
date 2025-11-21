import { AppEnv } from "@cloudcache/platform-env";
import { ToggleManager } from "./lib/toggle-manager";

export default {
  async scheduled(event: ScheduledEvent, env: AppEnv, ctx: ExecutionContext): Promise<void> {
    console.log("Starting scheduled sync...");

    const db = env.APP_D1;
    const toggleManager = new ToggleManager(db, env);

    // Query D1 for stale entries (last_synced_at < 15 minutes ago)
    // 15 minutes = 900000 ms
    const staleThreshold = Date.now() - 900000;

    try {
      const staleToggles = await db
        .prepare(
          `
          SELECT ct.customer_id, ct.toggle_id, cz.zone_id 
          FROM customer_toggles ct
          JOIN customer_zones cz ON ct.customer_id = cz.customer_id
          WHERE ct.last_synced_at < ?
          LIMIT 100
        `
        )
        .bind(staleThreshold)
        .all<{ customer_id: string; toggle_id: string; zone_id: string }>();

      if (!staleToggles.results || staleToggles.results.length === 0) {
        console.log("No stale toggles found.");
        return;
      }

      console.log(`Found ${staleToggles.results.length} stale toggles. Syncing...`);

      // Batch sync to Cloudflare API (respect rate limits)
      // We process them sequentially to be safe, or with limited concurrency
      for (const toggle of staleToggles.results) {
        try {
          if (env.CF_API_TOKEN) {
            await toggleManager.syncFromCloudflare(
              toggle.customer_id,
              toggle.toggle_id,
              toggle.zone_id,
              env.CF_API_TOKEN
            );
            console.log(`Synced ${toggle.toggle_id} for ${toggle.customer_id}`);
          } else {
            console.warn("Skipping sync: CF_API_TOKEN not set");
          }
        } catch (error) {
          console.error(`Failed to sync ${toggle.toggle_id} for ${toggle.customer_id}:`, error);
        }
      }

      console.log("Scheduled sync complete.");
    } catch (error) {
      console.error("Error querying stale toggles:", error);
    }
  },
};
