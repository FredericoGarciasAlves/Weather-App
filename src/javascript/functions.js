import {
  formattedWeather,
  formattedCoordinates,
} from "../javascript/services.js";

// function switchHeat(heatMetric, heatImperial, checkmark, btnState) {
//   heatMetric.forEach((element, index) => {
//     // console.log(element.classList.contains("active-metric"));
//     if (element.classList.contains("active-metric")) {
//       element.classList.remove("active-metric");
//       heatImperial[index].classList.add("active-imperial");

//       // $checkmark[index].hidden = false;
//     } else {
//       element.classList.add("active-metric");
//       heatImperial[index].classList.remove("active-imperial");
//       // $checkmark[index] = true;
//     }

//     //   switch (element.classList.contains("active-two")) {
//     //     case true:
//     //       element.classList.toggle("active-two");
//     //       break;
//     //     case false:
//     //       $heatMetric[index].classList.toggle("active-one");
//     //       break;
//     //   }
//     // });
//   }),;
//   // console.log($heatMetric[0].classList.contains("active-metric"));
//   if (heatMetric[0].classList.contains("active-metric")) {
//     for (let i = 0; i < 6; i++) {
//       checkmark[i].hidden = true;
//     }
//     for (let i = 0; i < 5; i = i + 2) {
//       checkmark[i].hidden = false;
//       console.log("disparando");
//     }
//   } else {
//     for (let i = 0; i < 6; i++) {
//       checkmark[i].hidden = false;
//     }
//     for (let i = 0; i < 5; i = i + 2) {
//       checkmark[i].hidden = true;
//     }
//     console.log("disparando dobrado");
//   }

//   if (btnState.textContent === "Switch to Imperial") {
//     btnState.textContent = "Switch to Metric";
//   } else {
//     btnState.textContent = "Switch to Imperial";
//   }
// }

function switchHeat(
  btnState,
  heatImperial,
  heatMetric,
  iconImperial,
  iconMetric,
) {
  heatImperial.forEach((el) => el.classList.toggle("active-heat"));
  heatMetric.forEach((el) => el.classList.toggle("active-heat"));
  iconImperial.forEach((el) => el.classList.toggle("hidden-icon-checkmark"));
  iconMetric.forEach((el) => el.classList.toggle("hidden-icon-checkmark"));

  const isMetric = btnState.textContent.includes("Metric");

  btnState.textContent = isMetric ? "Switch to Imperial" : "Switch to Metric";
  console.log("disparando");
}

function gerarOrdem(dateArray, labels, metodod) {
  let resultado = [];

  dateArray.forEach((d) => {
    const data = new Date(d[0], d[1] - 1, d[2]);
    resultado.push(labels[metodod(data)]);
  });

  return resultado;
}

function atualizarOrdemCaixaContainerDailyForecast(arrayDate) {
  let formattedDays = [];

  arrayDate.forEach((d) => {
    const days = d.slice(0, 3);
    formattedDays.push(days);
  });

  return formattedDays;
}

function heroContent(weather, dayString, monthString, indiceHora) {
  const $city = document.getElementById("city");
  const $province = document.getElementById("province");
  const $country = document.getElementById("country");
  const $day = document.getElementById("day");
  const $month = document.getElementById("month");
  const $numberDay = document.getElementById("number-day");
  const $year = document.getElementById("year");
  const $iconHero = document.getElementById("icon-temperature-hero-content");
  const $temperatureNow = document.getElementById("temperature-now");

  $city.textContent = weather.dailyWeatherVariables.location.city + ", ";

  if (weather.dailyWeatherVariables.location.province === "") {
    $province.classList.add("province-desactived");
  } else {
    $province.classList.remove("province-desactived");
    $province.textContent =
      weather.dailyWeatherVariables.location.province + ", ";
  }

  $country.textContent = weather.dailyWeatherVariables.location.country;
  $day.textContent = dayString[0] + ", ";
  $month.textContent = monthString[0] + " ";
  $numberDay.textContent = `${weather.dailyWeatherVariables.date[0][2]}, `;
  $year.textContent = weather.dailyWeatherVariables.date[0][0];
  $iconHero.src = weather.hourlyWeatherVariable.weatherCode[0][indiceHora];
  $temperatureNow.textContent =
    weather.hourlyWeatherVariable.temperature[0][indiceHora] + "°";
  // $month.textContent =
}

