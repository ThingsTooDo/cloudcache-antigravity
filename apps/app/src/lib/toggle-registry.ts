export interface ToggleConfig {
    id: string;
    title: string;
    description: string;
    apiSettingId: string; // Cloudflare API setting ID (e.g., "rocket_loader")
}

export const TOGGLES: Record<string, ToggleConfig> = {
    "rocket-loader": {
        id: "rocket-loader",
        title: "Rocket Loader™",
        description: "Improve painting times for pages which include JavaScript.",
        apiSettingId: "rocket_loader",
    },
    // Future toggles can be added here
};

export function getToggleConfig(id: string): ToggleConfig | undefined {
    return TOGGLES[id];
}
