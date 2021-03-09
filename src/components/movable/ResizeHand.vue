<template lang="pug">
.resize-handle(
  :data-direction="direction" 
  :style="style"
  @pointerdown="onMouseDown"
  @pointerup="onMouseUp"
  @pointerleave="onMouseUp")
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useMouseMove } from '../hooks/useMouse'

export default defineComponent({
  props: {
    scale: {
      type: Number,
      default: 1
    },
    direction: String,
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  emits: ['resize'],
  setup(props, { emit }) {
    const { x, y, mouseDown, mouseUp, onMoving, onMoveEnd } = useMouseMove(
      0, 0,
      ref(props.scale), ref(true),
      props.direction, true)

    const style = computed(() => { 
      return { transform: `scale(${1/props.scale})` }
    })

    let cacheData = {
      width: 0,
      height: 0
    }
    
    onMoving(() => {
      let width = cacheData.width
      let height = cacheData.height
      if (['w', 'e'].includes(props.direction)) {
        width += x.value
      } else if (['s', 'n'].includes(props.direction)) {
        height += y.value
      } else if (['se', 'ne'].includes(props.direction)) {
        const val = Math.min(x.value/width, y.value/height) + 1
        width *= val
        height *= val
      }
      emit('resize', {
        x, y, direction: props.direction,
        width, height
      })
    })
    function onMouseDown(e: MouseEvent) {
      mouseDown(e)
      cacheData = {
        width: props.width,
        height: props.height
      }
    }
    function onMouseUp(e: MouseEvent) {
      mouseUp(e)
      x.value = 0
      y.value = 0
    }

    return {
      direction: props.direction,
      style,
      onMouseDown, onMouseUp
    }
  }
})
</script>

<style lang="stylus" scoped>
.resize-handle
  position absolute
  width 8px
  height @width
  left 0
  top @left
  margin-left -(@width / 2)
  margin-top @margin-left
  background #fff
  box-shadow: 0 0 0px 2px #018d4c
  // border 1px solid #03b0b0
  &[data-direction="e"]
    cursor e-resize
    left 100%
    top 50%
  &[data-direction="n"]
    cursor n-resize
    left 50%
  &[data-direction="w"]
    cursor w-resize
    top 50%
  &[data-direction="s"]
    cursor s-resize
    left 50%
    top 100%
  &[data-direction="ne"]
    cursor ne-resize
    left 100%
  &[data-direction="nw"]
    cursor nw-resize
  &[data-direction="se"]
    cursor se-resize
    left 100%
    top 100%
  &[data-direction="sw"]
    cursor sw-resize
    top 100%
</style>
