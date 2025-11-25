/**
 * Canonicalize path (remove trailing slash, normalize)
 */
export function canonicalizePath(pathname: string): string {
  // Remove trailing slash except for root
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Check if path needs canonicalization and redirect
 */
export function shouldRedirect(pathname: string): string | null {
  const canonical = canonicalizePath(pathname);
  if (canonical !== pathname) {
    return canonical;
  }
  return null;
}

/**
 * Check if path is versioned API route
 */
export function isVersionedAPIRoute(pathname: string): boolean {
  return /^\/api\/v\d+\//.test(pathname);
}

/**
 * Extract API version from path
 */
export function getAPIVersion(pathname: string): string | null {
  const match = pathname.match(/^\/api\/(v\d+)\//);
  return match ? match[1] : null;
}