function fillSortedWeek(arrayDays, arrayDayliForecast) {
  const $daysBoxChoice = document.querySelectorAll(".days");
  const $dayDailyForecast = document.querySelectorAll(".day");

  const $selectedDay = document.querySelector("#selected-day");
  $selectedDay.textContent = arrayDays[0];

  $daysBoxChoice.forEach((elementDay, index) => {
    elementDay.textContent = arrayDays[index];
  });

  $dayDailyForecast.forEach((element, index) => {
    element.textContent = arrayDayliForecast[index];
  });
}

function fillHourly(
  arrayTemperature,
  arrayIconTemperature,
  selectedDayIndex = 0,
) {
  const temperature = document.querySelectorAll(".temperature");
  const iconTemperatureHourlyForecast = document.querySelectorAll(
    ".icon-temperature-hourly-forecast",
  );
  temperature.forEach((elementTemperature, index) => {
    elementTemperature.textContent =
      arrayTemperature[selectedDayIndex][index] + "°";
  });

  iconTemperatureHourlyForecast.forEach((elementIcon, index) => {
    elementIcon.src = arrayIconTemperature[selectedDayIndex][index];
  });
}

function preencherWeatherDetails(
  dataFeelsLike,
  dataHumidity,
  dataWind,
  dataPreciptation,
  medidaWind,
  medidaPreciptation,
  index,
) {
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const precipitation = document.getElementById("preciptation");

  feelsLike.textContent = dataFeelsLike[index] + "°";
  humidity.textContent = dataHumidity[index] + "%";
  wind.textContent = dataWind[index] + " " + medidaWind;
  precipitation.textContent =
    dataPreciptation[index] + " " + medidaPreciptation;
}

function temperatureDayliForecast(
  arrayDataIcon,
  arrayDataMaxTemperature,
  arrayDataMinTemperature,
) {
  const iconMinMaxtemperature = document.querySelectorAll(
    ".icon-min-max-temperature",
  );
  const maxTemperature = document.querySelectorAll(".max-temperature");
  const minTemperature = document.querySelectorAll(".min-temperature");
  iconMinMaxtemperature.forEach((elementIcon, index) => {
    elementIcon.src = arrayDataIcon[index];
  });
  maxTemperature.forEach((elementMaxTemperature, index) => {
    elementMaxTemperature.textContent = arrayDataMaxTemperature[index] + "°";
  });
  minTemperature.forEach((elementMinTemperature, index) => {
    elementMinTemperature.textContent = arrayDataMinTemperature[index] + "°";
  });
}

function getCurrentHour() {
  const now = new Date();
  return now.getHours(); // retorna 0 - 23
}

