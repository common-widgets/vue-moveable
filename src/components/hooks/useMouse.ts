import { ref, onMounted, onUnmounted, watch } from 'vue'

export const useMousePosition = () => {
  let callback
  const x = ref(0)
  const y = ref(0)

  const move = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
    if (callback) {
      callback(e, x, y)
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', move)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', move)
  })

  function onMouseMove(cb) {
    callback = cb
  }

  return {
    x, y, onMouseMove
  }
}

export const useMouseMove = (tx, ty, movable: Ref) => {
  const { x, y, onMouseMove } = useMousePosition()
  const moveData = { x: 0, y: 0, moving: false }

  const cx = ref(tx)
  const cy = ref(ty)

  watch(movable, () => mouseUp())

  function mouseDown (e: MouseEvent) {
    moveData.moving = true
    moveData.x = x.value - cx.value
    moveData.y = y.value - cy.value
  }
  function mouseUp(e: MouseEvent) {
    moveData.moving = false
  }
  onMouseMove(() => {
    if (!moveData.moving || !movable.value) return
    cx.value = x.value - moveData.x
    cy.value = y.value - moveData.y
  })

  return { x: cx, y: cy, mouseDown, mouseUp }
}