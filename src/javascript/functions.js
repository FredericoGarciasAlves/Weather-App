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
  console.log(typeof metodod);

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
  const $country = document.getElementById("country");
  const $day = document.getElementById("day");
  const $month = document.getElementById("month");
  const $numberDay = document.getElementById("number-day");
  const $year = document.getElementById("year");
  const $iconHero = document.getElementById("icon-temperature-hero-content");
  const $temperatureNow = document.getElementById("temperature-now");

  $city.textContent = weather.dailyWeatherVariables.location.city + ", ";
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

function dayAndDays(arrayDays, arrayDayliForecast) {
  const days = document.querySelectorAll(".days");
  const dayDailyForecast = document.querySelectorAll(".day");

  const selectedDay = document.querySelector("#selected-day");
  selectedDay.textContent = arrayDays[0];

  days.forEach((elementDay, index) => {
    elementDay.textContent = arrayDays[index];
  });

  dayDailyForecast.forEach((element, index) => {
    element.textContent = arrayDayliForecast[index];
  });
}

function preencherHourly(arrayTemperature, arrayIconTemperature) {
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
export {
  switchHeat,
  gerarOrdem,
  atualizarOrdemCaixaContainerDailyForecast,
  heroContent,
  dayAndDays,
  preencherHourly,
  preencherWeatherDetails,
  temperatureDayliForecast,
  scrollToCurrentHour,
};
