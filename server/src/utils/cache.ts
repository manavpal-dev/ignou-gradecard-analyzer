type CacheData = {
  value: any;
  timestamp: number;
  duration: number;
};

const cache = new Map<string, CacheData>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 min

export const getCache = (key: string) => {
  const data = cache.get(key);

  if (!data) return null;

  const isExpired = Date.now() - data.timestamp > data.duration;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return data.value;
};

export const setCache = (key: string, value: any, duration: number) => {
  cache.set(key, {
    value,
    timestamp: Date.now(),
    duration,
  });
};
