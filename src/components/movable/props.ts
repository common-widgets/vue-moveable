import { PropType } from 'vue'

export default {
  x: Number,
  y: Number,
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  scale: {
    type: Number,
    default: 1
  },

  direction: {
    type: String,
    default: 'auto'
  },
  movable: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  throttleDrag: {
    type: Number,
    default: 0
  },
  resizable: {
    type: Boolean,
    default: false
  },
  throttleResize: {
    type: Number,
    default: 0
  },
  rotatable: {
    type: Boolean,
    default: false
  },
  throttleRotate: {
    type: Number,
    default: 0
  }
}