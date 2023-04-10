const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Update UI
function loadSong(title, artist) {
  let song = title + " - " + artist;
  title.innerText = song;
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
  socket.emit("+play music")
  console.log("Play music")
}

// Pause song
function pauseSong() {
  socket.emit("+pause music")
  console.log("Pause music")
}

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Previous song
function prevSong() {
  socket.emit("+previous song")
  console.log("Previous song")
}

// Next song
function nextSong() {
  socket.emit("+next song");
  console.log("Next song");
}