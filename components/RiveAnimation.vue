<template>
  <div ref="canvasContainer" class="rive-container">
    <canvas 
      ref="canvas" 
      :width="width" 
      :height="height"
      :style="{ width: `${width}px`, height: `${height}px` }"
    ></canvas>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '/rive/hero_bot.riv' 
  },
  width: {
    type: Number,
    default: 800  
  },
  height: {
    type: Number,
    default: 800  
  },
  autoplay: {
    type: Boolean,
    default: true
  }
})

const canvas = ref(null)
const canvasContainer = ref(null)
let riveInstance = null

onMounted(async () => {
  // Import dynamique pour éviter les erreurs SSR
  const { Rive } = await import('@rive-app/canvas')
  
  if (canvas.value) {
    try {
      riveInstance = new Rive({
        src: props.src,
        canvas: canvas.value,
        autoplay: props.autoplay,
        stateMachines: 'base_anim',
        fit: 'cover',
        alignment: 'center',
        onLoad: () => {
          if (riveInstance) {
            riveInstance.resizeDrawingSurfaceToCanvas()
          }
        },
        onLoadError: (error) => {
          console.error('Error loading Rive animation:', error)
        }
      })
    } catch (error) {
      console.error('Error initializing Rive:', error)
    }
  }
})

onBeforeUnmount(() => {
  if (riveInstance) {
    riveInstance.cleanup()
    riveInstance = null
  }
})
</script>

<style scoped>
.rive-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  display: block;
}
</style>