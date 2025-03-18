import { fetchPageContent } from "@/lib/utils";

type CacheEntry<T> = {
    added: number;
    promise: Promise<T>;
};

const cache: Record<string, CacheEntry<any>> = {};

export const cachedData = <T>(prefix: string, callback: () => Promise<T>, seconds = 2): Promise<T> => {
    const now = Date.now();

    if (cache[prefix] && (now - cache[prefix].added) < seconds * 1000) {
        return cache[prefix].promise;
    }

    const promise = callback();
    cache[prefix] = { added: now, promise };

    return promise;
};

export const getPreData = async (prefix: string, slug: string, extraData: string[]) => {
    return await cachedData(prefix, () => fetchPageContent(slug, extraData));
};
