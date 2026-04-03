function switchHeat(heatMetric, heatImperial, checkmark, btnState) {
  heatMetric.forEach((element, index) => {
    // console.log(element.classList.contains("active-metric"));
    if (element.classList.contains("active-metric")) {
      element.classList.remove("active-metric");
      heatImperial[index].classList.add("active-imperial");

      // $checkmark[index].hidden = false;
    } else {
      element.classList.add("active-metric");
      heatImperial[index].classList.remove("active-imperial");
      // $checkmark[index] = true;
    }

    //   switch (element.classList.contains("active-two")) {
    //     case true:
    //       element.classList.toggle("active-two");
    //       break;
    //     case false:
    //       $heatMetric[index].classList.toggle("active-one");
    //       break;
    //   }
    // });
  });
  // console.log($heatMetric[0].classList.contains("active-metric"));
  if (heatMetric[0].classList.contains("active-metric")) {
    for (let i = 0; i < 6; i++) {
      checkmark[i].hidden = true;
    }
    for (let i = 0; i < 5; i = i + 2) {
      checkmark[i].hidden = false;
      console.log("disparando");
    }
  } else {
    for (let i = 0; i < 6; i++) {
      checkmark[i].hidden = false;
    }
    for (let i = 0; i < 5; i = i + 2) {
      checkmark[i].hidden = true;
    }
    console.log("disparando dobrado");
  }

  if (btnState.textContent === "Switch to Imperial") {
    btnState.textContent = "Switch to Metric";
  } else {
    btnState.textContent = "Switch to Imperial";
  }
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
  $province.textContent =
    weather.dailyWeatherVariables.location.province + ", ";
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

function fillHourly(arrayTemperature, arrayIconTemperature) {
  const temperature = document.querySelectorAll(".temperature");
  const iconTemperatureHourlyForecast = document.querySelectorAll(
    ".icon-temperature-hourly-forecast",
  );
  temperature.forEach((elementTemperature, index) => {
    elementTemperature.textContent = arrayTemperature[0][index] + "°";
  });

  iconTemperatureHourlyForecast.forEach((elementIcon, index) => {
    elementIcon.src = arrayIconTemperature[0][index];
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
function scrollToCurrentHour() {
  const hour = getCurrentHour();
  const formattedHour = formatHour(hour);

  const hours = document.querySelectorAll("#scroll-bar .hourly span.hourly");

  hours.forEach((element) => {
    if (element.textContent === formattedHour) {
      element.closest(".hourly").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}
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

function optionsCity(dataLocation, boxCityName, input) {
  if (!dataLocation || !dataLocation.city || input.value === "") {
    boxCityName.innerHTML = "";
    boxCityName.classList.remove("box-city-name-active");
    console.log("disparando");
    return;
  } else {
    boxCityName.classList.add("box-city-name-active");
  }
  const city = dataLocation.city;
  const province = dataLocation.province;
  const country = dataLocation.country;

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

export {
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
};
