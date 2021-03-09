<template lang="pug">
.wrapper
  .container(:style="style")
    .h2(@click="onClick") test

    .input-field
      .label x:
      input(v-model.number="x")
    .input-field
      .label y:
      input(v-model.number="y")
    .input-field
      .label w:
      input(v-model.number="width")
    .input-field
      .label h:
      input(v-model.number="height")

    Movable(
      :x="x" 
      :y="y"
      :width="width"
      :height="height"
      :direction="direction"
      :movable="movable"
      :scale="scale"
      :resizable="resizable"
      @click="e => e.stopPropagation()"
      @move="onMove"
      @resize="onResize")
      .h2 Box
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import Movable from './components/movable/Movable.vue'
import MovableT from 'vue-movable-v3/vue-movable-v3.es.js'
import 'vue-movable-v3/style.css'

export default defineComponent({
  name: 'App',
  components: {
    Movable, MovableT
  },
  setup() {
    const movable = ref(true)
    const scale = ref(1)
    const resizable = ref(true)
    const direction = ref('auto')
    const x = ref(230)
    const y = ref(230)
    const width = ref(400)
    const height = ref(200)

    const onClick = () => {
      x.value += 10
      movable.value = false
    }
    const style = computed(() => {
      return {
        transform: `scale(${scale.value})`
      }
    })

    onMounted(() => {
      document.addEventListener('click', () => {
        resizable.value = false
      })
    })

    function onMove(mx, my) {
      x.value = mx.value
      y.value = my.value
    }
    function onResize(w, h) {
      width.value = w.value
      height.value = h.value
    }

    return {
      x, y, width, height,
      style,
      scale,
      movable,
      resizable,
      direction,
      onClick,
      onMove,
      onResize
    }
  }
})
</script>

<style lang="stylus">
#app
  height 100%

.container
  padding 20px
  position relative
  left 100px
  top 100px
  width 800px
  height 500px
  overflow auto
  border 1px solid teal
</style>