const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let data;

/* DATA FETCHING */
const fetchDataWithXMLHTTP = () => {
  const request = new XMLHttpRequest()
  request.open('GET', endpoint)
  request.onreadystatechange = (e) => {
    const response = JSON.parse(e.target.response)
    data = response;
  }
  request.send()
}

const fetchDataWithFetch = () => fetch(endpoint).then(response => response.json()).then(res => {data = res})

fetchDataWithFetch();
/* ---- */

const filterData = (data, value) => {
  const regexp = new RegExp(value, 'gi')
  return data.filter(item => item.city.match(regexp) || item.state.match(regexp))
}
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const createSuggestion = (item, keyword) => {
  const newElement = document.createElement('li')
  const nameElementContainer = document.createElement('div')
  const populationElement = document.createElement('span')
  const regex = new RegExp(keyword, 'gi')
  const name = `${item.city}, ${item.state}`.replace(regex, `<span class="hl">${keyword}</span>`)
  nameElementContainer.innerHTML = name
  nameElementContainer.classList.add('name')
  newElement.appendChild(nameElementContainer)
  populationElement.classList.add('population')
  populationElement.innerText = `${formatNumber(item.population)}`
  newElement.appendChild(populationElement)

  return newElement.outerHTML
}

const input = document.querySelector('input.search')
const handleInput = () => {
  if (!data) {
    return
  }

  const inputValue = input.value
  const filteredData = filterData(data, inputValue)
  const suggestions = document.querySelector('ul.suggestions')
  const newSuggestions = filteredData.map((item) => createSuggestion(item, input.value))

  suggestions.innerHTML = newSuggestions.join(' ')
}

input.addEventListener('input', handleInput)
