const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export function getCachedData(key: string) {
    const cached = cache.get(key)
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > CACHE_DURATION
    if (isExpired) {
        cache.delete(key)
        return null
    }

    console.log(`✅ Cache hit pour: ${key}`)
    return cached.data
}

export function setCachedData(key: string, data: any) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    })
    console.log(`💾 Mise en cache: ${key}`)
}