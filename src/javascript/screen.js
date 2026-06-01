import {
  switchHeat,
  gerarOrdem,
  atualizarOrdemCaixaContainerDailyForecast,
  heroContent,
  fillSortedWeek,
  fillHourly,
  preencherWeatherDetails,
  temperatureDayliForecast,
  optionsCity,
  switchStateImperial,
  switchStateMetric,
  scrollToCurrentHour,
  loadingWeatherAPI,
  cloasingLoadingWeatherAPI,
  loadingFieldSearch,
  cloasingLoadingFieldSearch,
  trueLoadingFieldSearch,
} from "../javascript/functions.js";
import {
  formattedWeather,
  formattedCoordinates,
} from "../javascript/services.js";

const currentHour = new Date().getHours();

const container = document.getElementById("scroll-bar");
const target = document.querySelector(
  `.container-hourly[data-hour="${currentHour}"]`,
);

if (target && container) {
  const offsetTop = target.offsetTop;

  container.scrollTo({
    top: offsetTop - container.clientHeight / 2,
    behavior: "smooth",
  });
}

let weatherStorage;

// const containerTemperatureDay = document.getElementById(
//   "container-temperature-day",
// );
// if (containerTemperatureDay.scrollHeight > 600) {
//   containerTemperatureDay.style.height = "600px";
//   containerTemperatureDay.style.overflowY = "auto";
// }

// // Pegando a API

// async function buscarClima() {
//   try {
//     const url =
//       "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=,weather_code,temperature_2m&current=temperature_2m,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FSao_Paulo";

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Erro na requisição: " + response.status);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error.message);
//   }
// }
// console.log(buscarClima());

const btnUnits = document.getElementById("units");
const menuUnits = document.getElementById("unitsMenu");

btnUnits.addEventListener("click", () => {
  menuUnits.classList.toggle("active-menu-units");
});

const $btnState = document.getElementById("state");
const $heatMetric = document.querySelectorAll(".metric");
const $heatImperial = document.querySelectorAll(".imperial");
const $checkmarkMetric = document.querySelectorAll(".icon-checkmark-metric");
const $checkmarkImperial = document.querySelectorAll(
  ".icon-checkmark-imperial",
);
console.log(
  $btnState,
  $heatMetric,
  $heatImperial,
  $checkmarkMetric,
  $checkmarkImperial,
);
const $btnRetry = document.getElementById("btn-retry");
$btnState.addEventListener("click", () => {
  switchHeat(
    $btnState,
    $heatImperial,
    $heatMetric,
    $checkmarkImperial,
    $checkmarkMetric,
  );
  const weatherLocalStorage = localStorage.getItem("weather");

  if ($btnState.textContent === "Switch to Metric") {
    const weatherImperial = switchStateImperial(weatherLocalStorage);
    atualizarPaginaAoCarregarAPI(weatherImperial);
  } else if ($btnState.textContent === "Switch to Imperial") {
    const weatherMetric = switchStateMetric(weatherLocalStorage);
    atualizarPaginaAoCarregarAPI(weatherMetric);
  }
});

$heatImperial.forEach((element) => {
  element.addEventListener("click", () => {
    switchHeat(
      $btnState,
      $heatImperial,
      $heatMetric,
      $checkmarkImperial,
      $checkmarkMetric,
    );
    const weatherLocalStorage = localStorage.getItem("weather");
    const weatherImperial = switchStateImperial(weatherLocalStorage);
    atualizarPaginaAoCarregarAPI(weatherImperial);
  });
});
$heatMetric.forEach((element) => {
  element.addEventListener("click", () => {
    switchHeat(
      $btnState,
      $heatImperial,
      $heatMetric,
      $checkmarkImperial,
      $checkmarkMetric,
    );
    const weatherLocalStorage = localStorage.getItem("weather");
    const weatherMetric = switchStateMetric(weatherLocalStorage);
    atualizarPaginaAoCarregarAPI(weatherMetric);
  });
});

const boxChoiceDays = document.querySelector(".box-choice-days");
const days = document.querySelectorAll(".days");
const selectedDay = document.getElementById("selected-day");

boxChoiceDays.addEventListener("click", function (event) {
  const weatherLocalStorage = localStorage.getItem("weather");
  const weatherJSON = JSON.parse(weatherLocalStorage);
  const day = event.target.closest(".days");
  let dayIndexClicked = undefined;
  days.forEach((element, index) => {
    element.classList.remove("day-active");
    if (day === element) {
      dayIndexClicked = index;
    }
  });

  console.log(weatherJSON);
  day.classList.add("day-active");
  fillHourly(
    weatherJSON.hourlyWeatherVariable.temperature,
    weatherJSON.hourlyWeatherVariable.weatherCode,
    dayIndexClicked,
  );
  selectedDay.textContent = day.textContent;
});

const boxDays = document.getElementById("box-days");
boxDays.addEventListener("click", () => {
  boxChoiceDays.classList.toggle("box-choice-days-desactived");
});

// console.log(JSON.stringify(weather));
// const date = [
//   ["2026", "3", "25"],
//   ["2026", "3", "26"],
//   ["2026", "3", "27"],
//   ["2026", "3", "28"],
//   ["2026", "3", "29"],
//   ["2026", "3", "31"],
//   ["2026", "4", "01"],
// ];
// console.log(atualizarOrdemMonthHeroContent(date));

