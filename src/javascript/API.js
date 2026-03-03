// Pegando a API de tempo

async function searchWeather(cordinates) {
  try {
    // Pegando a URL
    // const url = `https://api.open-meteo.com/v1/forecast?latitude=${api.results[0].latitude}&longitude=${api.results[0].longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=,weather_code,temperature_2m&current=temperature_2m,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=America%2FSao_Paulo`;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${api.results[0].latitude}&longitude=${api.results[0].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,precipitation_probability_mean,wind_speed_10m_mean,relative_humidity_2m_mean&hourly=temperature_2m,weather_code`;
    // const url = `https://api.open-meteo.com/v1/forecast?latitude=${api.results[0].latitude}&longitude=${api.results[0].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,temperature_2m_mean,relative_humidity_2m_mean,precipitation_probability_mean,apparent_temperature_mean,wind_speed_10m_max&hourly=weather_code,temperature_2m&timezone=America%2FSao_Paulo&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
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
  // console.log(data.results[0].latitude);
  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  // console.log(data);
  // Retorna a data, o JSON no caso
  return data;
}

const dataSearchCordinates = await searchCoordinates("Por");

console.log(dataSearchCordinates);

async function rawAPI(city) {
  try {
    const coordinates = await searchCoordinates(city);
    const weather = await searchWeather(coordinates);
    return weather;
  } catch (error) {
    console.error(error.message);
  }
}

async function formattedWeather(city) {
  const coordinates = await searchCoordinates(city);
  const weather = await searchWeather(coordinates);

  const data = await transformWeather(weather, coordinates);
  return data;
}

async function transformWeather(weather, coordinates) {
  const formattedWeather = {
    dayMean: {
      temperatureMean: weather.daily.temperature_2m_mean,
      weatherCode: weather.daily.weather_code,
    },
    date: weather.daily.time,
    location: {
      city: coordinates.results[0].admin1,
      country: coordinates.results[0].country,
    },
    DayMeanDetails: {
      apparentTemeperatureMean: weather.daily.apparent_temperature_mean,
      relativeHumidity: weather.daily.relative_humidity_2m_mean,
      windSpeed: weather.daily.wind_speed_10m_max,
      precipitationMean: weather.daily.precipitation_probability_mean,
    },
    dailyForecast: {
      weatherCode: weather.daily.weather_code,
      temperatureMax: weather.daily.temperature_2m_max,
      temperatureMin: weather.daily.temperature_2m_min,
    },
    temeperatureDay: {
      weatherCode: formattedHourlyWeatherCode(weather),
      temperature: formattedhourlyTemperature(weather),
    },
  };

  return formattedWeather;
}

// function formattedDays(weather) {
//   const weatherCode = weather.hourly.weather_code;
//   console.log(weatherCode);
//   let arrayWeatherCode1 = [];
//   let arrayWeatherCode2 = [];
//   let arrayWeatherCode3 = [];
//   let arrayWeatherCode4 = [];
//   let arrayWeatherCode5 = [];
//   let arrayWeatherCode6 = [];
//   let arrayWeatherCode7 = [];

//   for (let index = 0; weatherCode.length > index; index++) {
//     if (index <= 6) {
//       arrayWeatherCode1.push(weatherCode[index]);
//     } else if (index > 6 && index <= 13) {
//       arrayWeatherCode2.push(weatherCode[index]);
//     } else if (index > 13 && index <= 20) {
//       arrayWeatherCode3.push(weatherCode[index]);
//     } else if (index > 20 && index <= 27) {
//       arrayWeatherCode4.push(weatherCode[index]);
//     } else if (index > 27 && index <= 34) {
//       arrayWeatherCode5.push(weatherCode[index]);
//     } else if (index > 3 && index <= 41) {
//       arrayWeatherCode6.push(weatherCode[index]);
//     } else if (index > 41 && index <= 48) {
//       arrayWeatherCode7.push(weatherCode[index]);
//     }
//   }
//   let formattedWeatherCode = [];
//   formattedWeatherCode.push(arrayWeatherCode1);
//   formattedWeatherCode.push(arrayWeatherCode2);
//   formattedWeatherCode.push(arrayWeatherCode3);
//   formattedWeatherCode.push(arrayWeatherCode4);
//   formattedWeatherCode.push(arrayWeatherCode5);
//   formattedWeatherCode.push(arrayWeatherCode6);
//   formattedWeatherCode.push(arrayWeatherCode7);
//   // const formattedWeatherCode = weatherCode.reduce((element, acc) => {

//   //   return acc.push();
//   // }, []);
//   return formattedWeatherCode;
// }

// REFATORAR

function formattedHourlyWeatherCode(weather) {
  const weatherCode = weather.hourly.weather_code;

  const formattedWeatherCode = weatherCode.reduce((acc, code, index) => {
    const groupIndex = Math.floor(index / 24);

    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }

    acc[groupIndex].push(code);

    return acc;
  }, []);

  return formattedWeatherCode;
}
function formattedhourlyTemperature(weather) {
  const temperature = weather.hourly.temperature_2m;
  const formattedWeatherCode = temperature.reduce((acc, code, index) => {
    const groupIndex = Math.floor(index / 24);

    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(code);

    return acc;
  }, []);

  return formattedWeatherCode;
}

// function formattedDaysTemperature() {}
const coordinates = await searchCoordinates("Porto Alegre");
const weather = await rawAPI("Porto Alegre");
const data = await formattedWeather("Porto Alegre");

// console.log(coordinates);
// console.log(data);
