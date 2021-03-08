<template lang="pug">
.movable-container(
  :style="style"
  @pointerdown="mouseDown"
  @pointerup="onMouseUp"
  @pointerleave="onMouseUp")
  .resize-wrapper(v-if="resizable")
    ResizeHand(direction="nw" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="n" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="ne" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="e" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="se" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="s" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="sw" :width="width" :height="height" @resize="handResize")
    ResizeHand(direction="w" :width="width" :height="height" @resize="handResize")
  .movable-wrapper
    slot

</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive, watchEffect } from 'vue'
import Props, { Direction } from './props'
import { useMouseMove } from '../hooks/useMouse'
import { useCount, getMaxCount } from '../hooks/useCount'
import ResizeHand from './ResizeHand.vue'

export default defineComponent({
  name: 'VueMovable',
  components: { ResizeHand },
  props: Props,
  emits: ['resize'],
  setup: (props, { emit }) => {
    const movable = ref(props.movable)
    const scale = ref(props.scale)
    const direction = ref(props.direction)
    const resizable = ref(props.resizable)
    const width = ref(props.width)
    const height = ref(props.height)

    const defaultZIndex = useCount()
    const zIndex = ref(defaultZIndex)
    const opacity = ref(1)

    const { x, y, mouseDown, mouseUp, onMoving, onMoveEnd } = useMouseMove(
      props.x, props.y,
      scale, movable,
      direction)

    const style = computed(() => {
      return {
        opacity: opacity.value,
        zIndex: zIndex.value,
        width: width.value + 'px',
        height: height.value + 'px',
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
      resizable.value = props.resizable
      scale.value = props.scale
      movable.value = props.movable
      direction.value = props.direction
    })
    function handResize({ width: w, height: h }) {
      width.value = w
      height.value = h
      emit('resize', width, height)
    }
    return {
      style,
      resizable,
      width, height,
      mouseDown, onMouseUp, handResize
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
  width 100%
  height 100%
</style>
