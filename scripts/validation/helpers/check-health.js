#!/usr/bin/env node

async function checkHealth(url, expectedVersion) {
  if (!url) {
    console.error("Please provide a URL as the first argument.");
    process.exit(1);
  }
  if (!expectedVersion) {
    console.error("Please provide the expected git commit hash as the second argument.");
    process.exit(1);
  }

  const healthUrl = new URL("/healthz", url).toString();
  const errors = [];

  try {
    const response = await fetch(healthUrl);

    if (!response.ok) {
      errors.push(`Health check failed with status ${response.status} at ${healthUrl}`);
    } else {
      const data = await response.json();

      if (data.status !== "ok") {
        errors.push(`Health check status was not 'ok'. Got: ${data.status}`);
      }

      if (data.version !== expectedVersion) {
        errors.push(`Version mismatch. Expected: ${expectedVersion}, Got: ${data.version}`);
      }
    }
  } catch (e) {
    errors.push(`Failed to fetch health check from ${healthUrl}: ${e.message}`);
  }

  if (errors.length > 0) {
    console.error(JSON.stringify(errors, null, 2));
    process.exit(1);
  } else {
    console.log("Health and version check passed.");
    process.exit(0);
  }
}

checkHealth(process.argv[2], process.argv[3]);
