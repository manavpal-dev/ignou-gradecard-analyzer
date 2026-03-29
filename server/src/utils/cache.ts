type CacheData = {
  value: any;
  timestamp: number;
};

const cache = new Map<string, CacheData>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 min

export const getCache = (key: string) => {
  const data = cache.get(key);

  if (!data) return null;

  const isExpired = Date.now() - data.timestamp > CACHE_DURATION;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return data.value;
};

export const setCache = (key: string, value: any) => {
  cache.set(key, {
    value,
    timestamp: Date.now(),
  });
};
