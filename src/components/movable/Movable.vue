<template lang="pug">
.movable-container(
  :style=`{
    transform: translate
  }`
  @pointerdown="mouseDown"
  @pointerup="mouseUp")
  .movable-wrapper
    slot

</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive, watchEffect } from 'vue'
import Props from './props'
import { useMouseMove } from '../hooks/useMouse'

export default defineComponent({
  name: 'VueMovable',
  props: Props,
  setup: (props) => {
    const movable = ref(props.movable)
    const { x, y, mouseDown, mouseUp } = useMouseMove(props.x, props.y, movable)

    const translate = computed(() => {
      return `translate3d(${x.value}px, ${y.value}px, 0)`
    })
    watchEffect(() => {
      movable.value = props.movable
    })
    return { 
      translate,
      mouseDown, mouseUp
    }
  }
})
</script>

<style scoped lang="stylus">
.movable-container
  position absolute
  left 0
  top 0
  width auto
  height auto
.movable-wrapper
  cursor pointer
  user-select none
  border 1px solid teal
</style>
