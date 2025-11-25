/**
 * Check if HTTP method is allowed
 */
export function isMethodAllowed(request: Request, allowedMethods: string[]): boolean {
  return allowedMethods.includes(request.method);
}
