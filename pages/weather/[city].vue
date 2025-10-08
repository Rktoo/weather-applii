<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Loading State -->
    <div v-if="pending" class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div class="relative w-24 h-24">
        <Loader2 :size="96" class="animate-spin" :class="themeStore.isDark ? 'text-cyan-400' : 'text-white'" />
      </div>
      <p class="text-2xl font-semibold" :class="themeStore.isDark ? 'text-gray-300' : 'text-white'">
        Chargement de la météo...
      </p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-2xl mx-auto">
      <div class="p-8 rounded-2xl text-center space-y-6" :class="themeStore.isDark
        ? 'bg-zinc-900/90 border border-zinc-800'
        : 'bg-white/90 backdrop-blur-xl shadow-2xl'">

        <div class="flex justify-center">
          <div class="relative">
            <CloudOff :size="80" :class="themeStore.isDark ? 'text-gray-500' : 'text-gray-400'" class="animate-pulse" />
            <div class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl rounded-full"></div>
          </div>
        </div>

        <div>
          <h2 class="text-3xl font-bold mb-2" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
            Ville introuvable
          </h2>
          <p class="text-lg mb-4" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
            Nous n'avons pas pu trouver la météo pour "{{ decodeURIComponent(city) }}"
          </p>
          <p class="text-sm" :class="themeStore.isDark ? 'text-gray-500' : 'text-gray-500'">
            Cette ville n'est peut-être pas disponible dans notre base de données
          </p>
        </div>

        <div class="pt-4">
          <p class="text-sm font-medium mb-4" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
            Essayez l'une de ces villes populaires :
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <NuxtLink v-for="suggestedCity in suggestedCities" :key="suggestedCity"
              :to="`/weather/${encodeURIComponent(suggestedCity.toLowerCase())}`"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 inline-flex items-center gap-2"
              :class="themeStore.isDark
                ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'">
              <MapPin :size="16" />
              {{ suggestedCity }}
            </NuxtLink>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <NuxtLink to="/">
            <button
              class="w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
              :class="themeStore.isDark
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'">
              <Search :size="20" />
              Rechercher une ville
            </button>
          </NuxtLink>

          <NuxtLink to="/">
            <button
              class="w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2"
              :class="themeStore.isDark
                ? 'bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'">
              <Home :size="20" />
              Accueil
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Weather Data -->
    <div v-else-if="weather" class="max-w-4xl mx-auto space-y-8">

      <!-- Main Weather Card -->
      <div class="relative mt-20 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl" :class="themeStore.isDark
        ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700'
        : 'bg-white/90 backdrop-blur-xl'">

        <div class="!absolute -right-20 md:-right-10 -top-[11.28rem] ">
          <RiveAnimation :width="600" :height="400" src="/rive/rob.riv" class="scale-120" />
        </div>
         <div class="flex items-center gap-3 mb-8 relative z-10">
          <MapPin :size="40" :class="themeStore.isDark ? 'text-cyan-400' : 'text-blue-600'" class="pointer-events-none" />
          <div class="select-text">
            <h1 class="text-5xl font-bold capitalize pointer-events-auto" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
              {{ weather.city }}
            </h1>
            <p class="text-lg pointer-events-auto" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
              {{ weather.country }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-center mb-8 pointer-events-none">
          <div class="relative flex items-center gap-4">
            <Thermometer :size="80" class="text-blue-400 animate-pulse" />
            <div>
              <div
                class="text-8xl font-bold bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {{ weather.temperature }}°C
              </div>
              <div
                class="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-2xl rounded-full -z-10">
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="p-6 rounded-2xl transition-all duration-300" :class="themeStore.isDark
            ? 'bg-zinc-800/50 border border-zinc-700'
            : 'bg-blue-50'">
            <div class="flex items-center space-x-4">
              <Wind :size="48" :class="themeStore.isDark ? 'text-cyan-400' : 'text-blue-600'" />
              <div>
                <p class="text-sm font-medium" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                  Vitesse du vent
                </p>
                <p class="text-3xl font-bold" :class="themeStore.isDark ? 'text-cyan-400' : 'text-blue-600'">
                  {{ weather.windspeed }} km/h
                </p>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl transition-all duration-300" :class="themeStore.isDark
            ? 'bg-zinc-800/50 border border-zinc-700'
            : 'bg-purple-50'">
            <div class="flex items-center space-x-4">
              <component :is="getWeatherIcon(weather.weathercode)" :size="48"
                :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'" />
              <div>
                <p class="text-sm font-medium" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                  Conditions
                </p>
                <p class="text-2xl font-bold" :class="themeStore.isDark ? 'text-purple-400' : 'text-purple-600'">
                  {{ getWeatherDescription(weather.weathercode) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl -z-10">
        </div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-3xl -z-10">
        </div>
      </div>

      <div class="p-6 rounded-2xl" :class="themeStore.isDark
        ? 'bg-zinc-900 border border-zinc-800'
        : 'bg-white/80 backdrop-blur-md'">
        <div class="flex items-center gap-2 mb-4">
          <Info :size="24" :class="themeStore.isDark ? 'text-cyan-400' : 'text-gray-900'" />
          <h3 class="text-xl font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
            Informations supplémentaires
          </h3>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-lg flex items-center gap-3"
            :class="themeStore.isDark ? 'bg-zinc-800' : 'bg-gray-100'">
            <Hash :size="24" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'" />
            <div>
              <p class="text-sm" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                Code météo
              </p>
              <p class="text-2xl font-bold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                {{ weather.weathercode }}
              </p>
            </div>
          </div>

          <div class="p-4 rounded-lg flex items-center gap-3"
            :class="themeStore.isDark ? 'bg-zinc-800' : 'bg-gray-100'">
            <Clock :size="24" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'" />
            <div>
              <p class="text-sm" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                Mise à jour
              </p>
              <p class="text-lg font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                Temps réel
              </p>
            </div>
          </div>

          <div class="p-4 rounded-lg flex items-center gap-3"
            :class="themeStore.isDark ? 'bg-zinc-800' : 'bg-gray-100'">
            <Globe :size="24" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'" />
            <div>
              <p class="text-sm" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                Latitude
              </p>
              <p class="text-lg font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                {{ weather.latitude?.toFixed(2) }}°
              </p>
            </div>
          </div>

          <div class="p-4 rounded-lg flex items-center gap-3"
            :class="themeStore.isDark ? 'bg-zinc-800' : 'bg-gray-100'">
            <Navigation :size="24" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'" />
            <div>
              <p class="text-sm" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                Longitude
              </p>
              <p class="text-lg font-semibold" :class="themeStore.isDark ? 'text-white' : 'text-gray-900'">
                {{ weather.longitude?.toFixed(2) }}°
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPin, Thermometer, Wind, Loader2, Home, Info, Hash, Clock, Globe, Navigation, Sun, Cloud, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudOff, Search } from 'lucide-vue-next'
import RiveAnimation from '~/components/RiveAnimation.vue'

const route = useRoute()
const themeStore = useThemeStore()
const city = route.params.city

const { data: weather, pending, error } = await useFetch(`/api/weather/${city}`)

const suggestedCities = ['Paris', 'London', 'New York', 'Tokyo', 'Berlin', 'Sydney']

const getWeatherIcon = (code) => {
  const weatherIcons = {
    0: Sun,
    1: Sun,
    2: Cloud,
    3: Cloud,
    45: CloudFog,
    48: CloudFog,
    51: CloudDrizzle,
    61: CloudRain,
    71: CloudSnow,
    95: CloudLightning
  }
  return weatherIcons[code] || Cloud
}

const getWeatherDescription = (code) => {
  const descriptions = {
    0: 'Ciel dégagé',
    1: 'Principalement dégagé',
    2: 'Partiellement nuageux',
    3: 'Couvert',
    45: 'Brouillard',
    48: 'Brouillard givrant',
    51: 'Bruine légère',
    61: 'Pluie',
    71: 'Neige',
    95: 'Orage'
  }
  return descriptions[code] || 'Variable'
}

definePageMeta({
  layout: 'weather'
})

useHead({
  title: `Météo ${weather.value?.city || decodeURIComponent(city)}`,
  meta: [
    { name: 'description', content: `Prévisions météo pour ${weather.value?.city || decodeURIComponent(city)}` }
  ]
})
</script>