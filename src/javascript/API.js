// Pegando a API de tempo
async function searchWeather(cordinates) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cordinates.results[0].latitude}&longitude=${cordinates.results[0].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,precipitation_probability_mean,relative_humidity_2m_mean,wind_speed_10m_mean,temperature_2m_mean&hourly=temperature_2m,weather_code&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Erro na requisição");
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

// Busca Latitude e Longitude

async function searchCoordinates(cidade) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=4&language=eng&format=json`;

  const response = await fetch(url);
  const coordinates = await response.json();

  if (!coordinates.results || coordinates.results.length === 0) {
    const error = new Error("Cidade não encontrada");
    error.status = 404;
    throw error;
  }

  return coordinates;
}

// const cordinates = await searchCoordinates("singapura");
// console.log(JSON.stringify(cordinates));

export { searchWeather, searchCoordinates };
