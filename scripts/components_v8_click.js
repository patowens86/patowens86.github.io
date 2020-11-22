


AFRAME.registerComponent('start-animation', {
  schema: {
    name: {type: 'string'},
    sound_id: {type: 'string'}
  },
  init: function () {
    var el = this.el;
    var model = document.getElementById(this.data.name)
    var isActive = false

    el.addEventListener('click', (e) => {
       if (!isActive) {
        model.setAttribute('visible', true)
        isActive=true 
       }
       else {
        model.setAttribute('visible', false) 
        isActive=false
       }
    })
  }
});

