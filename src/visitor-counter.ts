/**
 * Unique-visitor counter for the toolbar.
 *
 * Presentation mirrors learn-dvc (a small person-icon + count in the toolbar,
 * hidden until a value is known). The counting mechanism mirrors aghili-labs:
 * the number lives on visitorbadge.io at `path=learn-sql` — a single shared
 * value on their server, so every browser reads the same number. We read it
 * with the read-only `/api/get` endpoint (which never increments) and bump it
 * via `/api/hit` only once per browser per UTC day. This keeps one stable
 * number that grows with genuine new visitors instead of inflating on every
 * page load. A small local cache doubles as a "never drop" floor so a
 * returning browser never sees its number fall.
 */

const STORAGE_KEY = 'learn-sql:visitors:v1';
const LAST_VISIT_KEY = 'learn-sql:last-visit-date';

const COUNTER_PATH = 'learn-sql';
const GET_URL = `https://api.visitorbadge.io/api/get?path=${COUNTER_PATH}`; // read-only
const HIT_URL = `https://api.visitorbadge.io/api/hit?path=${COUNTER_PATH}`; // +1
const REQUEST_TIMEOUT_MS = 3500;

export interface CachedCount {
  count: number;
  at: number;
}

function getStorage(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

function isCount(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

/**
 * Last known count, used as a first-paint value and a "never drop" floor.
 * Returns `null` when this browser has never recorded a count yet.
 */
export function readCachedCount(): number | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedCount | null;
    return isCount(parsed?.count) ? parsed.count : null;
  } catch {
    return null;
  }
}

function writeCachedCount(count: number): void {
  try {
    getStorage()?.setItem(STORAGE_KEY, JSON.stringify({ count, at: Date.now() }));
  } catch {
    // storage unavailable (private mode / quota)
  }
}

/**
 * Tolerant parser for a counter value: a bare number, or JSON of the form
 * `{ "value": n }` / `{ "count": n }` / `{ "visitors": n }`.
 */
export function parseCountText(text: string): number | null {
  const trimmed = (text ?? '').trim();
  let n: number;
  if (/^\d+$/.test(trimmed)) {
    n = Number(trimmed);
  } else {
    try {
      const j: unknown = JSON.parse(trimmed);
      const rec = (j ?? {}) as Record<string, unknown>;
      n = Number(rec.value ?? rec.count ?? rec.visitors ?? j);
    } catch {
      const m = trimmed.match(/\d+/);
      n = m ? Number(m[0]) : NaN;
    }
  }
  return isCount(n) ? n : null;
}

async function fetchCount(url: string): Promise<number | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
      headers: { Accept: 'application/json, text/plain, */*' },
    });
    if (!res.ok) return null;
    const text = await res.text();
    return parseCountText(text);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * True (and records) when this is the browser's first visit of the current UTC
 * day. The flag is set up front so a fast reload can never double-bump.
 */
function isNewDailyVisit(storage: Storage): boolean {
  try {
    const today = new Date().toISOString().slice(0, 10);
    if (storage.getItem(LAST_VISIT_KEY) === today) return false;
    storage.setItem(LAST_VISIT_KEY, today);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the visitor count to display, or `null` when nothing is known yet
 * (a first visit with the counter unreachable) so the UI can stay hidden.
 */
export async function loadVisitorCount(): Promise<number | null> {
  const storage = getStorage();
  const floor = readCachedCount();

  // 1. Read the shared counter without incrementing.
  let value = await fetchCount(GET_URL);

  // 2. Genuinely new (daily) visit → bump the shared counter exactly once.
  if (storage && isNewDailyVisit(storage)) {
    try {
      await fetch(HIT_URL, { cache: 'no-store' });
    } catch {
      // ignore network / adblocker failures
    }
    if (value !== null) value = value + 1;
  }

  // 3. Never show less than the last value we already displayed.
  if (value !== null) {
    const total = Math.max(value, floor ?? 0);
    writeCachedCount(total);
    return total;
  }

  // 4. Counter unreachable: hold the floor for returning browsers, else hide.
  return floor;
}
