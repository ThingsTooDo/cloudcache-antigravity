export class CustomerZoneManager {
    db;
    constructor(db) {
        this.db = db;
    }
    async getZoneId(customerId) {
        const result = await this.db
            .prepare("SELECT zone_id FROM customer_zones WHERE customer_id = ?")
            .bind(customerId)
            .first();
        return result ? result.zone_id : null;
    }
    async setZoneId(customerId, zoneId) {
        const now = Date.now();
        await this.db
            .prepare(`INSERT INTO customer_zones (customer_id, zone_id, created_at, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(customer_id) DO UPDATE SET
         zone_id = excluded.zone_id,
         updated_at = excluded.updated_at`)
            .bind(customerId, zoneId, now, now)
            .run();
    }
}
