import imgw from "./bd.js";
import conditions  from "./conditions.js";

const apiKeys = 'ff7dc3a1cf2847a985692006231206';

const form = document.querySelector('.form');
const search = document.querySelector('.form__inp');
const weatherBlocks = document.querySelector('.weather-blocks');
const degree_b = document.querySelector('.weather-blocks__degree-block');

async function getCity(searchs) {
    const map = `http://api.weatherapi.com/v1/forecast.json?key=${apiKeys}&q=${searchs}`;
    const response = await fetch(map);
    const data = await response.json();

    return data
}

const showWin = async e => {

    e.preventDefault();

    const searchs = search.value.trim();

    // получаем данные с сервака

    const data = await getCity(searchs);

    const createErr = document.querySelector('.err');

        if(data.error) {

            createErr.classList.remove('errHidden');

            removeAnimationBlocks();
            RemoveAnimationGrid();
        } else {
            createErr.classList.add('errHidden');

            weather(data);
        }
}

const weather = (data) => {
    const location = document.querySelector('.location');
    const degree = document.querySelector('.weather-blocks__degtee');
    const kph = document.querySelector('.weather-blocks__rez');
    const region = document.querySelector('.weather-blocks__region');
    const localtime = document.querySelector('.weather-blocks__localtime');
    const lastUpdated = document.querySelector('.weather-blocks__lastUpdated');
    const humidity = document.querySelector('.weather-blocks__humidity-p');
    const condition_t = document.querySelector('.weather-blocks__condition-t');
    const condition_b = document.querySelector('.weather-blocks__condition-b');
    const runW = document.querySelector('.weather-blocks__precent');
    const vis = document.querySelector('.weather-blocks__vis_km');

    animationGrid();
    animationBlocks();

    const info = conditions.find(obj => obj.code === data.current.condition.code);

    const idData = data.current.is_day;

    const inf = data.current.is_day ? info.day : info.night;

    const indexW = imgw.imgsDN[idData][inf];

    location.textContent = data.location.name;
    degree.textContent = data.current.temp_c + '°';
    kph.textContent = data.current.wind_kph + ' kph';
    region.textContent = data.location.country;
    localtime.textContent = data.location.localtime;
    lastUpdated.textContent = data.current.last_updated;
    humidity.textContent = data.current.humidity + '%';
    condition_t.textContent = data.current.condition.text;
    condition_b.textContent = 'feels like: ' + data.current.feelslike_c + '°';
    degree_b.style.backgroundImage = `url('${indexW}')`;
    runW.textContent = data.forecast.forecastday[0].hour[`${(data.current.last_updated).slice(11, -3).replace(/^0/, '')}`].chance_of_rain + '%';
    vis.textContent = data.forecast.forecastday[0].day.avgvis_km + ' km';
}

function animationGrid() {
    weatherBlocks.style.maxHeight = '1000px';
    weatherBlocks.style.marginTop = '20px';
}

function RemoveAnimationGrid() {
    weatherBlocks.style.maxHeight = '0px';
    weatherBlocks.style.marginTop = '0px';
}

const wind_b = document.querySelector('.weather-blocks__wind');
const rain_b = document.querySelector('.weather-blocks__rain');
const humidity_b = document.querySelector('.weather-blocks__humidity');
const vis_b = document.querySelector('.weather-blocks__vis')

function animationBlocks() {

    setTimeout(() => {
        degree_b.classList.remove('hidden');
    }, 200);

    setTimeout(() => {
        wind_b.classList.remove('hidden');
    }, 300);

    setTimeout(() => {
        rain_b.classList.remove('hidden');
    }, 400);

    setTimeout(() => {
        humidity_b.classList.remove('hidden');
    }, 500);

    setTimeout(() => {
        vis_b.classList.remove('hidden');
    }, 600);

}

function removeAnimationBlocks() {

    setTimeout(() => {
        degree_b.classList.add('hidden');
    }, 200);

    setTimeout(() => {
        wind_b.classList.add('hidden');
    }, 300);

    setTimeout(() => {
        rain_b.classList.add('hidden');
    }, 400);

    setTimeout(() => {
        humidity_b.classList.add('hidden');
    }, 500);

    setTimeout(() => {
        vis_b.classList.add('hidden');
    }, 600);

}

form.addEventListener('submit', showWin);