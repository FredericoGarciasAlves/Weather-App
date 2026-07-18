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

async function formattedCoordinates(city) {
  try {
    const coordinates = await searchCitys(city);

    const data = await transformCoordinates(coordinates);

    // espera 2 segundos

    // executa SOMENTE depois dos 2 segundos
    cloasingLoadingFieldSearch();

    return data;
  } catch (error) {}
}
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

async function optionsCity(boxCityName, input) {
  const dataLocation = await formattedCoordinates(input.value);
  if (input.value === "" || !dataLocation || !dataLocation.city) {
    boxCityName.innerHTML = " ";
    boxCityName.classList.remove("box-city-name-active");
    console.log("disparando");
    return;
  } else {
    boxCityName.classList.add("box-city-name-active");
  }
  const city = dataLocation.city;
  const province = dataLocation.province;
  const country = dataLocation.country;
  console.log(city);
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

const fieldSearch = document.getElementById("input-search");
const boxCityName = document.querySelector(".box-city-name");

// let verifyLoadingFieldSearch;
let isLoadingFieldSearch = false;

// function wait(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

fieldSearch.addEventListener("input", async () => {
  console.log("disparando evento de input");
  const inputValue = fieldSearch.value;
  const boxCityName = document.querySelector(".box-city-name");
  boxCityName.classList.remove("box-city-name-active");
  if (inputValue === "") {
    cloasingLoadingFieldSearch();
    return;
  }

  loadingFieldSearch();
  setTimeout(() => {
    cloasingLoadingFieldSearch();
    optionsCity(boxCityName, fieldSearch);
  }, 2000);

  // if (inputValue.length === 0) {

  // }
});
