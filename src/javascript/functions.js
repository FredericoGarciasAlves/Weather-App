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

function atualizarOrdemDiaCaixaDays(dateArray) {
  const diasSemana = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dia = [];

  dateArray.forEach((d) => {
    const data = new Date(d[0], d[1] - 1, d[2]);

    dia.push(diasSemana[data.getDay()]);
  });

  return dia;
}
function atualizarOrdemMonthHeroContent(arrayMonths) {
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

  let resultado = [];

  arrayMonths.forEach((d) => {
    const data = new Date(d[0], d[1] - 1, d[2]);

    resultado.push(meses[data.getMonth()]);
  });

  return resultado;
}
function atualizarOrdemCaixaContainerDailyForecast(arrayDate) {
  const date = atualizarOrdemDiaCaixaDays(arrayDate);
  let formattedDays = [];

  date.forEach((d) => {
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

export {
  switchHeat,
  atualizarOrdemDiaCaixaDays,
  atualizarOrdemCaixaContainerDailyForecast,
  atualizarOrdemMonthHeroContent,
  heroContent,
};
