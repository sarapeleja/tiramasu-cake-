let player;
let isPlaying = false;
// when video ends
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.seekTo(0);   // restart at 0 seconds
    player.playVideo(); // continue playing
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('bgMusic', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });

  const logo = document.querySelector('.logo');

  logo.addEventListener('click', () => {
    // Toggle play/pause
    if (!isPlaying) {
      player.playVideo();
      isPlaying = true;
    } else {
      player.pauseVideo();
      isPlaying = false;
    }

    // Trigger jiggle
    logo.classList.remove('jiggle');   // reset
    void logo.offsetWidth;             // force reflow
    logo.classList.add('jiggle');      // start animation
  });
}
