<template lang="pug">
.wrapper
  .container
    .h2(@click="onClick") test

    Movable(
      :x="50" 
      :y="50"
      :width="200"
      :direction="direction"
      :movable="movable")
      .h2 Box

    MovableT(
      :x="40"
      :y="100"
      :width="100"
      :direction="direction"
      :movable="movable")
      .h2 Box2
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const direction = ref('auto')
    const onClick = () => {
      direction.value = direction.value === 'x' ? 'y' : 'x'
    }
    return {
      movable,
      direction,
      onClick
    }
  }
})
</script>

<style lang="stylus">
#app
  height 100%

.container
  position relative
  width 400px
  height 300px
  overflow auto
  border 1px solid teal
</style>