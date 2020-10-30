Presents

Schema:
time float
secondaryevent bool

- Tap event
- Disappears on tap
- Adds new model on tap
- New model plays on tap
- When finished, present appears
- When finished, model disappears
- If another present is tapped, finish
- If time runs out, finish


States:
Present state
Playing animation state

variables:
playing
sceneModel
animationLength

const targetPresentComponent = {
  schema: {
    model: {type: 'string'},
    time: {type: 'float'},
    secondaryevent: {type: 'bool'}
  },
  init() {
    const {object3D} = this.el
    const {name} = this.data
    object3D.visible = false
    const v = document.querySelector(this.data.model)
    const p = this.data.thumb && document.querySelector(this.data.thumb)
    const {el} = this
    el.setAttribute('material', 'src', p || v)
    el.setAttribute('class', 'cantap')
    let playing = false
    el.addEventListener('click', () => {
      if (!playing) {
        el.setAttribute('material', 'src', v)
        v.play()
        playing = true
      } else if (this.data.canstop) {
        el.setAttribute('material', 'src', p || v)
        v.pause()
        playing = false
      }
    })
    const showImage = ({detail}) => {
      if (name !== detail.name) {
        return
      }
      v.play()
      object3D.position.copy(detail.position)
      object3D.quaternion.copy(detail.rotation)
      object3D.scale.set(detail.scale, detail.scale, detail.scale)
      object3D.visible = true
    }
    const hideImage = ({detail}) => {
      if (name !== detail.name) {
        return
      }
      v.pause()
      object3D.visible = false
    }
    this.el.sceneEl.addEventListener('xrimagefound', showImage)
    this.el.sceneEl.addEventListener('xrimageupdated', showImage)
    this.el.sceneEl.addEventListener('xrimagelost', hideImage)
  },
}
export {targetmodelComponent}