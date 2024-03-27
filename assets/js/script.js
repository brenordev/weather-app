const apiKey = '6391b43302dde089068f12d8e9628db7' 
const btnSearch = document.querySelector('#btn-search')
let inSearch = document.querySelector('#search')
const display = document.querySelector('.container__display')


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const res = await fetch(apiWeatherURL);
        if (!res.ok) {
            throw new Error('Cidade não encontrada. Verifique se o nome está correto.');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error('Ocorreu um erro ao obter os dados meteorológicos.');
    }
};
const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);
        renderResult(city, data);
    } catch (error) {
        alert(error.message);
    }
};

btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    const city = inSearch.value;
    showWeatherData(city)
});

inSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const city = inSearch.value;
        showWeatherData(city);
    }
});

const renderResult = async (city) => {
    const data = await getWeatherData(city);


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
