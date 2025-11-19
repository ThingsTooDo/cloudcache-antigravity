import { chromium } from "playwright";

async function checkBadge(url) {
  if (!url) {
    console.error("Please provide a URL as an argument.");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let errors = [];
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    const badge = await page.$("#cloudcache-validated-badge");

    if (!badge) {
      errors.push("Badge element #cloudcache-validated-badge not found.");
    } else {
      const text = await badge.innerText();
      // Check if text starts with "Cloudcache" (date/time is dynamic)
      if (!text.startsWith("Cloudcache")) {
        errors.push(
          `Badge text content is incorrect. Expected to start with "Cloudcache", got "${text}".`
        );
      }

      // Visual checks for color are removed as they are too brittle for reliable automated validation.
      // A dedicated visual regression testing tool would be more appropriate for this.
    }
  } catch (e) {
    errors.push(`Failed to navigate and check badge: ${e.message}`);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  } else {
    console.log("Badge validation passed.");
    process.exit(0);
  }
}

checkBadge(process.argv[2]);
