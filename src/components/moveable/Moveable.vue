<template lang="pug">
.moveable-container(
  :style=`{
    transform: translate
  }`
  @pointerdown="mouseDown"
  @pointerup="mouseUp")
  .moveable-wrapper
    slot

</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive } from 'vue'
import Props from './props'
import { useMouseMove } from '../hooks/useMouse'

export default defineComponent({
  name: 'VueMoveable',
  props: Props,
  setup: (props: Props) => {
    const { x, y, mouseDown, mouseUp } = useMouseMove(props.x, props.y)
    const translate = computed(() => {
      return `translate3d(${x.value}px, ${y.value}px, 0)`
    })
    return { 
      translate,
      mouseDown, mouseUp
    }
  }
})
</script>

<style scoped lang="stylus">
.moveable-container
  position absolute
  left 0
  top 0
  width auto
  height auto
.moveable-wrapper
  cursor pointer
  user-select none
  border 1px solid teal
</style>
