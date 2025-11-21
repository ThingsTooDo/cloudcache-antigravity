import { D1Database } from "@cloudflare/workers-types";

export interface CustomerZone {
    customer_id: string;
    zone_id: string;
    created_at: number;
    updated_at: number;
}

export class CustomerZoneManager {
    constructor(private db: D1Database) { }

    async getZoneId(customerId: string): Promise<string | null> {
        const result = await this.db
            .prepare("SELECT zone_id FROM customer_zones WHERE customer_id = ?")
            .bind(customerId)
            .first<CustomerZone>();

        return result ? result.zone_id : null;
    }

    async setZoneId(customerId: string, zoneId: string): Promise<void> {
        const now = Date.now();
        await this.db
            .prepare(
                `INSERT INTO customer_zones (customer_id, zone_id, created_at, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(customer_id) DO UPDATE SET
         zone_id = excluded.zone_id,
         updated_at = excluded.updated_at`
            )
            .bind(customerId, zoneId, now, now)
            .run();
    }
}
