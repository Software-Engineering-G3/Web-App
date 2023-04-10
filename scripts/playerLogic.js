const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const songName = document.getElementById('title');
const cover = document.getElementById('cover');
const volumeSlider = document.getElementById('volume-range');

// Update UI
function loadSong(title, artist) {
  songName.innerText = title + " - " + artist;
  // cover.src = `images/${song}.jpg`;
}

function playing() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
}

function paused() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
}

function volumeChanged(volume) {
  volumeSlider.value = volume;
  console.log("Volume changed to: " + volume);
}

// EVENT LISTENERS

// Play or pause song
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Play song
function playSong() {
  socket.emit("+play music");
  console.log("Play music");
}

// Pause song
function pauseSong() {
  socket.emit("+pause music");
  console.log("Pause music");
}

// Previous song
prevBtn.addEventListener('click', () => {
  socket.emit("+previous song");
  console.log("Previous song");
});

// Next song
nextBtn.addEventListener('click', () => {
  socket.emit("+next song");
  console.log("Next song");
});

// Volume
volumeSlider.addEventListener('change', () => {
  let volume = volume.value;
  socket.emit("+volume ", volume);
  console.log("Requested volume change to: " + volume);
});