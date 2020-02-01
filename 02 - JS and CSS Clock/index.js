const getTime = () => {
  const now = new Date();
  const hour = now.getHours()
  return {
    h: hour < 12 ? hour : hour % 12,
    m: now.getMinutes(),
    s: now.getSeconds()
  }
}

function updateElement(value = 0, element, isHour) {
  if (!element) return

  const newValue = (360 / (isHour ? 12 : 60) * value) + 90;
  if (value === 0) {
    element.style.transition = 'none';
  } else if (value === 1) {
    element.style.transition = 'all 0.2s cubic-bezier(0.1, 2.7, 0.58, 1)';
  }
  element.style.transform = `rotate(${newValue}deg)`
}

function updateSecondsHand(seconds) {
  const element = document.getElementsByClassName('second-hand')[0]
  updateElement(seconds, element)
}

function updateMinutesHand(minutes) {
  const element = document.getElementsByClassName('min-hand')[0]
  updateElement(minutes, element)
}

function updateHourHand(hour) {
  const element = document.getElementsByClassName('hour-hand')[0]
  updateElement(hour, element, true)
}

function updateClock() {
  const {h, m, s} = getTime();

  updateSecondsHand(s)
  updateMinutesHand(m)
  updateHourHand(h)
}

function clock() {
  updateClock()
}

clock();
setInterval(clock, 1000)