import { switchHeat } from "../javascript/functions.js";
import { formattedWeather } from "../javascript/API.js";
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
    console.log("disparando");
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
  console.log(days);
  days[0].classList.remove("day-active");
});

const $city = document.getElementById("city");
const $country = document.getElementById("country");
const $day = document.getElementById("day");
const $month = document.getElementById("month");
const $numberDay = document.getElementById("number-day");
const $year = document.getElementById("year");

const weather = await formattedWeather("Porto Alegre");
