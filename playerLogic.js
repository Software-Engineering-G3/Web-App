const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

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

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
