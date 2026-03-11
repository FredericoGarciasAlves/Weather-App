// Pegando a API de tempo

async function searchWeather(cordinates) {
  try {
    // Pegando a URL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cordinates.results[0].latitude}&longitude=${cordinates.results[0].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,precipitation_probability_mean,relative_humidity_2m_mean,wind_speed_10m_mean,temperature_2m_mean&hourly=temperature_2m,weather_code&timezone=auto`;
    // Esperando a resposta da URL com fetch
    const response = await fetch(url);

    // Se tiver algum erro na resposta é enviado o erro pro catch
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    // Retorna a reposta em formato JSON
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
  }
}

// Busca Latitude e Longitude

async function searchCoordinates(cidade) {
  // Pega a URL e coloca o nome da cidade enrolada com encodeURIComponent
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cidade,
  )}&count=4&language=eng&format=json`;

  // Espera a resposta da API com fetch,  passando como parâmetro pro fetch a URL que foi armazenada na constante anterior
  const response = await fetch(url);

  // Pega a resposta e espera um JSON
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  return data;
}

async function formattedWeather(city) {
  const coordinates = await searchCoordinates(city);
  const weather = await searchWeather(coordinates);

  const data = await transformWeather(weather, coordinates);
  return data;
}

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
      date: weather.daily.time,
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
      return element[1];
      // if (index === 1) {
      //   if (element[0] === 0 || element[0] === "0") {
      //     // return element.splice(1, 3);
      //   }
      // }
    });

    return arrayDate;
  });
  return arrayFormattedDate;
}
const weather = await formattedWeather("Porto Alegre");

console.log(formattedDate(weather.dailyWeatherVariables.date));

export { formattedWeather };
