let player;
let isPlaying = false;

//LANGUAGE STUFF
const EN = "gb";
const PT = "pt";
const DEFAULT = EN;
const FLAG_SVG = "url(https://github.com/lipis/flag-icons/blob/main/flags/1x1/##.svg?raw=true)";

function getFullName(lang_abreviation) {
  switch (lang_abreviation) {
    case EN:
      return 'English';
    case PT:
      return 'Português';
    default:
      return 'Unknown';
  }
}

function switchLanguage(lang) {
  const sections = document.querySelectorAll('section');

  sections.forEach(sec => {
    if (sec.className == lang) {
      sec.style.display = 'block';
      return;
    }
    sec.style.display = 'none';
  })
}

document.addEventListener('DOMContentLoaded', function () {  
  //get elements
  const langToggle = document.getElementById('language-toggle');
  const lang = document.getElementById('language-text');
  const flag = document.getElementById('knob');

  //note: usually by default the toggle is unchecked (checked = false)

  //initial setup with preferred language or default
  const preferredLanguage = localStorage.getItem('preferredLanguage') || DEFAULT;

  //check if the preference is DEFAULT (unchecked) or not (checked)
  langToggle.checked = preferredLanguage != DEFAULT; 
  lang.textContent = getFullName(preferredLanguage);

  //define toggle
  document.addEventListener('change', function (event) {
    const selectedlang = langToggle.checked ? PT : EN;
    lang.textContent = getFullName(selectedlang);
    flag.style.backgroundImage = FLAG_SVG.replace('##', selectedlang);

    localStorage.setItem('preferredLanguage', selectedlang);
    switchLanguage(selectedlang); //show the selected language section, hide the other
  });
});


// MUSIC STUFF
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('ul li').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });
});
