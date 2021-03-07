<template lang="pug">
.wrapper
  .container
    Movable(
      :x="100" 
      :y="200"
      :direction="direction"
      :movable="movable")
      .h2 Box
    Movable(
      :x="40"
      :y="100"
      :direction="direction"
      :movable="movable")
      .h2 Box2
    .h2(@click="onClick") test
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Movable from './components/movable/Movable.vue'

export default defineComponent({
  name: 'App',
  components: {
    Movable
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