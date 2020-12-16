

AFRAME.registerComponent('photo-mode', {
  schema: {
    name: {type: 'string'},
    selfieMode: {default: false}
  },
  init: function() {
    var el = this.el
    const container = document.getElementById('photoModeContainer')
    const image = document.getElementById('photoModeImage')
    const shutterButton = document.getElementById('shutterButton')
    const closeButton = document.getElementById('closeButton')
    const shareButton = document.getElementById('shareButton')
    const canvas = document.querySelector('.a-canvas')
    const retakeButton = document.getElementById('retakeButton')
    const audioButton = document.getElementById('audioIconContainer')
    const shareBlurb = document.getElementById('shareBlurb')
    const shareBlurbAlt = document.getElementById('shareBlurbAlt')
    const keepContainer = document.getElementsByClassName('xdis')[0]
    const keepButton = document.getElementById('keepButton')
    const discardButton = document.getElementById('discardButton')
    const photoFrame = document.getElementById('selfieContainer')
    // let selfieMode = false
    // var photoHasBeenTaken = false;
    //var selfieMode = this.data.selfieMode
    //const overlay = document.getElementById('photoOverlay')
    
    let shareFile
    let imageUrl



    $('.flash').hide()
    
    // Container starts hidden so it isn't visible when the page is still loading
    shutterButton.hidden = false
    closeButton.hidden = true
/*    canvas.addEventListener('click', () => {
      console.log("tapped")
    })*/
    container.style.display = 'block'


    discardButton.addEventListener('click', () => {
      container.classList.remove('photo')
      container.classList.remove('share')
      canvas.classList.remove('blur')
      photoFrame.style.display = 'none'
      // audioButton.style.display = 'block'
      keepContainer.style.display = 'none'

      //overlay.setAttribute('visible', false)
      setTimeout(() => {

        window.dispatchEvent(new Event('ensurecameraend'))
      }, 1000)
      photoHasBeenTaken = false
            closeButton.removeEventListener('click', promptKeep)
    })

    function promptKeep() {
        if (photoHasBeenTaken == true) {
        keepContainer.style.display='block'
      
        setTimeout(() => {

          window.dispatchEvent(new Event('ensurecameraend'))
        }, 1000)
        photoHasBeenTaken = false
      }
    }

    

    keepButton.addEventListener('click', () => {
      keepContainer.style.display = 'none'
      photoHasBeenTaken = true
    })

    //return a promise that resolves with a File instance
    function urlToFile(url, filename, mimeType){
      mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
      return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
      );
    }
    retakeButton.addEventListener('click', () => {
      container.classList.remove('photo')
      if(el.getAttribute('selfieMode') == "true")
        {
          photoFrame.style.display = "block"

        }
      closeButton.removeEventListener('click', promptKeep)
      container.classList.remove('share')
      canvas.classList.remove('blur')
      // audioButton.style.display = 'block'

      //overlay.setAttribute('visible', false)
      setTimeout(() => {
      // Tell the restart-camera script to stop watching for issues
        window.dispatchEvent(new Event('ensurecameraend'))
      }, 1000)
    })

    
    function resizeCanvas(origCanvas, width, height) {
        let resizedCanvas = document.createElement("canvas");
        let resizedContext = resizedCanvas.getContext("2d");
     
        resizedCanvas.height = height;
        resizedCanvas.width = width;
     
        resizedContext.drawImage(origCanvas, 0, 0, width, height);
        return resizedCanvas.toDataURL();
    }
     
    document.getElementById("shutterButton").addEventListener("click", function() {

        //console.log("clicking shutter button at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        $('.flash').show().animate({opacity: 1}, 300) 
        closeButton.addEventListener('click', promptKeep)
        let sceneHeight = $(window).height()
        let sceneWidth = $(window).width()
        console.log(sceneHeight)
        console.log(sceneWidth)
        // let sceneHeightHalf = sceneHeight/2
        // let sceneWidthHalf = sceneWidth/2
              // Show the photo
              container.classList.add('photo')
              canvas.classList.add('blur')
              // audioButton.style.display = 'none'
              photoFrame.style.display = 'none'

        //console.log("getting canvas screenshot at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        let scene = document.querySelector("a-scene")
            var video = document.getElementById('arjs-video')

    scene.setAttribute('arjs', 'sourceWidth: 640; sourceHeight: 360; displayWidth: video.videoWidth; displayHeight: video.videoHeight')
    console.log(scene.getAttribute('arjs'))
        scene.setAttribute('screenshot', {
          width: sceneWidth * 3,
          height: sceneHeight * 3
        })
        console.log(scene.components.screenshot.height + ' ' + scene.components.screenshot.width)
        let aScene = scene.components.screenshot.getCanvas("perspective");
        console.log("ascene height: " + aScene.height)
        console.log("ascene width: " + aScene.width)
        aSceneWidth = aScene.width;
        aSceneHeight = aScene.height;
        let aSceneOrig = document.querySelector("a-canvas")
        //let santaSelfie = document.getElementById("santaSelfie")
        // let actualFrameHeight = 0
        //console.log("capturing video frame at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        let frame = captureVideoFrame("video", "jpeg");
        let selfieContainer = document.getElementById('selfieContainer')




        console.log("window height: " + sceneHeight)
        console.log("window width: " + sceneWidth)
        console.log("frame height: " + frame.height)
        console.log("frame width: " + frame.width)
        // console.log("frame width: " + frame.style.width)
        // console.log("actual frame height: " + actualFrameHeight)
        console.log("resizing ascene canvas frame at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        aScene = resizeCanvas(aScene, sceneWidth*2, sceneHeight)
        //console.log("finished ascene resizing canvas frame at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        aSceneWidth = frame.height*(aSceneWidth/aSceneHeight)
        aSceneHeight = frame.height
        console.log("adjusted ascene height: " + frame.height)
        console.log("adjusted ascene height: " + aScene.height)
        console.log("adjusted ascene width: " + (frame.height*(aSceneWidth/aSceneHeight))*.75)
        //console.log("resizing canvas frame at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        //var santaSelfie = new Image()
        var santaSelfie = '/graphics/SantaSelfiepng.png'

        //console.log("frinished resizing canvas frame at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        frame = frame.dataUri;

        photoHasBeenTaken = true;
         // console.log("merging images at " + new Date().toLocaleTimeString() + " ." + new Date().getMilliseconds())
        // console.log("selfie mode is:" + el.getAttribute('selfieMode'))
        if(el.getAttribute('selfieMode') == "true") {
          console.log("merging with selfie frame")
            mergeImages( [
              {src: frame, x: -(frame.width/3), y: 0},
              //{src: aScene, x: -(sceneWidth/2), y: 0}, 
              //TODO figure out how to get the selfie to show up correctly
              {src: santaSelfie, x: sceneWidth-371, y: (frame.height-721)}], {//, '/graphics/SantaSelfie.gif'], {
              width: sceneWidth,
              height: 721, 
              quality: 1
            }).then(b64 => {
              // Hide the flash
              //container.classList.remove('flash')
              // If an error occurs while trying to take the screenshot, e.detail will be empty.
              // We could either retry or return control to the user
              if (!b64) {
                return
              }
              // e.detail is the base64 representation of the JPEG screenshot
              var basestr = b64 //'data:image/jpeg;base64,' + e.detail
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
              photoFrame.style.display = 'none'
              
              // Tell the restart-camera script to start watching for issues
              window.dispatchEvent(new Event('ensurecamerastart'))
              // console.log(b64)
            });
        } else {
          console.log("merging without selfie frame")
            mergeImages( [
              {src: frame},//, x: -(frame.width/3), y: 0},
              {src: aScene},//, x: -(sceneWidth/2), y: 0}, 
              ],{//src: '/graphics/sixtytwo_small.png', x: 0, y: 0}], {//, '/graphics/SantaSelfie.gif'], {
              width: 812,
              height: 1082, 
              quality: 1
            }).then(b64 => {
              // Hide the flash
              //container.classList.remove('flash')
              // If an error occurs while trying to take the screenshot, e.detail will be empty.
              // We could either retry or return control to the user
              if (!b64) {
                return
              }
              // e.detail is the base64 representation of the JPEG screenshot
              var basestr = b64 //'data:image/jpeg;base64,' + e.detail
              urlToFile(basestr, 'Merry-Christmas.jpg')
                .then(res => {
                  shareFile = res
                  imageUrl = URL.createObjectURL(res)
                }).then(() => {
                  image.src = imageUrl
                })
                
              

              
              // Tell the restart-camera script to start watching for issues
              window.dispatchEvent(new Event('ensurecamerastart'))
              //Show the b64 data
              ////console.log(b64)
            });
            }// $('.flash').fadeOut(300).css({'opacity': 1}); }
                        $('.flash').fadeOut(300).css({'opacity': 1}); 


        
    });

    function captureVideoFrame(video, format, width, height) {
        // if (typeof video === 'string') {
        //   //we select the video source of the camera, not the other videos
            video = document.getElementById('arjs-video');

            videoStyleWidth = parseInt(video.style.width , 10)
            videoStyleHeight = parseInt(video.style.height, 10)
            // console.log("video style width: " + videoStyleWidth)
            // console.log("video style height: " + videoStyleHeight)
        // }
        // format = format || 'jpeg';
 
        // if (!video || (format !== 'png' && format !== 'jpeg')) {
        //     return false;
        // }
        console.log("video widht: " + video.videoWidth + "  Video height: " + video.videoHeight)
        var canvas = document.createElement("CANVAS");

        canvas.width = width || video.videoWidth//videoStyleWidth
        canvas.height = height || video.videoHeight//videoStyleHeight
        canvas.getContext('2d').drawImage(video, 0, 0);
        var dataUri = canvas.toDataURL('image/' + format, 1);
        var data = dataUri.split(',')[1];
        var mimeType = dataUri.split(';')[0].slice(5)
 
        var bytes = window.atob(data);
        var buf = new ArrayBuffer(bytes.length);
        var arr = new Uint8Array(buf);
 
        for (var i = 0; i < bytes.length; i++) {
            arr[i] = bytes.charCodeAt(i);
        }
        var blob = new Blob([ arr ], { type: mimeType });
        return { blob: blob, dataUri: dataUri, format: format, width: canvas.width, height: canvas.height };//videoStyleWidth, height: videoStyleHeight };
    };

    shareButton.addEventListener('click', () => {
      
      if (navigator.canShare && navigator.canShare({files :[shareFile]} )) {
        navigator.share({
          files: [shareFile],
          title: 'Merry Christmas!',
          text: 'Merry Christmas from sixtytwo.co!',
        })
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
      } else {
        shareBlurbAlt.style.display = 'block'
        shareBlurb.hidden = true
        shareButton.hidden = true
        retakeButton.classList.add('solo')
        console.log(`Your browser doesn't support one tap share. Long-press the picture to share it.`);
      }
      // selfie_frame.setAttribute('visible', false)
    })

  }
})