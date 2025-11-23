export class CloudflareApiClient {
    env;
    constructor(env) {
        this.env = env;
    }
    getHeaders(token) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }
    async getZoneSetting(zoneId, settingId, token) {
        const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/${settingId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: this.getHeaders(token),
        });
        if (!response.ok) {
            throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
    async updateZoneSetting(zoneId, settingId, value, token) {
        const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/${settingId}`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: this.getHeaders(token),
            body: JSON.stringify({ value }),
        });
        if (!response.ok) {
            throw new Error(`Cloudflare API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
}
