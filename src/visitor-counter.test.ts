import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  COUNTED_FLAG_KEY,
  COUNT_CACHE_KEY,
  COUNTER_KEY,
  COURSE_SLUG,
  counterUrl,
  formatVisitorCount,
  loadVisitorCount,
  readCachedCount,
} from './visitor-counter';

const GET_URL = `https://abacus.jasoncameron.dev/get/alisadeghiaghili.github.io/${COURSE_SLUG}-unique-visitors`;
const HIT_URL = `https://abacus.jasoncameron.dev/hit/alisadeghiaghili.github.io/${COURSE_SLUG}-unique-visitors`;

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k) => (data.has(k) ? data.get(k)! : null),
    key: (i) => [...data.keys()][i] ?? null,
    removeItem: (k) => void data.delete(k),
    setItem: (k, v) => void data.set(k, String(v)),
  };
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

type Handler = (url: string) => Response | Promise<Response>;

let storage: Storage;
let fetchMock: ReturnType<typeof vi.fn>;

function mockServer(handler: Handler): void {
  fetchMock = vi.fn((input: RequestInfo | URL) => Promise.resolve(handler(String(input))));
  vi.stubGlobal('fetch', fetchMock);
}

function callsTo(url: string): number {
  return fetchMock.mock.calls.filter(([u]) => String(u) === url).length;
}

