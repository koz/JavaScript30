const rootEl = document.querySelector(":root");
const inputs = document.querySelectorAll('.controls input')

const changeProperty = (property, value) => rootEl.style.setProperty(property, value)

const handleChange = (event) => {
  const value = event.target.value;
  const sizing = event.target.dataset.sizing || '';

  changeProperty(`--${event.target.name}`, `${value}${sizing}`)
}

inputs.forEach(input => input.addEventListener('change', handleChange))
inputs.forEach(input => input.addEventListener('mousemove', handleChange))