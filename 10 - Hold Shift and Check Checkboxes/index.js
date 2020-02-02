const inputs = document.querySelectorAll('input[type="checkbox"]')
let lastChecked;

inputs.forEach(input => input.addEventListener('click', (event) => {
  console.log(event)
  if (event.shiftKey && input.checked) {
    let inBetween = false;
    inputs.forEach(item => {
      if (item === lastChecked || item === input) {
        inBetween = !inBetween
      }

      if (inBetween) {
        item.checked = true
      }
    })
  }

  if (input.checked) {
    lastChecked = input;
  }

  if (!input.checked && lastChecked === input) {
    lastChecked === null
  }
}))