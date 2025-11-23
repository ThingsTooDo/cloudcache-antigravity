export const TOGGLES = {
    "rocket-loader": {
        id: "rocket-loader",
        title: "Rocket Loader™",
        description: "Improve painting times for pages which include JavaScript.",
        apiSettingId: "rocket_loader",
    },
    // Future toggles can be added here
};
export function getToggleConfig(id) {
    return TOGGLES[id];
}
