import { Miniflare } from "miniflare";
/**
 * Create a test environment with mocked Cloudflare bindings
 */
export function createTestEnv(env = {}) {
  return {
    ...env,
  };
}
/**
 * Create a mock KV namespace
 */
export function mockKV(initialData = {}) {
  const store = new Map(Object.entries(initialData).map(([k, v]) => [k, { value: v }]));
  return {
    async get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (entry.expiration && entry.expiration < Date.now()) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },
    async put(key, value, options) {
      const expiration = options?.expirationTtl
        ? Date.now() + options.expirationTtl * 1000
        : undefined;
      store.set(key, { value, expiration });
    },
    async delete(key) {
      store.delete(key);
    },
    async list() {
      return {
        keys: Array.from(store.keys()).map((name) => ({ name })),
      };
    },
  };
}
/**
 * Create a mock D1 database
 */
export function mockD1() {
  return {
    prepare(query) {
      void query;
      return {
        bind(...args) {
          void args;
          return {
            async first() {
              return null;
            },
            async all() {
              return { results: [] };
            },
            async run() {
              return { success: true };
            },
          };
        },
      };
    },
  };
}
/**
 * Create a test request
 */
export function createTestRequest(url, init = {}) {
  return new Request(url, init);
}
/**
 * Create Miniflare instance for testing Workers
 */
export function createMiniflare(options) {
  return new Miniflare({
    script: options.script || "",
    modules: options.modules ?? true,
    bindings: options.bindings || {},
  });
}
