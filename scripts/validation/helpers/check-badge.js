import { chromium } from 'playwright';

async function checkBadge(url) {
  if (!url) {
    console.error("Please provide a URL as an argument.");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let errors = [];
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    const badge = await page.$('#cloudcache-validated-badge');

    if (!badge) {
      errors.push('Badge element #cloudcache-validated-badge not found.');
    } else {
      const text = await badge.innerText();
      if (text !== 'Cloudcache Validated') {
        errors.push(`Badge text content is incorrect. Expected "Cloudcache Validated", got "${text}".`);
      }

      const backgroundColor = await badge.evaluate(el => getComputedStyle(el).backgroundColor);
      // Note: Colors can be returned in different formats (e.g., rgb(255, 140, 0)). 
      // This is a simplified check. A more robust solution would parse and compare color values.
      if (backgroundColor !== 'rgb(244, 129, 32)') { // F48120
        errors.push(`Badge background color is incorrect. Expected #F48120, got ${backgroundColor}.`);
      }

      const color = await badge.evaluate(el => getComputedStyle(el).color);
      if (color !== 'rgb(255, 255, 255)') { // white
        errors.push(`Badge text color is incorrect. Expected white, got ${color}.`);
      }
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
