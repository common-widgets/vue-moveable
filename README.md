# vue-movable-v3

Movable box based on vue 3

## install
```shell
npm install vue-movable-v3 --save
```

## usage

```pug

Movable(
  :x="x" 
  :y="y"
  :width="width"
  :height="height"
  :direction="direction"
  :movable="movable"
  :scale="scale"
  :resizable="resizable"
  @move="onMove"
  @resize="onResize")
  .h2 Child elements

```

```js
import Movable from "vue-movable-v3";

export default defineComponent({
  components: {
    Movable
  },
  setup() {
    const x = ref(100)
    const y = ref(100)
    const width = ref(100)
    const height = ref(100)
    const movable = ref(true)
    const resizable = ref(true)

    function onMove(mx, my) {
      x.value = mx.value
      y.value = my.value
    }
    function onResize(w, h) {
      width.value = w.value
      height.value = h.value
    }

    return {
      x, y,
      width,
      height,
      direction: 'x',
      movable,
      resizable

      onMove,
      onResize
    }
  }
}
```
