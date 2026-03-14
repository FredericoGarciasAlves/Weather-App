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

export { searchWeather, searchCoordinates };