function atualizarPaginaAoCarregarAPI(weather) {
  const diasSemana = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dias = gerarOrdem(
    weather.dailyWeatherVariables.date,
    diasSemana,
    (data) => data.getDay(),
  );

  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const mesesResultado = gerarOrdem(
    weather.dailyWeatherVariables.date,
    meses,
    (data) => data.getMonth(),
  );

  const dayDayliForecast = atualizarOrdemCaixaContainerDailyForecast(dias);
  const hora = new Date().getHours();

  heroContent(weather, dias, mesesResultado, hora === 0 ? hora : hora - 1);
  fillSortedWeek(dias, dayDayliForecast);
  fillHourly(
    weather.hourlyWeatherVariable.temperature,
    weather.hourlyWeatherVariable.weatherCode,
  );
  preencherWeatherDetails(
    weather.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean,
    weather.dailyWeatherVariables.dayMeanDetails.relativeHumidity,
    weather.dailyWeatherVariables.dayMeanDetails.windSpeed,
    weather.dailyWeatherVariables.dayMeanDetails.precipitationMean,
    "km/h",
    "mm",
    0,
  );
  temperatureDayliForecast(
    weather.dailyWeatherVariables.weatherCode,
    weather.dailyWeatherVariables.dailyForecast.temperatureMax,
    weather.dailyWeatherVariables.dailyForecast.temperatureMin,
  );
  // console.log(JSON.stringify(weather));
  scrollToCurrentHour;
}

// const diasSemana = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const dias = gerarOrdem(
//   weather.dailyWeatherVariables.date,
//   diasSemana,
//   (data) => data.getDay(),
// );

// const meses = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const mesesResultado = gerarOrdem(
//   weather.dailyWeatherVariables.date,
//   meses,
//   (data) => data.getMonth(),
// );

// const dayDayliForecast = atualizarOrdemCaixaContainerDailyForecast(dias);
// const hora = new Date().getHours();

// heroContent(weather, dias, mesesResultado, hora - 1);
// dayAndDays(dias, dayDayliForecast);
// preencherHourly(
//   weather.hourlyWeatherVariable.temperature,
//   weather.hourlyWeatherVariable.weatherCode,
// );
// preencherWeatherDetails(
//   weather.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean,
//   weather.dailyWeatherVariables.dayMeanDetails.relativeHumidity,
//   weather.dailyWeatherVariables.dayMeanDetails.windSpeed,
//   weather.dailyWeatherVariables.dayMeanDetails.precipitationMean,
//   "km/h",
//   "mm",
//   0,
// );
// temperatureDayliForecast(
//   weather.dailyWeatherVariables.weatherCode,
//   weather.dailyWeatherVariables.dailyForecast.temperatureMax,
//   weather.dailyWeatherVariables.dailyForecast.temperatureMin,
// );
// // console.log(JSON.stringify(weather));
// scrollToCurrentHour;

let stringAPI = "Porto Alegre";

let weatherAPI = await formattedWeather(stringAPI);

// Fazer a refatoração criando uma função pra esse armazenamento da API
weatherStorage = JSON.stringify(weatherAPI);
localStorage.setItem("weather", weatherStorage);

let dataCampoPesquisa;

atualizarPaginaAoCarregarAPI(weatherAPI);

$btnRetry.addEventListener("click", async () => {
  if (dataCampoPesquisa) {
    stringAPI = dataCampoPesquisa;
  }

  weatherAPI = await formattedWeather(stringAPI);
  // Fazer a refatoração criando uma função pra esse armazenamento da API
  weatherStorage = JSON.stringify(weatherAPI);
  localStorage.setItem("weather", weatherStorage);

  atualizarPaginaAoCarregarAPI(weatherAPI);
});

const fieldSearch = document.getElementById("input-search");
const boxCityName = document.querySelector(".box-city-name");

// let verifyLoadingFieldSearch;
let isLoadingFieldSearch = false;

// function wait(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

fieldSearch.addEventListener("input", async () => {
  const inputValue = fieldSearch.value;
  const boxCityName = document.querySelector(".box-city-name");
  boxCityName.classList.remove("box-city-name-active");
  if (inputValue === "") {
    cloasingLoadingFieldSearch();
    return;
  }

  loadingFieldSearch();
  setTimeout(() => {
    cloasingLoadingFieldSearch();
    optionsCity(boxCityName, fieldSearch);
  }, 2000);

  // if (inputValue.length === 0) {

  // }
});
boxCityName.addEventListener("click", async (e) => {
  const buttons = e.target.closest(".btn-location-name");
  if (buttons) {
    boxCityName.classList.remove("box-city-name-active");
    const data = await formattedWeather(buttons.textContent);
    atualizarPaginaAoCarregarAPI(data);
  }
});

// document.addEventListener("DOMContentLoaded", () => {
//   scrollToCurrentHour();
// });

// const weatherJSONNNN = localStorage.getItem("weather");

// switchStateFahrenheit(weatherJSONNNN);
// const aaa = JSON.parse(weatherJSONNNN);

// console.log(aaa);

// const currentHour = new Date().getHours();

// const container = document.getElementById("scroll-bar");
// const target = document.querySelector(
//   `.container-hourly[data-hour="${currentHour}"]`,
// );

// if (target && container) {
//   const offsetTop = target.offsetTop;

//   container.scrollTo({
//     top: offsetTop - container.clientHeight / 2,
//     behavior: "smooth",
//   });
// }
