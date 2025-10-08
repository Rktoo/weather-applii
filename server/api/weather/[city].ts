interface GeocodingResult {
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

interface GeocodingResponse {
  results?: GeocodingResult[]
}

interface WeatherCurrent {
  time: string
  temperature_2m: number
  windspeed_10m: number
  weathercode: number
}

interface WeatherResponse {
  current: WeatherCurrent
}

interface CachedWeatherData {
  city: string
  country: string
  latitude: number
  longitude: number
  temperature: number
  windspeed: number
  weathercode: number
  timestamp: string
}

export default defineEventHandler(async (event) => {
  const city = getRouterParam(event, 'city')
  
  if (!city) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nom de ville requis'
    })
  }

  const decodedCity = decodeURIComponent(city).toLowerCase()
  const cacheKey = `weather:${decodedCity}`
  
  const storage = useStorage('cache')
  const cached = await storage.getItem<CachedWeatherData>(cacheKey)
  
  if (cached) {
    console.log(`✅ Cache hit: ${decodedCity}`)
    return cached
  }

  console.log(`🔄 Fetching: ${decodedCity}`)

  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(decodedCity)}&count=1&language=fr&format=json`
    
    // console.log(`Geocode URL: ${geocodeUrl}`)
    
    const geocodeRes = await fetch(geocodeUrl)
    
    if (!geocodeRes.ok) {
      throw new Error(`Geocode failed: ${geocodeRes.status}`)
    }
    
    const geocodeResponse: GeocodingResponse = await geocodeRes.json()

    if (!geocodeResponse.results || geocodeResponse.results.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Ville "${decodedCity}" non trouvée`
      })
    }

    const location = geocodeResponse.results[0]
    const { latitude, longitude, name, country } = location
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m,weathercode&timezone=auto`
    
    const weatherRes = await fetch(weatherUrl)
    
    if (!weatherRes.ok) {
      throw new Error(`Weather failed: ${weatherRes.status}`)
    }
    
    const weatherData: WeatherResponse = await weatherRes.json()

    const result: CachedWeatherData = {
      city: name,
      country: country,
      latitude: latitude,
      longitude: longitude,
      temperature: weatherData.current.temperature_2m,
      windspeed: weatherData.current.windspeed_10m,
      weathercode: weatherData.current.weathercode,
      timestamp: weatherData.current.time
    }
    
    await storage.setItem(cacheKey, result, { ttl: 600 })
    
    return result
    
  } catch (error: any) {
    console.error(`❌ Error for ${decodedCity}:`, error.message)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Erreur API'
    })
  }
})