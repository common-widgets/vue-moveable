<template lang="pug">
.movable-container(
  ref="container"
  :style="style")
  .resize-wrapper(v-if="resizable")
    ResizeHand(direction="nw" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="n" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="ne" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="e" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="se" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="s" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="sw" :width="width" :height="height" @resize="handResize" :scale="scale")
    ResizeHand(direction="w" :width="width" :height="height" @resize="handResize" :scale="scale")
  .movable-wrapper
    slot

</template>

<script lang="ts">
import { ref, defineComponent, computed, watch, watchEffect } from 'vue'
import Props from './props'
import { useMouseMove } from '../hooks/useMouse'
import { useCount, getMaxCount } from '../hooks/useCount'
import ResizeHand from './ResizeHand.vue'

export default defineComponent({
  name: 'VueMovable',
  components: { ResizeHand },
  props: Props,
  emits: ['resize', 'move'],
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

    const container = ref(null)

    const { x, y } = useMouseMove(
      container,
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
    watch(() => props.x, () => {
      if (!movable.value) return
      x.value = props.x
    })
    watch(() => props.y, () => {
      if (!movable.value) return
      y.value = props.y
    })
    watch(() => props.width, () => {
      if (!resizable.value) return
      width.value = props.width
    })
    watch(() => props.height, () => {
      if (!resizable.value) return
      height.value = props.height
    })
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
      container,
      style,
      scale,
      resizable,
      width, height,
      handResize
    }
  }
})
</script>

<style scoped lang="stylus">
.resize-wrapper
  z-index 1000
.movable-container
  cursor pointer
  position absolute
  left 0
  top 0
  width auto
  height auto
  touch-action: pan-x
  box-shadow: 0 0 1px rgb(0,0,0,.3)
.movable-wrapper
  user-select none
  width 100%
  height 100%
</style>
