import { searchWeather, searchCoordinates } from "./API.js";

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
        city: coordinates.results[0].name,
        country: coordinates.results[0].country,
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
async function formattedWeather(city) {
  const coordinates = await searchCoordinates(city);
  const weather = await searchWeather(coordinates);

  const data = await transformWeather(weather, coordinates);
  return data;
}

// const weather = await formattedWeather("Porto Alegre");

// console.log(weather);

export { formattedWeather };
