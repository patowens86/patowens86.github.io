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
      console.log(this.el.name + " is not visible = " + this.el.getAttribute('visible'))
      model.setAttribute('visible', true)
      console.log(this.data.name + " is visible")
    });
  }
});

AFRAME.registerComponent('toggle-audio', {
  schema: {
    name: {type: 'string'},
  },
  init: function () {

    const audioButton = document.getElementById('audioIconContainer')
//    const launchButton = document.getElementById('launchButton')
    const audio = document.getElementById('song')
    const audioToggleIcon = document.getElementById('audioIcon')
    const scene = document.querySelector('a-scene')
    
    console.log("toggleAudio is ready")

    
    audioButton.style.display = 'block'
    console.log("Audio button's display set to block? = " + audioButton.style.display)
    
    let isPlaying = false
    let hasAudioStarted = false
    const toggleAudio = () => {
      if (isPlaying === true) {
        audioToggleIcon.classList.remove('audioOn')
        audioToggleIcon.classList.add('audioOff')
        var sounds = document.getElementsByTagName('a-sound')
        for(i=0; i<sounds.length; i++) {
          sounds[i].setAttribute('volume', 0)
        }
        console.log(sounds[i] + " volume set to 0")
        isPlaying = false
      }
      else {
        audioToggleIcon.classList.remove('audioOff')
        audioToggleIcon.classList.add('audioOn')
        var sounds = document.getElementsByTagName('a-sound')
        for(i=0; i<sounds.length; i++) {
          sounds[i].setAttribute('volume', 0.5)
        }
        console.log(sounds[i] + " volume set to 0.5")

        isPlaying = true
      }
    }
    
//    const startFireworksAudio = () => {
//        audioToggleIcon.classList.remove('audioOff')
//        audioToggleIcon.classList.add('audioOn')
//        audio.components.sound.playSound();
//        isPlaying = true
//    }
    
    const startAudio = () => {
      if (hasAudioStarted === false) {
        audioToggleIcon.classList.remove('audioOff')
        audioToggleIcon.classList.add('audioOn')
        audio.components.sound.playSound();
        isPlaying = true
        hasAudioStarted = true
      }
    }
    
    audioButton.addEventListener("click", toggleAudio);
    //audioButton.addEventListener("click", toggleAudio);
//    launchButton.onclick = startFireworksAudio
    //scene.onclick = startAudio
  }
});


/*
AFRAME.registerComponent('audio-toggle', {
  schema: {
    name: {type: 'string'},
  },
  init: function () {
    const audioToggleIcon = document.getElementById('audioIcon')
    audioToggleIcon.addEventListener('click', (e) => {
      var sounds = document.getElementsByTagName('a-sound')
      for(i=0; i<sounds.length; i++) {
        sounds[i].setAttribute('volume', 0)
        console.log(sounds[i] + " volume set to 0")
      }
    });
  }
});*/