function formatHour(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour} ${period}`;
}
// function scrollToCurrentHour() {
//   const hour = getCurrentHour();
//   const formattedHour = formatHour(hour);

//   const hours = document.querySelectorAll("#scroll-bar .hourly span.hourly");

//   hours.forEach((element) => {
//     if (element.textContent === formattedHour) {
//       element.closest(".hourly").scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   });
// }
// function optionsCity(dataLocation, boxCityName) {
//   const documentFragmentButton = document.documentFragment();
//   const documentFragmentCity = document.documentFragment();
//   const documentFragmentProvince = document.documentFragment();
//   const documentFragmentCountry = document.documentFragment();

//   const city = dataLocation.city;
//   const province = dataLocation.province;
//   const country = dataLocation.country;

//   city.forEach((element) => {
//     const nameCity = document.createElement("span");
//     const button = document.createElement("button");
//     button.type = "button";
//     button.classList.add("btn-location-name");
//     nameCity.classList.add("city-name");
//     nameCity.textContent = element + ", ";
//     documentFragmentButton.appendChild(button);
//     documentFragmentCity.appendChild(nameCity);
//   });

//   province.forEach((element) => {
//     const nameProvice = document.createElement("span");
//     nameProvice.classList.add("province-name");
//     nameProvice.textContent = element + ", ";
//     documentFragmentProvince.appendChild(nameProvice);
//   });

//   country.forEach((element) => {
//     const nameCountry = document.createElement("span");
//     nameCountry.classList.add("country-name");
//     nameCountry.textContent = element + ", ";
//     documentFragmentCountry.appendChild(nameCountry);
//   });

//   documentFragmentButton.forEach((element) => {
//     element.appendChild(documentFragmentCity);
//     element.appendChild(documentFragmentProvince);
//     element.appendChild(documentFragmentCountry);
//   });
//   boxCityName.appendChild(documentFragmentButton);
// }

async function optionsCity(boxCityName, input) {
  const dataLocation = await formattedCoordinates(input.value);
  if (input.value === "" || !dataLocation || !dataLocation.city) {
    boxCityName.innerHTML = " ";
    boxCityName.classList.remove("box-city-name-active");
    console.log("disparando");
    return;
  } else {
    boxCityName.classList.add("box-city-name-active");
  }
  const city = dataLocation.city;
  const province = dataLocation.province;
  const country = dataLocation.country;
  console.log(city);
  const existingButtons = boxCityName.children;
  // console.log(existingButtons);
  city.forEach((element, index) => {
    let button = existingButtons[index];
    // console.log(button);
    // 👉 Se NÃO existir, cria
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.classList.add("btn-location-name");

      // const nameCity = document.createElement("span");
      // nameCity.classList.add("city-name");

      // const nameProvince = document.createElement("span");
      // nameProvince.classList.add("province-name");

      // const nameCountry = document.createElement("span");
      // nameCountry.classList.add("country-name");

      // button.appendChild(nameCity);
      // button.appendChild(nameProvince);
      // button.appendChild(nameCountry);

      boxCityName.appendChild(button);
    }

    if (province[index] === "") {
      province[index] = "";
      element = element + ", ";
    } else {
      province[index] = province[index] + ", ";
      element = element + ", ";
    }
    if (country[index] === "") {
      country[index] = "";
      province[index] = province[index];
    }
    if ((province[index] === "" + country[index]) === "") {
      element = element;
    }
    // 👉 Atualiza conteúdo
    button.textContent = element + province[index] + country[index];
    // button.querySelector(".province-name").textContent = province[index] + ", ";
    // button.querySelector(".country-name").textContent = country[index];
  });

  // 👉 Remove botões extras (caso nova busca tenha menos resultados)
  while (boxCityName.children.length > city.length) {
    boxCityName.removeChild(boxCityName.lastChild);
  }
}

function transformMetricToImperial(weather) {
  return Math.round(weather * (9 / 5) + 32);
}

function switchStateImperial(weatherJSON) {
  const weatherObj = JSON.parse(weatherJSON);

  const hourlyTemperature = weatherObj.hourlyWeatherVariable.temperature;
  const dailyTemperatureMean = weatherObj.dailyWeatherVariables.temperatureMean;
  const dailyApparentTemperatureMean =
    weatherObj.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean;
  const dailyWindSpeed =
    weatherObj.dailyWeatherVariables.dayMeanDetails.windSpeed;
  const dailyPreciptationMean =
    weatherObj.dailyWeatherVariables.dayMeanDetails.precipitationMean;
  const dailyTemperatureMax =
    weatherObj.dailyWeatherVariables.dailyForecast.temperatureMax;
  const dailyTemperatureMin =
    weatherObj.dailyWeatherVariables.dailyForecast.temperatureMin;

  const hourlyTemperatureImperial = hourlyTemperature.map((array) => {
    return array.map((element) => {
      return transformMetricToImperial(element);
    });
  });
  const dailyTemperatureMeanImperial = dailyTemperatureMean.map((element) => {
    return transformMetricToImperial(element);
  });

  const dailyApparentTemperatureMeanImperial = dailyApparentTemperatureMean.map(
    (element) => {
      return transformMetricToImperial(element);
    },
  );

  const dailyWindSpeedImperial = dailyWindSpeed.map((element) => {
    return Math.round(element * 0.621);
  });

  const dailyPreciptationMeanImperail = dailyPreciptationMean.map((element) => {
    return Math.round(element / 25.4);
  });

  const dailyTemperatureMaxImperial = dailyTemperatureMax.map((element) => {
    return transformMetricToImperial(element);
  });

  const dailyTemperatureMinImperial = dailyTemperatureMin.map((element) => {
    return transformMetricToImperial(element);
  });

  weatherObj.hourlyWeatherVariable.temperature = hourlyTemperatureImperial;
  weatherObj.dailyWeatherVariables.temperatureMean =
    dailyTemperatureMeanImperial;
  weatherObj.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean =
    dailyApparentTemperatureMeanImperial;
  weatherObj.dailyWeatherVariables.dayMeanDetails.windSpeed =
    dailyWindSpeedImperial;
  weatherObj.dailyWeatherVariables.dayMeanDetails.precipitationMean =
    dailyPreciptationMeanImperail;
  weatherObj.dailyWeatherVariables.dailyForecast.temperatureMax =
    dailyTemperatureMaxImperial;
  weatherObj.dailyWeatherVariables.dailyForecast.temperatureMin =
    dailyTemperatureMinImperial;

  localStorage.setItem("weather", JSON.stringify(weatherObj));

  return weatherObj;
}

function transformImperialToMetric(weather) {
  return Math.round((weather - 32) * (5 / 9));
}

function switchStateMetric(weatherJSON) {
  const weatherObj = JSON.parse(weatherJSON);

  const hourlyTemperature = weatherObj.hourlyWeatherVariable.temperature;
  const dailyTemperatureMean = weatherObj.dailyWeatherVariables.temperatureMean;
  const dailyApparentTemperatureMean =
    weatherObj.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean;
  const dailyWindSpeed =
    weatherObj.dailyWeatherVariables.dayMeanDetails.windSpeed;
  const dailyPreciptationMean =
    weatherObj.dailyWeatherVariables.dayMeanDetails.precipitationMean;
  const dailyTemperatureMax =
    weatherObj.dailyWeatherVariables.dailyForecast.temperatureMax;
  const dailyTemperatureMin =
    weatherObj.dailyWeatherVariables.dailyForecast.temperatureMin;

  const hourlyTemperatureMetric = hourlyTemperature.map((array) => {
    return array.map((element) => {
      return transformImperialToMetric(element);
    });
  });
  const dailyTemperatureMeanMetric = dailyTemperatureMean.map((element) => {
    return transformImperialToMetric(element);
  });

  const dailyApparentTemperatureMeanMetric = dailyApparentTemperatureMean.map(
    (element) => {
      return transformImperialToMetric(element);
    },
  );

  const dailyWindSpeedMetric = dailyWindSpeed.map((element) => {
    return Math.round(element / 0.621);
  });

  const dailyPreciptationMeanMetric = dailyPreciptationMean.map((element) => {
    return Math.round(element * 25.4);
  });

  const dailyTemperatureMaxMetric = dailyTemperatureMax.map((element) => {
    return transformImperialToMetric(element);
  });

  const dailyTemperatureMinMetric = dailyTemperatureMin.map((element) => {
    return transformImperialToMetric(element);
  });

  weatherObj.hourlyWeatherVariable.temperature = hourlyTemperatureMetric;
  weatherObj.dailyWeatherVariables.temperatureMean = dailyTemperatureMeanMetric;
  weatherObj.dailyWeatherVariables.dayMeanDetails.apparentTemperatureMean =
    dailyApparentTemperatureMeanMetric;
  weatherObj.dailyWeatherVariables.dayMeanDetails.windSpeed =
    dailyWindSpeedMetric;
  weatherObj.dailyWeatherVariables.dayMeanDetails.precipitationMean =
    dailyPreciptationMeanMetric;
  weatherObj.dailyWeatherVariables.dailyForecast.temperatureMax =
    dailyTemperatureMaxMetric;
  weatherObj.dailyWeatherVariables.dailyForecast.temperatureMin =
    dailyTemperatureMinMetric;

  localStorage.setItem("weather", JSON.stringify(weatherObj));

  return weatherObj;
}
function scrollToCurrentHour() {
  const currentHour = new Date().getHours();

  const targetElement = document.querySelector(
    `.container-hourly[data-hour="${currentHour}"]`,
  );

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } else {
    console.log("Elemento não encontrado:", currentHour);
  }
}

const boxWeatherInfoLoad = document.querySelector(".box-weather-info-load");
const valueCardWeather = document.querySelectorAll(".value-card-weather");
const ValueCardWeatherHyphen = document.querySelectorAll(
  ".value-card-weather-hyphen",
);
const day = document.querySelectorAll(".day");
const iconMinMaxTemperature = document.querySelectorAll(
  ".icon-min-max-temperature",
);
const boxMaxMinTemperature = document.querySelectorAll(
  ".box-max-min-temperature",
);
const boxHourlyTemperature = document.querySelectorAll(
  ".box-hourly-temperature",
);
const temperature = document.querySelectorAll(".temperature");
const selectedDay = document.getElementById("selected-day");

function loadingWeatherAPI() {
  const weatherInfo = document.getElementById("weather-info");

  weatherInfo.classList.add("hero-weather-info-loading");
  boxWeatherInfoLoad.classList.add("box-weather-info-loading");
  valueCardWeather.forEach((element, index) => {
    element.classList.add("value-card-weather-hidden-loading");
    ValueCardWeatherHyphen[index].classList.add(
      "value-card-weather-hyphen-loading",
    );
  });

  day.forEach((element, index) => {
    element.classList.add("day-loading");
    iconMinMaxTemperature[index].classList.add(
      "icon-min-max-temperature-loading",
    );
    boxMaxMinTemperature[index].classList.add(
      "box-max-min-temperature-loading",
    );
  });
  boxHourlyTemperature.forEach((element, index) => {
    element.classList.add("box-hourly-temperature-loading");
    temperature[index].classList.add("temperature-loading");
  });
  selectedDay.classList.add("selected-day-loading");
}
function cloasingLoadingWeatherAPI() {
  const weatherInfo = document.getElementById("weather-info");

  weatherInfo.classList.remove("hero-weather-info-loading");
  boxWeatherInfoLoad.classList.remove("box-weather-info-loading");
  valueCardWeather.forEach((element, index) => {
    element.classList.remove("value-card-weather-hidden-loading");
    ValueCardWeatherHyphen[index].classList.remove(
      "value-card-weather-hyphen-loading",
    );
  });

  day.forEach((element, index) => {
    element.classList.remove("day-loading");
    iconMinMaxTemperature[index].classList.remove(
      "icon-min-max-temperature-loading",
    );
    boxMaxMinTemperature[index].classList.remove(
      "box-max-min-temperature-loading",
    );
  });
  boxHourlyTemperature.forEach((element, index) => {
    element.classList.remove("box-hourly-temperature-loading");
    temperature[index].classList.remove("temperature-loading");
  });
  selectedDay.classList.remove("selected-day-loading");
}
const spanLoadingSearch = document.querySelector(".span-laoding-search");
let trueLoadingFieldSearch;
console.log(spanLoadingSearch);
function loadingFieldSearch() {
  // const spanLoadingSearch = document.getElementById("span-loading-search");
  // const spanImageVer = document.querySelector(".span-loading-image");
  // if (spanImageVer === null) {
  //   spanLoadingSearch.classList.add("box-city-name-row");
  //   spanLoadingSearch.classList.add("box-city-name-active");

  //   const spanImage = document.createElement("span");
  //   const spanLoadingParagrath = document.createElement("span");
  //   const img = document.createElement("img");

  //   spanImage.classList.add("span-loading-image");
  //   spanLoadingParagrath.classList.add("span-loading-paragrath");

  //   img.classList.add("icon-loading-search");
  //   spanLoadingParagrath.classList.add("paragrath-loading-search");

  //   img.src = "../../assets/images/icon-loading.svg";
  //   spanLoadingParagrath.textContent = "Search in progress";

  //   spanImage.appendChild(img);
  //   spanLoadingSearch.appendChild(spanImage);
  //   spanLoadingSearch.appendChild(spanLoadingParagrath);
  // }
  trueLoadingFieldSearch = true;
  spanLoadingSearch.classList.add("active-span-loading-search");
}

let finallyCloadingLoadingFieldSearch;

function cloasingLoadingFieldSearch() {
  // const boxCityName = document.querySelector(".box-city-name");
  // boxCityName.classList.remove("box-city-name-row");
  // const spanLoadingImage = document.querySelector(".span-loading-image");
  // const spanLoadingParagrath = document.querySelector(
  //   ".span-loading-paragrath",
  // );
  // spanLoadingImage.remove();
  // spanLoadingParagrath.remove();

  trueLoadingFieldSearch = false;
  spanLoadingSearch.classList.remove("active-span-loading-search");
  finallyCloadingLoadingFieldSearch = true;
}
export {
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
};
