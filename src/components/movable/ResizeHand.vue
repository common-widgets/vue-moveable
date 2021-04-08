<template lang="pug">
.resize-handle(
  ref="container"
  :data-direction="direction" 
  :style="style")
</template>

<script lang="ts" setup>
import { computed, ref, watch, defineProps, defineEmit } from 'vue'
import { useMouseMove } from '../hooks/useMouse'

const props = defineProps({
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
})
const emit = defineEmit(['resize'])
const container = ref(null)
const { x, y, moving } = useMouseMove(
  container,
  0, 0,
  ref(props.scale), ref(true),
  ref(props.direction), true)

const style = computed(() => { 
  return { transform: `scale(${1/props.scale})` }
})

let cacheData = {
  width: props.width,
  height: props.height
}

watch([moving], () => {
  if (moving.value) {
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
  } else {
    cacheData = {
      width: props.width,
      height: props.height
    }
    x.value = 0
    y.value = 0
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
