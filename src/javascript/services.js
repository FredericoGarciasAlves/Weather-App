import { searchWeather, searchLocation, searchCitys } from "./API.js";

async function transformWeather(weather, coordinates) {
  const formattedWeather = {
    hourlyWeatherVariable: {
      weatherCode: decodedWeatherCodeHourlyWeatherVariable(
        formattedHourlyWeatherVariableCode(weather.hourly.weather_code),
      ),
      temperature: formattedDailyWeatherVariablesTemperature(
        formattedHourlyWeatherVariableCode(weather.hourly.temperature_2m),
      ),
    },
    dailyWeatherVariables: {
      weatherCode: decodedWeatherCodeDailyWeatherVariables(
        weather.daily.weather_code,
      ),
      temperatureMean: formattedTemperatureAndWind(
        weather.daily.temperature_2m_mean,
      ),
      date: formattedDate(weather.daily.time),
      location: {
        city: coordinates.city,
        province: coordinates.state,
        country: coordinates.country,
      },
      dayMeanDetails: {
        apparentTemperatureMean: formattedTemperatureAndWind(
          weather.daily.apparent_temperature_mean,
        ),
        relativeHumidity: weather.daily.relative_humidity_2m_mean,
        windSpeed: formattedTemperatureAndWind(
          weather.daily.wind_speed_10m_mean,
        ),
        precipitationMean: weather.daily.precipitation_probability_mean,
      },
      dailyForecast: {
        temperatureMax: formattedTemperatureAndWind(
          weather.daily.temperature_2m_max,
        ),
        temperatureMin: formattedTemperatureAndWind(
          weather.daily.temperature_2m_min,
        ),
      },
    },
  };
  return formattedWeather;
}

async function transformCoordinates(coordinates) {
  return {
    city: processarLocalSeparado(coordinates.results).cidades,
    province: processarLocalSeparado(coordinates.results).estados,
    country: processarLocalSeparado(coordinates.results).paises,
  };
}

function processarLocalSeparado(results) {
  const cidades = [];
  const estados = [];
  const paises = [];

  const seen = new Set();

  results.forEach((e) => {
    const city = e.name;
    const state = e.admin1;
    const country = e.country;

    // regra: se cidade e estado forem iguais
    const estadoFinal = state === city ? "" : state;

    // chave única pra evitar duplicados
    const chave = `${city}|${estadoFinal}|${country}`;

    if (!seen.has(chave)) {
      seen.add(chave);

      cidades.push(city);
      estados.push(estadoFinal);
      paises.push(country);
    }
  });

  return { cidades, estados, paises };
}

// function arrayCidades(arrayCitys, cityAndCountry) {
//   return arrayCitys.map((e) => e[cityAndCountry]);
// }

function formattedHourlyWeatherVariableCode(weather) {
  const formattedWeatherCode = weather.reduce((acc, code, index) => {
    const groupIndex = Math.floor(index / 24);

    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(code);

    return acc;
  }, []);

  return formattedWeatherCode;
}

function decodedWeatherCodeDailyWeatherVariables(weatherCode) {
  const formattedWeatherCode = weatherCode.reduce((acc, element) => {
    switch (element) {
      case 0:
      case 1:
        acc.push("../../assets/images/icon-sunny.webp");
        break;

      case 2:
        acc.push("../../assets/images/icon-partly-cloudy.webp");
        break;

      case 3:
        acc.push("../../assets/images/icon-overcast.webp");
        break;

      case 45:
      case 48:
        acc.push("../../assets/images/icon-fog.webp");
        break;

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        acc.push("../../assets/images/icon-drizzle.webp");
        break;

      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        acc.push("../../assets/images/icon-rain.webp");
        break;

      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        acc.push("../../assets/images/icon-snow.webp");
        break;

      case 95:
      case 96:
      case 99:
        acc.push("../../assets/images/icon-storm.webp");
        break;
    }

    return acc;
  }, []);

  return formattedWeatherCode;
}

function decodedWeatherCodeHourlyWeatherVariable(weatherCode) {
  const formattedWeatherCode = weatherCode.map((elemento) => {
    return decodedWeatherCodeDailyWeatherVariables(elemento);
  });
  return formattedWeatherCode;
}

function formattedTemperatureAndWind(temperature) {
  const temperatureFormatted = temperature.map((element) => {
    return Number(element.toFixed(0));
  });

  return temperatureFormatted;
}

function formattedDailyWeatherVariablesTemperature(array) {
  return array.map((element) => {
    return formattedTemperatureAndWind(element);
  });
}

function formattedDate(date) {
  const arraySplitDate = date.map((element) => {
    return element.split("-");
  });

  const arrayFormattedDate = arraySplitDate.map((array) => {
    const arrayDate = array.map((element, index) => {
      if (index === 1 || index === 2) {
        if (element[0] === 0 || element[0] === "0") {
          return element[1];
        } else {
          return element;
        }
      }
      return element;
    });

    return arrayDate;
  });
  return arrayFormattedDate;
}
const main = document.querySelector(".main");
const errorSectionDesactived = document.querySelector(".error-section");

async function formattedWeather(city) {
  try {
    const coordinates = await searchLocation(city);
    const weather = await searchWeather(coordinates);

    const data = await transformWeather(weather, coordinates);

    // Fazer verificação nessas manipulações de classes

    // ✅ SUCESSO → ativa tela normal
    main.classList.remove("main-desactived");
    errorSectionDesactived.classList.add("error-section-desactived");

    return data;
  } catch (error) {
    // ❌ ERRO → ativa tela de erro
    main.classList.add("main-desactived");
    errorSectionDesactived.classList.remove("error-section-desactived");

    throw error;
  }
}

async function formattedCoordinates(city) {
  try {
    const coordinates = await searchCitys(city);
    const data = await transformCoordinates(coordinates);

    return data;
  } catch (error) {
    // 🔥 NÃO ativa tela de erro aqui
    return []; // retorna vazio em vez de quebrar a UI
  }
}
// function formatarLocalArray(e) {
//   const city = e.name;
//   const state = e.admin1;
//   const country = e.country;

//   // Se tiver estado e for diferente da cidade
//   if (state && state !== city) {
//     return [city, state, country];
//   }

//   // Se não tiver ou for igual
//   return [city, country];
// }

// function removerDuplicadosArray(arr) {
//   return arr.filter((item, index, self) => {
//     return (
//       index ===
//       self.findIndex((i) => JSON.stringify(i) === JSON.stringify(item))
//     );
//   });
// }
// function processarCidadesArray(results) {
//   const formatado = results.map(formatarLocalArray);
//   return removerDuplicadosArray(formatado);
// }
// const weather = await formattedWeather(
//   "Porto Alegre, Rio Grande do Sul, Brazil",
// );
const cord = await formattedWeather("Porto, Portugal");
console.log(JSON.stringify(cord));

export { formattedWeather, formattedCoordinates };
