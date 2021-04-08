import { Ref, ref, onMounted, onUnmounted, watch } from 'vue'

export const useMousePosition = (scale: Ref<number>) => {
  const moving = ref(false)
  const x = ref(0)
  const y = ref(0)

  const move = (e: MouseEvent) => {
    x.value = e.pageX / scale.value
    y.value = e.pageY / scale.value
    moving.value = true
  }

  onMounted(() => {
    window.addEventListener('mousemove', move)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', move)
  })

  return {
    x, y, moving
  }
}

export const useMouseMove = (
  el: Ref<HTMLElement>,
  tx, ty, scale: Ref, movable: Ref, direction: Ref<string>, stopPropagation = false
  ) => {
  const { x, y } = useMousePosition(scale)
  const moving = ref(false)
  const moveData = { x: 0, y: 0 }

  const cx = ref(tx)
  const cy = ref(ty)
  const onMovingCallback = ref(null)

  watch(movable, () => pointerUp())

  onMounted(() => {
    el.value?.addEventListener("pointerdown", pointerDown)
    el.value?.addEventListener("pointermove", pointerMove)
    el.value?.addEventListener("pointerup", pointerUp)
  })
  onUnmounted(() => {
    el.value?.removeEventListener("pointerdown", pointerDown)
    el.value?.removeEventListener("pointermove", pointerMove)
    el.value?.removeEventListener("pointerup", pointerUp)
  })

  function pointerDown(e: PointerEvent) {
    const target = e?.target as HTMLElement
    target?.setPointerCapture(e.pointerId)
    if (e && stopPropagation) {
      e.stopPropagation();
    }
    moving.value = true
    moveData.x = x.value - cx.value
    moveData.y = y.value - cy.value
  } 
  function pointerMove(e: PointerEvent) {
    if (!moving.value) return

    onMovingCallback.value && onMovingCallback.value()

    if (direction.value === 'x') {
      cx.value = x.value - moveData.x
    } else if (direction.value === 'y') {
      cy.value = y.value - moveData.y
    } else {
      cx.value = x.value - moveData.x
      cy.value = y.value - moveData.y
    }
  } 
  function pointerUp(e?: PointerEvent) {
    const target = e?.target as HTMLElement
    target?.releasePointerCapture(e.pointerId)
    if (e && stopPropagation) {
      e.stopPropagation();
    }
    moving.value = false
  } 

  return { x: cx, y: cy, moving }
}