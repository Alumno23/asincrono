//petición al servido
//forma más antigua

const request = new XMLHttpRequest()

request.open(requestType, url)
//request get post....

request.send()
//data=request.send()
//error,data no esta ahi todo es sincrona

request.addEventListener('load', function () {
  console.log(this.request)
  const [data] = JSON.parse(this.responseText)
  const name = data.name.common
  const flag = data.flags.svg
  const { region, population } = data
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
})

getCountryData('spain')
getCountryData('portugal')
getCountryData('germany')
