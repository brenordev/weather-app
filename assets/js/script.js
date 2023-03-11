require('dotenv').config();
const apiKey = process.env.API_KEY;
const btnSearch = document.querySelector('#btn-search')
const inSearch = document.querySelector('#search')


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {

    const data = await getWeatherData(city);
    renderResult(city)
}


btnSearch.addEventListener('click', (e) => {
    e.preventDefault();

    const city = inSearch.value;

    showWeatherData(city)


});

const renderResult = async (city) => {
    const data = await getWeatherData(city);

    const display = document.querySelector('.container__display')

    display.innerHTML = `
    
    <div class="container__display__title">
                    <h5 class="heading">
                        <i class="fa-solid fa-map-location-dot"></i>
                        Cidade
                    </h5>
                    <span class="display-city">
                    ${data.name} - ${data.sys.country}
                    </span>
                </div>
                <div class="container__display__title">
                    <h5 class="heading">
                        <i class="fa-solid fa-temperature-three-quarters"></i>
                        Temperatura
                    </h5>
                    <span class="display-temperature">
                    ${parseInt(data.main.temp)} °C
                    </span>
                </div>
                <div class="container__display__title">
                    <h5 class="heading">
                        <i class="fa-solid fa-wind"></i>
                        Vel. Vento
                    </h5>
                    <span class="display-wind">${data.wind.speed} km/h</span>
                </div>
            </div>
    `
}