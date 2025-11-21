import { AppEnv } from "@cloudcache/platform-env";

export class CloudflareApiClient {
    constructor(private env: AppEnv) { }

    private getHeaders(token: string) {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }

    async getZoneSetting(zoneId: string, settingId: string, token: string): Promise<any> {
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

    async updateZoneSetting(zoneId: string, settingId: string, value: any, token: string): Promise<any> {
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
