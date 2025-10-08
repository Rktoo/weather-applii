<template>
    <div class="min-h-screen transition-colors duration-500 pt-4"
        :class="themeStore.isDark ? 'bg-zinc-950' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'"
        :style="themeStore.isDark
            ? 'background-image: url(/background.png); background-color: #09090b;'
            : ''">

        <header class="sticky top-0 z-50 backdrop-blur-md ">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4 px-6 rounded-full" :class="themeStore.isDark
                    ? 'bg-zinc-900/80 border border-zinc-800'
                    : 'bg-white/20'">

                    <NuxtLink to="/" class="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                        :class="themeStore.isDark ? 'text-gray-300 hover:text-white' : 'text-white'">
                        <ArrowLeft :size="20" />
                        <span class="font-medium">Retour</span>
                    </NuxtLink>

                    <ThemeSwitcher />
                </div>
            </div>
        </header>

        <!-- Contenu de la page météo -->
        <slot />
    </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'

const themeStore = useThemeStore()
</script>