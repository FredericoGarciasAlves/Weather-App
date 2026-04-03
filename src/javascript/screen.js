import {
  switchHeat,
  gerarOrdem,
  atualizarOrdemCaixaContainerDailyForecast,
  heroContent,
  fillSortedWeek,
  fillHourly,
  preencherWeatherDetails,
  temperatureDayliForecast,
  scrollToCurrentHour,
  optionsCity,
} from "../javascript/functions.js";
import {
  formattedWeather,
  formattedCoordinates,
} from "../javascript/services.js";

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

const btn = document.getElementById("units");
const menu = document.getElementById("unitsMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const $btnState = document.getElementById("state");
const $heatMetric = document.querySelectorAll(".metric");
const $heatImperial = document.querySelectorAll(".imperial");
const $checkmark = document.querySelectorAll(".icon-checkmark");

const $btnRetry = document.getElementById("btn-retry");
$btnState.addEventListener("click", () => {
  // console.log("disparando");
  // $heatMetric.forEach((element, index) => {
  //   // console.log(element.classList.contains("active-metric"));
  //   if (element.classList.contains("active-metric")) {
  //     element.classList.remove("active-metric");
  //     $heatImperial[index].classList.add("active-imperial");

  //     // $checkmark[index].hidden = false;
  //   } else {
  //     element.classList.add("active-metric");
  //     $heatImperial[index].classList.remove("active-imperial");
  //     // $checkmark[index] = true;
  //   }

  //   //   switch (element.classList.contains("active-two")) {
  //   //     case true:
  //   //       element.classList.toggle("active-two");
  //   //       break;
  //   //     case false:
  //   //       $heatMetric[index].classList.toggle("active-one");
  //   //       break;
  //   //   }
  //   // });
  // });
  // // console.log($heatMetric[0].classList.contains("active-metric"));
  // if ($heatMetric[0].classList.contains("active-metric")) {
  //   for (let i = 0; i < 6; i++) {
  //     $checkmark[i].hidden = true;
  //   }
  //   for (let i = 0; i < 5; i = i + 2) {
  //     $checkmark[i].hidden = false;
  //     console.log("disparando");
  //   }
  // } else {
  //   for (let i = 0; i < 6; i++) {
  //     $checkmark[i].hidden = false;
  //   }
  //   for (let i = 0; i < 5; i = i + 2) {
  //     $checkmark[i].hidden = true;
  //   }
  //   console.log("disparando dobrado");
  // }

  switchHeat($heatMetric, $heatImperial, $checkmark, $btnState);
});

$heatImperial.forEach((element) => {
  element.addEventListener("click", () => {
    switchHeat($heatMetric, $heatImperial, $checkmark, $btnState);
  });
});
$heatMetric.forEach((element) => {
  element.addEventListener("click", () => {
    switchHeat($heatMetric, $heatImperial, $checkmark, $btnState);
  });
});

const boxChoiceDays = document.querySelector(".box-choice-days");
boxChoiceDays.addEventListener("click", function (event) {
  const days = event.target.matches("days");

  days[0].classList.remove("day-active");
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

let dataCampoPesquisa;

atualizarPaginaAoCarregarAPI(weatherAPI);

$btnRetry.addEventListener("click", async () => {
  if (dataCampoPesquisa) {
    stringAPI = dataCampoPesquisa;
  }

  weatherAPI = await formattedWeather(stringAPI);

  atualizarPaginaAoCarregarAPI(weatherAPI);
});

const fieldSearch = document.getElementById("input-search");
const boxCityName = document.querySelector(".box-city-name");
fieldSearch.addEventListener("input", async () => {
  const inputValue = fieldSearch.value;
  if (inputValue === "") {
    return;
  }
  const data = await formattedCoordinates(inputValue);
  optionsCity(data, boxCityName, fieldSearch);
});

boxCityName.addEventListener("click", async (e) => {
  const buttons = e.target.closest(".btn-location-name");
  if (buttons) {
    boxCityName.classList.remove("box-city-name-active");
    const data = await formattedWeather(buttons.textContent);
    atualizarPaginaAoCarregarAPI(data);
  }
});
