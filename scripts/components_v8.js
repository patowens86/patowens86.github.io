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
AFRAME.registerComponent('photo-mode', {
  schema: {
    name: {type: 'string'},
  },
  init: function() {
    const container = document.getElementById('photoModeContainer')
    const image = document.getElementById('photoModeImage')
    const shutterButton = document.getElementById('shutterButton')
    const closeButton = document.getElementById('closeButton')
    const shareButton = document.getElementById('shareButton')
    const canvas = document.querySelector('.a-canvas')
    const replayButton = document.getElementById('replayButton')
    const audioButton = document.getElementById('audioIconContainer')
    const shareBlurb = document.getElementById('shareBlurb')
    const shareBlurbAlt = document.getElementById('shareBlurbAlt')
    //const overlay = document.getElementById('photoOverlay')
    
    let shareFile
    let imageUrl
    
    // Container starts hidden so it isn't visible when the page is still loading
    //shutterButton.hidden = true
    
    container.style.display = 'block'
    closeButton.addEventListener('click', () => {
      container.classList.remove('photo')
      container.classList.remove('share')
      canvas.classList.remove('blur')
      audioButton.style.display = 'block'
      //overlay.setAttribute('visible', false)
      setTimeout(() => {
      // Tell the restart-camera script to stop watching for issues
        window.dispatchEvent(new Event('ensurecameraend'))
      }, 1000)
    })
    shutterButton.addEventListener('click', () => {
      console.log("Shutter button clicked")
      //overlay.setAttribute('visible', true)
      // Emit a screenshotrequest to the xrweb component
      this.el.sceneEl.emit('screenshotrequest')
      // Show the flash while the image is being taken
      container.classList.add('flash')

    })
    //return a promise that resolves with a File instance
    function urlToFile(url, filename, mimeType){
      mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
      return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
      );
    }
    replayButton.addEventListener('click', () => {
      location.reload()
    })
//    shareButton.addEventListener('click', () => {
//      // urlToFile(image.src, 'Happy-Eid.jpg').then(res => {
//      //   navigator.share({
//      //     title: 'Happy Eid',
//      //     text: 'Happy Eid!',
//      //     files: [res]
//      //   }).then(() => console.log('Shared successfully'))
//      // })
//      navigator.share({
//        title: 'Happy Eid',
//        files: [shareFile]
//      })
//    })
    
    shareButton.addEventListener('click', () => {
      
      if (navigator.canShare && navigator.canShare({files :[shareFile]} )) {
        navigator.share({
          files: [shareFile],
          title: 'Happy Eid!',
          text: 'Happy Eid from sixtytwo.co!',
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        shareBlurbAlt.style.display = 'block'
        shareBlurb.hidden = true
        shareButton.hidden = true
        replayButton.classList.add('solo')
        console.log(`Your browser doesn't support one tap share. Long-press the picture to share it.`);
      }s
    })
    
    this.el.sceneEl.addEventListener('screenshotready', e => {
      // Hide the flash
      container.classList.remove('flash')
      // If an error occurs while trying to take the screenshot, e.detail will be empty.
      // We could either retry or return control to the user
      if (!e.detail) {
        return
      }
      // e.detail is the base64 representation of the JPEG screenshot
      var basestr = 'data:image/jpeg;base64,' + e.detail
      urlToFile(basestr, 'Merry-Christmas.jpg')
        .then(res => {
          shareFile = res
          imageUrl = URL.createObjectURL(res)
        }).then(() => {
          image.src = imageUrl
        })
        
      
      // Show the photo
      container.classList.add('photo')
      canvas.classList.add('blur')
      audioButton.style.display = 'none'
      
      // Tell the restart-camera script to start watching for issues
      window.dispatchEvent(new Event('ensurecamerastart'))
    })

  }
})