


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
      console.log("Click registered")
       if (!isActive) {
        model.setAttribute('visible', true)
        isActive=true 
              console.log("Model visible")
       }
       else {
        model.setAttribute('visible', false) 
        isActive=false
                      console.log("Model not visible")
       }
    })
  }
});

