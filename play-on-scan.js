AFRAME.registerComponent('play-on-scan', 
{ 
  init: function () { 

    var el = this.el; 
    var currentVideo;
    var currentAudio;
    el.sceneEl.addEventListener('markerFound', function (ev) { // 
      currentVideo = ev.srcElement.querySelector("a-video");
      if(currentVideo && currentVideo.getAttribute("src")){
        var video_el = document.querySelector(currentVideo.getAttribute("src"));
        video_el.play();
      }
    }); 

    el.sceneEl.addEventListener('markerFound', function (ev) { // 
      currentAudio = ev.srcElement.querySelector("a-sound");
      if(currentAudio && currentAudio.getAttribute("src")){
        var audio_el = document.querySelector(currentAudio.getAttribute("src"));
        audio_el.play();
      }
    }); 
    /*el.sceneEl.addEventListener('markerLost', function (ev) { // 
      var childVideo = ev.srcElement.querySelector("a-video");
      if(childVideo && childVideo.getAttribute("src")){
        var video_el = document.querySelector(el.getAttribute("src"));
        video_el.pause();
        video_el.currentTime = 0;
      }
    });*/
  } 
});