import { PropType } from 'vue'

export default {
  x: Number,
  y: Number,
  scale: {
    type: Number,
    default: 1
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