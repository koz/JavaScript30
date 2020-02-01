const getKey = key => document.querySelector(`.key[data-key="${key}"]`)
const getAudio = key => document.querySelector(`audio[data-key="${key}"]`)
const keys = document.querySelectorAll('.key')

const handleKeyDown = (event) => {
  const audio = getAudio(event.keyCode)
  if (!audio) return

  const key = getKey(event.keyCode)
  if (key) {
    key.classList.add('playing')
  }
  audio.currentTime = 0;
  audio.play();
}

const handleTransitionEnd = (event) => {
  if (event.propertyName !== 'transform') return
  event.target.classList.remove('playing')
}

document.addEventListener('keydown', handleKeyDown)
keys.forEach(key => key.addEventListener('transitionend', handleTransitionEnd))

