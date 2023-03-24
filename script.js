'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest()
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
  request.send()

  request.addEventListener('load', function () {
    // destructuring más elegante que JSON.parse(this.responseText)[0]
    const [data] = JSON.parse(this.responseText)

    renderCountry(data)
    for (const neighbor of data.borders) {
      console.log('Obteniendo datos del vaís vecino: ', neighbor)
      //lo siguiente no vale pk es por nombre de país y no por código
      const request = new XMLHttpRequest()
      request.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`)
      request.send()
      request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        renderCountry(data)
      })
    }
  })
}
const renderCountry = function (data) {
  const name = data.name.common
  const flag = data.flags.svg
  const { region, population, borders } = data
  const language = Object.values(data.languages)[0]
  const currency = Object.values(data.currencies)[0].name
  const html = `
    <article class="country">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(population / 1000000).toFixed(
          1
        )} Million people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
    `
  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1
}

getCountryData('spain')
getCountryData('portugal')
getCountryData('germany')

const datosPais = fetch('https://restcountries.com/v3.1/name/${country}')
datosPais
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error('Pais no encontrado(${response.status})')
    }
    return response.json()
  })
  .then((response) => {
    console.log(response)
    const [data] = JSON.parse(response)
    renderCountry(data)
  })
  .catch((err) => {
    console.log(err)
  })

const getNeighborData = function (neighbor) {
  const url = 'https://restcountries.com/v3.1/alpha/${neighbor}'
  fetch(url)
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Pais no encontrado(${response.status})')
      }
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
    .then((response) => {
      const [data] = response
      renderCountry(data, 'neighbor')
    })
}
