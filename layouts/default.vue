<template>
  <div class="min-h-screen transition-colors duration-500 bg-cover bg-center bg-no-repeat pt-4"
       :class="themeStore.isDark ? 'bg-zinc-950' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'"
       :style="themeStore.isDark 
         ? 'background-image: url(/background.png); background-color: #09090b;' 
         : ''">
    
    <header class="sticky top-0 z-50 backdrop-blur-md">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 px-6 rounded-full"
             :class="themeStore.isDark 
               ? 'bg-zinc-900/80 border border-zinc-800' 
               : 'bg-white/20'">
          
          <NuxtLink
            to="/"
            class="flex items-center space-x-4 transition-all duration-300 hover:scale-105">
            <CloudSun :size="32" :class="themeStore.isDark ? 'text-cyan-400' : 'text-white'" />
            <div class="text-2xl font-bold"
                 :class="themeStore.isDark ? 'text-cyan-400' : 'text-white'">
              WeatherApp
            </div>
          </NuxtLink>
          
          <div class="flex items-center space-x-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu de la page -->
    <slot />
  </div>
</template>

<script setup>
import { CloudSun } from 'lucide-vue-next'

const themeStore = useThemeStore()
</script>