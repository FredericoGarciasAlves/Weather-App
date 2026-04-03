// Pegando a API de tempo
async function searchWeather(cordinates) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${cordinates.latitude}&longitude=${cordinates.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_mean,precipitation_probability_mean,relative_humidity_2m_mean,wind_speed_10m_mean,temperature_2m_mean&hourly=temperature_2m,weather_code&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Erro na requisição");
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

// Busca Latitude e Longitude

async function searchCitys(cidade) {
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

async function searchLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.length) {
    throw new Error("Local não encontrado");
  }

  const result = data[0];
  const address = result.address;

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county || // fallback importante
    "";

  return {
    latitude: result.lat,
    longitude: result.lon,
    city,
    state: address.state || "",
    country: address.country || "",
  };
}

const cordinates = await searchLocation("Singapura, West Java, Indonesia");
console.log(JSON.stringify(cordinates));

export { searchWeather, searchLocation, searchCitys };
