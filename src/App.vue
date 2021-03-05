<template lang="pug">
.wrapper
  Movable(
    :x="100" 
    :y="200"
    :movable="movable")
    .h2 Box
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
    const onClick = () => {
      movable.value = !movable.value
    }
    return {
      movable,
      onClick
    }
  }
})
</script>

<style lang="stylus">
#app
  height 100%
</style>