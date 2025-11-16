import { chromium } from 'playwright';
import { URL } from 'url';

async function checkLinks(url) {
  if (!url) {
    console.error("Please provide a URL as an argument.");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  const base = new URL(url).origin;

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    const links = await page.$$eval('a', anchors => anchors.map(a => a.href));

    for (const link of links) {
      // Ignore empty links or anchors on the same page
      if (!link || link.startsWith(`${base}#`)) {
        continue;
      }
      
      try {
        const response = await page.goto(link, { waitUntil: 'domcontentloaded' });
        if (!response.ok()) {
          errors.push(`Broken link found: ${link} (Status: ${response.status()})`);
        }
      } catch (e) {
        errors.push(`Failed to follow link: ${link} (Error: ${e.message})`);
      }
      // Go back to the original page to continue checking other links
      await page.goBack();
    }
  } catch (e) {
    errors.push(`Failed to navigate and check links: ${e.message}`);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  } else {
    console.log("Link validation passed.");
    process.exit(0);
  }
}

checkLinks(process.argv[2]);
