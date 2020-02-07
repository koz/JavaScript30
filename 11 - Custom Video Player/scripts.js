const playButton = document.getElementsByClassName('player__button')[0]
const videoPlayer = document.getElementsByClassName('player__video')[0]
const progressBar = document.getElementsByClassName('progress__filled')[0]
const progressBarContainer = document.getElementsByClassName('progress')[0]
const volumeBar = document.querySelector('input[name="volume"]')
const playbackBar = document.querySelector('input[name="playbackRate"]')
const playerButtons = document.querySelectorAll('button.player__button[data-skip]')
let mouseDown = false;

const togglePlay = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

const updateProgressBar = (e) => {
  const {currentTime, duration} = e.target
  const progress = currentTime / duration * 100
  progressBar.style.flexBasis = `${progress}%`
}

const updateProgress = (time) => {
  videoPlayer.currentTime = time * videoPlayer.duration;
}

const handleProgressBarClick = (e) => {
  const newProgress = e.offsetX / progressBarContainer.clientWidth;
  updateProgress(newProgress)
}

const handleRangeChange = (e) => {
  videoPlayer[e.target.name] = e.target.value
}

const handlePlayerButtons = (e) => {
  const value = Number(e.target.dataset.skip)
  videoPlayer.currentTime += value
}

playButton.addEventListener('click', togglePlay)
videoPlayer.addEventListener('click', togglePlay)
videoPlayer.addEventListener('timeupdate', updateProgressBar)
progressBarContainer.addEventListener('click', handleProgressBarClick)
progressBarContainer.addEventListener('mousedown', () => mouseDown = true)
progressBarContainer.addEventListener('mouseup', () => mouseDown = false)
progressBarContainer.addEventListener('mousemove', (e) => mouseDown && handleProgressBarClick(e))
volumeBar.addEventListener('change', handleRangeChange)
playbackBar.addEventListener('change', handleRangeChange)
playerButtons.forEach(el => el.addEventListener('click', handlePlayerButtons))