const imgElem = document.querySelector('.img-container img')
const titleElem = document.getElementById('title');
const artistElem = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const music = document.querySelector('audio');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const prevElem = document.getElementById('prev');
const playElem = document.getElementById('play');
const nextElem = document.getElementById('next');

const songs = [
    {
        img: 'img/Crazy-In-Love.jpg',
        audio: 'music/Crazy In Love - Beyoncé ft. JAY Z 🎵.mp3',
        title: 'Crazy In Love',
        artist: 'Beyoncé'
    },
    {
        img: 'img/Umbrella - Rihanna.jpg',
        audio: 'music/Rihanna_ft_Jay_Z_-_Umbrella.mp3',
        title: 'Umbrella',
        artist: 'Rihanna'
    },
    {
        img: 'img/S&M - Rihanna.jpg',
        audio: 'music/Rihanna-SampM.mp3',
        title: 'S&M',
        artist: 'Rihanna'
    }
]

let currentTrackNum = 0;
let playing = false;
let audio = new Audio(songs[currentTrackNum].audio)

const prevSong = () => {
    if(currentTrackNum > 0) {
        currentTrackNum--
        audio.pause()
        playing = false
        changeSongInfo()
        playSong()
    }
}

const nextSong = () => {
    if(currentTrackNum < songs.length - 1) {
        currentTrackNum++
        audio.pause()
        playing = false
        changeSongInfo()
        playSong()
    }
}

const playSong = () => {
    if(!playing) {
        playing = true
        playElem.classList.replace('fa-play', 'fa-pause')
        audio.play()
    } else {
        playing = false
        playElem.classList.replace('fa-pause', 'fa-play')
        audio.pause()
    }
}

const changeSongInfo = () => {
    const currentSong = songs[currentTrackNum]
    imgElem.src = currentSong.img
    titleElem.textContent = currentSong.title
    artistElem.textContent = currentSong.artist
    audio = new Audio(songs[currentTrackNum].audio)
}

// Update Progress Bar & Time
const updateProgressBar = (e) => {
    if (playing) {
      const { duration, currentTime } = e.srcElement;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      currentTimeElem.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
  
  // Set Progress Bar
  const setProgressBar = (e) => {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    console.log(music)
    music.currentTime = (clickX / width) * duration;
  }

playElem.addEventListener('click', playSong)
prevElem.addEventListener('click', prevSong)
nextElem.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);