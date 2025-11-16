import { test, expect } from "@playwright/test";

const targetUrl = process.env.DEPLOYMENT_URL;

if (!targetUrl) {
  throw new Error("DEPLOYMENT_URL environment variable is not set.");
}

test("Console error check", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

  expect(errors).toEqual([]);
});
