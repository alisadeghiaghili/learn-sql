/**
 * Unique-visitor counter shared by all courses on this origin.
 *
 * The number lives only on the counter server. A browser is counted once
 * (flagged in localStorage); every other load just reads the current value.
 * The server value is always shown as received.
 */

export const COUNTER_API = 'https://abacus.jasoncameron.dev';
export const COUNTER_NAMESPACE = 'alisadeghiaghili.github.io';
export const COURSE_SLUG = 'learn-sql';
export const COUNTER_KEY = `${COURSE_SLUG}-unique-visitors`;

export const COUNTED_FLAG_KEY = `${COURSE_SLUG}:visitor-counted:v1`;
export const COUNT_CACHE_KEY = `${COURSE_SLUG}:visitor-count:v2`;
export const REQUEST_TIMEOUT_MS = 5000;

type Action = 'get' | 'hit';

export function counterUrl(action: Action): string {
  return `${COUNTER_API}/${action}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
}

function getStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function isCount(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0;
}

/**
 * One counter request. Resolves to the server value, or `null` on any failure
 * (network error, timeout, non-2xx, bad JSON). A 404 on `get` means the key
 * does not exist yet and is reported as 0.
 */
async function request(action: Action): Promise<number | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(counterUrl(action), {
      cache: 'no-store',
      signal: ctrl.signal,
    });
    if (action === 'get' && res.status === 404) return 0;
    if (!res.ok) return null;
    const body: unknown = await res.json();
    const value = (body as { value?: unknown } | null)?.value;
    return isCount(value) ? value : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Last server value, for the first paint only. Never a floor. */
export function readCachedCount(): number | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(COUNT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { count?: unknown } | null;
    return isCount(parsed?.count) ? parsed.count : null;
  } catch {
    return null;
  }
}

function writeCachedCount(count: number): void {
  try {
    getStorage()?.setItem(
      COUNT_CACHE_KEY,
      JSON.stringify({ count, at: new Date().toISOString() }),
    );
  } catch {
    /* storage unavailable */
  }
}

/**
 * Registers this browser (once) and returns the server's visitor count,
 * or `null` when the server could not be reached.
 */
export async function loadVisitorCount(): Promise<number | null> {
  const storage = getStorage();
  let mayHit = false;

  if (storage) {
    try {
      if (storage.getItem(COUNTED_FLAG_KEY) === null) {
        // Flag first, so concurrent loads of this page never double count.
        storage.setItem(COUNTED_FLAG_KEY, new Date().toISOString());
        mayHit = true;
      }
    } catch {
      mayHit = false;
    }
  }

  let count: number | null = null;
  if (mayHit) {
    count = await request('hit');
    if (count === null) {
      try {
        storage?.removeItem(COUNTED_FLAG_KEY);
      } catch {
        /* storage unavailable */
      }
    }
  }
  if (count === null) count = await request('get');

  if (count !== null) writeCachedCount(count);
  return count;
}

/** Display form of the count. */
export function formatVisitorCount(count: number): string {
  return count.toLocaleString('en-US');
}
