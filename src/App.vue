<template lang="pug">
Moveable(
  :x="100" 
  :y="200")
  .h2 Box
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Moveable from './components/moveable/Moveable.vue'

export default defineComponent({
  name: 'App',
  components: {
    Moveable
  },
  setup() {
    const test = ref(true)
    function onClick () {
      test.value = false
    }
    return {
      test,
      onClick
    }
  }
})
</script>

<style lang="stylus">
#app
  height 100%
</style>