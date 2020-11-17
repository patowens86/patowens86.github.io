/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

AFRAME.registerComponent('navigate-on-click', {
  schema: {
    url: {
      default: ''
    }
  },
  init: function () {
    console.log("hello")
    console.log(this.el)
    var data = this.data;
    var el = this.el;
    el.addEventListener('click', function () {
      //window.location.href = data.url;
      window.open(data.url, '_blank');
    });
  }
});

AFRAME.registerComponent('color-randomizer', {
  init: function () {
    let colors = ["red", "green", "blue", "black", "orange", "white"]
    var el = this.el;
    el.addEventListener('click', (e) => {     
      this.el.setAttribute('color', colors[Math.floor(Math.random() * colors.length)])
    });
  }
});

AFRAME.registerComponent('start-animation', {
  schema: {
    name: {type: 'string'},
  },
  init: function () {
    var el = this.el;
    var model = document.getElementById(this.data.name)
    var giftArray = document.getElementsByClassName("gift")
    var sceneArray = document.getElementsByClassName("scene")


    el.addEventListener('click', (e) => {
      for (const scene of sceneArray) {
        console.log("Scene " + scene)
        scene.setAttribute('visible', false)
      }
      for (const gift of giftArray) {
        console.log("Gift " + gift)
        gift.setAttribute('visible', true)
      }     
      this.el.setAttribute('visible', false)
      console.log(this.el.name + " is not visible")
      model.setAttribute('visible', true)
      console.log(this.data.name + " is visible")

    });
  }
});