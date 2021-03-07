<template lang="pug">
.movable-container(
  :style="style"
  @pointerdown="mouseDown"
  @pointerup="onMouseUp")
  .movable-wrapper
    slot

</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive, watchEffect } from 'vue'
import Props, { Direction } from './props'
import { useMouseMove } from '../hooks/useMouse'
import { useCount, getMaxCount } from '../hooks/useCount'

export default defineComponent({
  name: 'VueMovable',
  props: Props,
  setup: (props) => {
    const movable = ref(props.movable)
    const direction = ref(props.direction)
    const defaultZIndex = useCount()
    const zIndex = ref(defaultZIndex)
    const opacity = ref(1)

    const { x, y, mouseDown, mouseUp, onMoving, onMoveEnd } = useMouseMove(props.x, props.y, movable, direction)

    const style = computed(() => {
      return {
        opacity: opacity.value,
        zIndex: zIndex.value,
        width: props.width + 'px',
        height: props.height + 'px',
        transform: `translate3d(${x.value}px, ${y.value}px, 0)`
      }
    })
    onMoving(() => {
      opacity.value = 0.5
      zIndex.value = getMaxCount(1)
    })
    function onMouseUp(e: MouseEvent) {
      mouseUp()
      opacity.value = 1
      zIndex.value = defaultZIndex
    }
    watchEffect(() => {
      movable.value = props.movable
      direction.value = props.direction
    })
    return {
      style,
      mouseDown, onMouseUp
    }
  }
})
</script>

<style scoped lang="stylus">
.movable-container
  cursor pointer
  position absolute
  left 0
  top 0
  width auto
  height auto
  touch-action: pan-x
  border 1px solid teal
.movable-wrapper
  user-select none
</style>