beforeEach(() => {
  storage = memoryStorage();
  vi.stubGlobal('localStorage', storage);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('visitor counter', () => {
  it('uses the shared namespace and the per-course key', () => {
    expect(COUNTER_KEY).toBe(`${COURSE_SLUG}-unique-visitors`);
    expect(counterUrl('get')).toBe(GET_URL);
    expect(counterUrl('hit')).toBe(HIT_URL);
  });

  it('first visit: exactly one hit, flag set, shows the hit value', async () => {
    mockServer((url) => (url === HIT_URL ? json({ value: 1235 }) : json({ value: 0 })));

    const count = await loadVisitorCount();

    expect(count).toBe(1235);
    expect(callsTo(HIT_URL)).toBe(1);
    expect(callsTo(GET_URL)).toBe(0);
    expect(Date.parse(storage.getItem(COUNTED_FLAG_KEY) ?? '')).not.toBeNaN();
    expect(readCachedCount()).toBe(1235);
  });

  it('requests are sent without caching', async () => {
    mockServer(() => json({ value: 5 }));
    await loadVisitorCount();
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    expect(init.cache).toBe('no-store');
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('second visit: only get, no increment', async () => {
    mockServer((url) => (url === HIT_URL ? json({ value: 1235 }) : json({ value: 1240 })));

    await loadVisitorCount();
    fetchMock.mockClear();
    const count = await loadVisitorCount();

    expect(count).toBe(1240);
    expect(callsTo(HIT_URL)).toBe(0);
    expect(callsTo(GET_URL)).toBe(1);
  });

  it('failed hit: flag removed, falls back to get, next visit hits again', async () => {
    mockServer((url) => (url === HIT_URL ? json({ error: 'x' }, 500) : json({ value: 77 })));

    const count = await loadVisitorCount();

    expect(count).toBe(77);
    expect(callsTo(HIT_URL)).toBe(1);
    expect(callsTo(GET_URL)).toBe(1);
    expect(storage.getItem(COUNTED_FLAG_KEY)).toBeNull();

    mockServer((url) => (url === HIT_URL ? json({ value: 78 }) : json({ value: 78 })));
    expect(await loadVisitorCount()).toBe(78);
    expect(callsTo(HIT_URL)).toBe(1);
    expect(storage.getItem(COUNTED_FLAG_KEY)).not.toBeNull();
  });

  it('network error on hit also removes the flag and falls back to get', async () => {
    mockServer((url) => {
      if (url === HIT_URL) throw new TypeError('network down');
      return json({ value: 9 });
    });

    expect(await loadVisitorCount()).toBe(9);
    expect(storage.getItem(COUNTED_FLAG_KEY)).toBeNull();
  });

  it('malformed hit body counts as a failed hit', async () => {
    mockServer((url) => (url === HIT_URL ? json({ value: 'many' }) : json({ value: 3 })));

    expect(await loadVisitorCount()).toBe(3);
    expect(storage.getItem(COUNTED_FLAG_KEY)).toBeNull();
  });

  it('a hit that times out is aborted after 5 seconds and falls back to get', async () => {
    vi.useFakeTimers();
    fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input) === HIT_URL) {
        return new Promise<Response>((_, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('aborted', 'AbortError')),
          );
        });
      }
      return Promise.resolve(json({ value: 41 }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const pending = loadVisitorCount();
    await vi.advanceTimersByTimeAsync(4999);
    expect(callsTo(GET_URL)).toBe(0);
    await vi.advanceTimersByTimeAsync(1);

    expect(await pending).toBe(41);
    expect(storage.getItem(COUNTED_FLAG_KEY)).toBeNull();
  });

  it('get 404 shows 0', async () => {
    storage.setItem(COUNTED_FLAG_KEY, new Date().toISOString());
    mockServer(() => json({ error: 'not found' }, 404));

    expect(await loadVisitorCount()).toBe(0);
    expect(readCachedCount()).toBe(0);
  });

  it('get failure yields no value and keeps the placeholder untouched', async () => {
    storage.setItem(COUNTED_FLAG_KEY, new Date().toISOString());
    storage.setItem(COUNT_CACHE_KEY, JSON.stringify({ count: 500, at: 'earlier' }));
    mockServer(() => json({ error: 'boom' }, 503));

    expect(await loadVisitorCount()).toBeNull();
    expect(readCachedCount()).toBe(500);
  });

  it('a stale or inflated cache is replaced by the lower server value', async () => {
    storage.setItem(COUNTED_FLAG_KEY, new Date().toISOString());
    storage.setItem(COUNT_CACHE_KEY, JSON.stringify({ count: 999999, at: 'earlier' }));
    expect(readCachedCount()).toBe(999999);
    mockServer(() => json({ value: 42 }));

    expect(await loadVisitorCount()).toBe(42);
    expect(readCachedCount()).toBe(42);
  });

  it('unavailable localStorage: never hits, get only', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    mockServer(() => json({ value: 15 }));

    expect(await loadVisitorCount()).toBe(15);
    expect(callsTo(HIT_URL)).toBe(0);
    expect(callsTo(GET_URL)).toBe(1);
    expect(readCachedCount()).toBeNull();
  });

  it('missing localStorage object: never hits, get only', async () => {
    vi.stubGlobal('localStorage', undefined);
    mockServer(() => json({ value: 8 }));

    expect(await loadVisitorCount()).toBe(8);
    expect(callsTo(HIT_URL)).toBe(0);
  });

  it('storage that rejects writes: never hits', async () => {
    storage.setItem = () => {
      throw new Error('quota');
    };
    mockServer(() => json({ value: 6 }));

    expect(await loadVisitorCount()).toBe(6);
    expect(callsTo(HIT_URL)).toBe(0);
  });

  it('two loads in a row (strict-mode style) count only once', async () => {
    mockServer((url) => (url === HIT_URL ? json({ value: 11 }) : json({ value: 11 })));

    await Promise.all([loadVisitorCount(), loadVisitorCount()]);

    expect(callsTo(HIT_URL)).toBe(1);
  });

  it('ignores a malformed cache entry', () => {
    storage.setItem(COUNT_CACHE_KEY, '{not json');
    expect(readCachedCount()).toBeNull();
    storage.setItem(COUNT_CACHE_KEY, JSON.stringify({ count: -3, at: 'x' }));
    expect(readCachedCount()).toBeNull();
  });

  it('formats the count as a grouped integer', () => {
    expect(formatVisitorCount(1234567)).toBe('1,234,567');
    expect(formatVisitorCount(0)).toBe('0');
  });
});
