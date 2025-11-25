export type DependencySelectors = {
  kvBinding?: string;
  d1Binding?: string;
  r2Binding?: string;
};

export type ReadyzOptions = {
  ttlMs?: number; // cache TTL for readiness outcome
  timeoutMs?: number; // per-check timeout
  tokenHeader?: string; // header name for shared token
  tokenEnvKey?: string; // env var name containing token
  requireAuth?: boolean;
};

export type HealthConfig = {
  service: string;
  envName?: string;
  dependencies?: DependencySelectors;
  readyz?: ReadyzOptions;
};

export type EnvLike = Record<string, unknown>;
