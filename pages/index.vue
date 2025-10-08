<template>
  <!-- Hero -->
  <section class="relative overflow-hidden py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center space-y-8">

        <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full" :class="themeStore.isDark
          ? 'bg-blue-500/20 text-blue-400'
          : 'bg-white/20 text-white'">
          <span class="text-sm font-medium">Météo en temps réel</span>
        </div>

        <h1 class="text-5xl lg:text-6xl font-bold leading-tight"
          :class="themeStore.isDark ? 'text-white' : 'text-white'">
          Découvrez la météo de
          <span :class="themeStore.isDark ? 'text-cyan-400' : 'text-yellow-300'">
            votre ville
          </span>
        </h1>

        <p class="text-xl max-w-2xl mx-auto" :class="themeStore.isDark ? 'text-gray-400' : 'text-white/90'">
          Recherchez n'importe quelle ville et obtenez des prévisions météorologiques précises et détaillées
        </p>

        <!-- Form -->
        <form @submit.prevent="searchCity" class="max-w-xl mx-auto relative">
          <div class="relative">
            <Search :size="20" class="absolute left-6 top-1/2 -translate-y-1/2 z-10"
              :class="themeStore.isDark ? 'text-gray-500' : 'text-gray-400'" />
            <input v-model="searchQuery" @input="handleSearchInput" @focus="showSuggestions = true" @blur="handleBlur"
              type="text" placeholder="Entrez le nom d'une ville..." autocomplete="off"
              class="w-full pl-14 pr-36 py-4 rounded-full text-lg transition-all duration-300 focus:outline-none focus:ring-4"
              :class="themeStore.isDark
                ? 'bg-zinc-800 text-white border-2 border-zinc-700 focus:ring-cyan-500/50 placeholder-gray-500'
                : 'bg-white text-gray-900 border-2 border-white/50 focus:ring-yellow-300/50 placeholder-gray-400'" />
            <button type="submit" :disabled="isSearching"
              class="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 z-10"
              :class="themeStore.isDark
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'">
              <Loader2 v-if="isSearching" :size="16" class="animate-spin" />
              <span>Rechercher</span>
            </button>
          </div>

          <!-- Suggestions -->
          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <div v-if="showSuggestions && filteredCities.length > 0"
              class="absolute z-20 w-full mt-2 rounded-2xl shadow-xl overflow-hidden" :class="themeStore.isDark
                ? 'bg-zinc-800 border border-zinc-700'
                : 'bg-white'">
              <div class="max-h-80 overflow-y-auto">
                <button v-for="(city, index) in filteredCities" :key="index" @mousedown.prevent="selectCity(city)"
                  type="button" class="w-full px-6 py-4 text-left transition-all duration-200 flex items-center gap-3"
                  :class="themeStore.isDark
                    ? 'hover:bg-zinc-700 text-white border-b border-zinc-700 last:border-b-0'
                    : 'hover:bg-gray-50 text-gray-900 border-b border-gray-100 last:border-b-0'">
                  <MapPin :size="20" :class="themeStore.isDark ? 'text-cyan-400' : 'text-blue-600'" />
                  <div class="flex-1">
                    <div class="font-semibold">{{ city.name }}</div>
                    <div class="text-sm" :class="themeStore.isDark ? 'text-gray-400' : 'text-gray-600'">
                      {{ city.region }}, {{ city.country }}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </transition>

          <!-- Error message -->
          <div v-if="searchError" class="mt-4 p-4 rounded-lg flex items-start gap-3" :class="themeStore.isDark
            ? 'bg-red-900/20 border border-red-800 text-red-400'
            : 'bg-red-100 text-red-700'">
            <AlertCircle :size="20" class="flex-shrink-0 mt-0.5" />
            <p class="text-sm">{{ searchError }}</p>
          </div>
        </form>

        <div class="flex flex-wrap justify-center gap-3 pt-4">
          <button v-for="city in popularCities" :key="city" @click="goToCity(city)"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            :class="themeStore.isDark
              ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-700'
              : 'bg-white/30 text-white hover:bg-white/40 backdrop-blur-sm'">
            <MapPin :size="16" />
            {{ city }}
          </button>
        </div>
      </div>

      <div class="mt-16 flex justify-center">
        <RiveAnimation :width="600" :height="400" />
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="pt-10 pb-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4" :class="themeStore.isDark ? 'text-white' : 'text-white'">
          Fonctionnalités
        </h2>
        <p class="text-xl" :class="themeStore.isDark ? 'text-gray-400' : 'text-white/80'">
          Tout ce dont vous avez besoin pour suivre la météo
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index"
          class="p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl" :class="themeStore.isDark
            ? 'bg-zinc-900 border border-zinc-800'
            : 'bg-white/20 backdrop-blur-md'">
          <component :is="feature.icon" :size="48" class="mb-4"
            :class="themeStore.isDark ? 'text-cyan-400' : 'text-white'" />
          <h3 class="text-xl font-semibold mb-2" :class="themeStore.isDark ? 'text-cyan-400' : 'text-white'">
            {{ feature.title }}
          </h3>
          <p :class="themeStore.isDark ? 'text-gray-400' : 'text-white/80'">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Search,
  MapPin,
  Thermometer,
  Wind,
  Zap,
  Loader2,
  AlertCircle
} from 'lucide-vue-next'
import { POPULAR_CITIES, searchCities } from '~/constants/cities'

const themeStore = useThemeStore()
const router = useRouter()

const searchQuery = ref('')
const isSearching = ref(false)
const searchError = ref('')
const showSuggestions = ref(false)
const filteredCities = ref([])

const popularCities = POPULAR_CITIES

const features = [
  {
    icon: Thermometer,
    title: 'Température précise',
    description: 'Obtenez la température exacte en temps réel pour n\'importe quelle ville'
  },
  {
    icon: Wind,
    title: 'Vitesse du vent',
    description: 'Suivez les conditions de vent et planifiez vos activités en conséquence'
  },
  {
    icon: Zap,
    title: 'Mise à jour rapide',
    description: 'Données météo mises à jour toutes les 30 minutes avec cache intelligent'
  }
]

const handleSearchInput = () => {
  searchError.value = ''
  setTimeout(() => {
    filteredCities.value = searchCities(searchQuery.value, 5)
    showSuggestions.value = filteredCities.value.length > 0
  }, 100)
}

const selectCity = (city) => {
  searchQuery.value = city.name
  showSuggestions.value = false
  setTimeout(() => {
    goToCity(city.name)
  }, 200)
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const searchCity = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    searchError.value = 'Veuillez entrer un nom de ville'
    return
  }

  isSearching.value = true
  searchError.value = ''
  showSuggestions.value = false

  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    const encodedCity = encodeURIComponent(query.toLowerCase())
    const response = await $fetch(`/api/weather/${encodedCity}`)

    if (response) {
      router.push(`/weather/${encodedCity}`)
      searchQuery.value = ''
    }
  } catch (error) {
    searchError.value = error.data?.message || 'Ville non trouvée. Essayez une ville de la liste suggérée.'
  } finally {
    isSearching.value = false
  }
}

const goToCity = (city) => {
  const encodedCity = encodeURIComponent(city.toLowerCase())
  searchQuery.value = ''
  searchError.value = ''
  showSuggestions.value = false
  router.push(`/weather/${encodedCity}`)
}

definePageMeta({
  layout: 'default'
})

const config = useRuntimeConfig()

useHead({
  title: 'WeatherApp - Météo en temps réel pour toutes les villes du monde',
  meta: [
    { name: 'description', content: 'Consultez gratuitement la météo en temps réel...' }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.siteUrl}/` }
  ]
})
</script>