import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  loadVisitorCount,
  parseCountText,
  readCachedCount,
} from './visitor-counter';

const STORAGE_KEY = 'learn-sql:visitors:v1';
const LAST_VISIT_KEY = 'learn-sql:last-visit-date';
const GET_URL = 'https://api.visitorbadge.io/api/get?path=learn-sql';
const HIT_URL = 'https://api.visitorbadge.io/api/hit?path=learn-sql';

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

type Handler = (url: string) => Response | Promise<Response>;

let storage: Storage;
let fetchMock: ReturnType<typeof vi.fn>;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function textResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: { 'content-type': 'text/plain' },
  });
}

function mockServer(handler: Handler): void {
  fetchMock = vi.fn((input: RequestInfo | URL) => Promise.resolve(handler(String(input))));
  vi.stubGlobal('fetch', fetchMock);
}

function callsTo(url: string): number {
  return fetchMock.mock.calls.filter(([u]) => String(u) === url).length;
}

function callOrder(): string[] {
  return fetchMock.mock.calls.map(([u]) => String(u));
}

function seedCache(count: number): void {
  storage.setItem(STORAGE_KEY, JSON.stringify({ count, at: 0 }));
}

beforeEach(() => {
  storage = memoryStorage();
  vi.stubGlobal('localStorage', storage);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('parseCountText', () => {
  it('parses a bare number', () => {
    expect(parseCountText('123')).toBe(123);
  });

  it('parses JSON { value } / { count } / { visitors }', () => {
    expect(parseCountText(JSON.stringify({ value: 42 }))).toBe(42);
    expect(parseCountText(JSON.stringify({ count: 7 }))).toBe(7);
    expect(parseCountText(JSON.stringify({ visitors: 99 }))).toBe(99);
  });

  it('falls back to the first number in free text', () => {
    expect(parseCountText('visitors: 456 today')).toBe(456);
  });

  it('returns null on unparseable input', () => {
    expect(parseCountText('')).toBeNull();
    expect(parseCountText('not a number')).toBeNull();
  });
});

describe('readCachedCount', () => {
  it('returns null when nothing is cached', () => {
    expect(readCachedCount()).toBeNull();
  });

  it('returns the cached count', () => {
    seedCache(321);
    expect(readCachedCount()).toBe(321);
  });
});

describe('loadVisitorCount', () => {
  const today = new Date().toISOString().slice(0, 10);

  it('returning visit: reads via GET only (read-only), no HIT', async () => {
    storage.setItem(LAST_VISIT_KEY, today);
    mockServer((url) => (url === GET_URL ? json({ value: 500 }) : json({ value: 501 })));

    await expect(loadVisitorCount()).resolves.toBe(500);
    expect(callsTo(GET_URL)).toBe(1);
    expect(callsTo(HIT_URL)).toBe(0);
    expect(readCachedCount()).toBe(500);
  });

  it('first visit of the day: GET then one HIT, returns value + 1', async () => {
    mockServer((url) => (url === GET_URL ? json({ value: 500 }) : json({ value: 501 })));

    await expect(loadVisitorCount()).resolves.toBe(501);
    expect(callOrder()).toEqual([GET_URL, HIT_URL]);
    expect(storage.getItem(LAST_VISIT_KEY)).toBe(today);
  });

  it('does not double-bump on a fast same-day reload', async () => {
    mockServer((url) => (url === GET_URL ? json({ value: 10 }) : json({ value: 11 })));

    await loadVisitorCount(); // first visit → 1 HIT
    await loadVisitorCount(); // same day → no HIT

    expect(callsTo(HIT_URL)).toBe(1);
    expect(callsTo(GET_URL)).toBe(2);
  });

  it('never shows less than the last-seen value (floor)', async () => {
    seedCache(900);
    storage.setItem(LAST_VISIT_KEY, today); // returning, so no HIT
    mockServer((url) => (url === GET_URL ? json({ value: 100 }) : json({ value: 101 })));

    await expect(loadVisitorCount()).resolves.toBe(900);
    expect(readCachedCount()).toBe(900);
  });

  it('holds the floor when the counter is unreachable', async () => {
    seedCache(250);
    mockServer(() => {
      throw new Error('offline');
    });

    await expect(loadVisitorCount()).resolves.toBe(250);
  });

  it('returns null (stays hidden) when unreachable and no floor exists', async () => {
    mockServer(() => {
      throw new Error('offline');
    });

    await expect(loadVisitorCount()).resolves.toBeNull();
  });

  it('tolerates a bare-number GET response', async () => {
    storage.setItem(LAST_VISIT_KEY, today);
    mockServer((url) => (url === GET_URL ? textResponse('75') : textResponse('76')));

    await expect(loadVisitorCount()).resolves.toBe(75);
  });
});
