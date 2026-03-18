# Projeto

## Objetivo

Completar o projeto.

## Planejamento

1. Carregando a página carrega os dados de temperatura com os dados de API.
2. Caso ocorra um erro ao carregar a API a seção principal some e aparece uma mensagem descrevendo o problema.
3. Fazer a busca no campo de entrada mostra a barra “search in progress” abaixo da campo de busca junto com um icone, após carregar a caixa abaixo, mostra as quatro cidades encontradas.
4. Após clicar na cidade carregar as caixas que entrarão os dados das temperaturas, a caixa “left content” carrega “icone” de loading, e limpa a maioria das outras caixas ou fica um traço.
5. Caso ocorra um erro na pesquisa no motor de busca aparece uma mensagem “No search results found!”
6. Clicando na caixa units abrir a caixa switch to imperial
7. Após clicar em alguma das opções disponíveis que não estão selecionadas , mudar para imperial caso metric esteja selecionada ou para metric caso imperial esteja selecionada.
8. Na caixa hourly forecast carrega as ordens dos dias são dispostos apartir do dia que foi aberto o site
9. Selecionando os dias muda os dados temperaturas e os icones) mostrados para o dia selecionado corresponde.
10. Site deve ser responsivo e conter todos os estados de hover e focus.

## Algoritimos

1. Carregando a página carrega os dados de temperatura com os dados de API.
   1. Todos os dados de temperatura e icones devem ser atualizados quando carregar a página para a data e horario atual referente na localização de Berlin Germany.
      1. Pegar a API meteo com uma função assíncrona ✅
         1. A API open meteo precisa de longitude e latitude: ✅
            1. Usar uma API que busque a longitude e latitude de localização mundial. ✅
         2. A API open meteo precisa buscar a temperatura com horario local do cliente ✅
      2. Tratar a API: ✅
         1. O objeto **hourlyWeatherVariable**: ✅
            1. objeto **weatherCode** deve conter os elementos do caminho das chaves _hourly.weather_code_ da API open meteo. ✅
               1. O objeto **weatherCode** deve conter os arrays com 7 elementos, dentro em cada um desses 7 elementos contendo separados por ordem da API 24 caminhos dos icones referênte ao código, apontando para dentro das pastas que contém os icones. ✅
            2. O objeto **temperature** deve conter os elementos do caminho das chaves _hourly.temperature_2m_ da API open meteo: ✅
               1. O objeto **temperature** deve conter o array filtrado da API ordináriamente contendo 7 elementos, dentro de cada um desses elementos deve conter 24 temperaturas formatadas em 2 casas de números. ✅
         2. O objeto **dailyWeatherVariables**:
            1. O objeto **weatherCode** deve conter os elementos do caminho _daily.weather_code_ do retorno da API Open meteo.✅
               1. O objeto **weatherCode** deve conter sete elementos, dentro de cada um desses elementos conter o caminho apontando para as pasta que contém o icone referênte ao código da API Open meteo. ✅
            2. O objeto **temperatureMean** deve conter os sete elementos do caminho do retorno da API Open meteo _daily.temperature_2m_mean_: ✅
               1. O objeto **temperatureMean** deve conter os seus elementos formantados para exibir somente duas casas decimais de temperatura. ✅
            3. O objeto **date** deve conter os elementos do caminho _daily.time_ da API Open meteo: ✅
               1. O objeto **date** deve ser formatado para as datas de meses e dias que vierem em formato com zero na frente, deve ser removido o zero da primeira casa decimal. ✅
            4. O objeto **location** deve conter dois objeto dentro: ✅
               1. O objeto **city** deve conter o caminho do retorno da API Geocoding open meteo _. ✅_
               2. O objeto **province** deve conter o caminho do retorno da API Geocoding open meteo*. ✅*
               3. O objeto **country** deve conter o caminho do retorno da API Geocoding open meteo. ✅
            5. O objeto **dayMeanDetails** deve conter 4 objetos: ✅
               1. O objeto **apparentTemperatureMean** contendo o caminho _daily.apparent_temperature_mean_ da API open meteo. ✅
                  1. O objeto **apparentTemperatureMean** deve conter os dados em formato de duas casas decimais. ✅
               2. O objeto **relativeHumidity** deve conter o caminho _daily.relative_humidity_2m_mean_ da API open meteo. ✅
               3. O objeto **windSpeed** deve conter o caminho da API open meteo _daily.wind_speed_10m_mean . ✅_
                  1. O objeto **windSpeed** deve conter os seu dados formatos em duas casas decimais. ✅
               4. O objeto **preciptationMean** deve conter o caminho _daily.precipitation_probability_mean_ da API Open meteo. ✅
            6. O objeto **dailyForecast** deve conter dois objetos dentro: ✅
               1. O objeto **temperatureMax** deve conter o caminho _daily.temperature_2m_max_ da API Open meteo. ✅
                  1. Os dados devem ser formatados em duas casas decimais.✅
               2. O objeto **temperatureMin** deve conter o caminho _daily.temperature_2m_min_ da API Open meteo. ✅
                  1. Os dados devem ser formatados em duas casas decimais. ✅
      3. Preecher o DOM com os dados correspondente a cada caixa ao carregar a página conforme está o prototypo no Figma. ✅
         1. Ordenar as caixas com a classes days e day para o dia correspondendo ao dia atual a sua ordem. ✅
         2. Todos os as caixas que exibim dados de dia deve ser usado o dia atual na abertura da página. ✅
         3. A caixa “container-temperature-day” deve ser exibido o horario atual do dia no carremento da página ✅
         4. Preencher a caixa “container-weather-details” ✅
         5. Hero Content
            1. Em caso de pesquisa existir dois resultado com a mesma cidade e o mesmo País, colocar o Estado após o nome da cidade.
2. Erro na API.✅
   1. Caso ocorra um erro ao carregar a API a seção principal some e aparece uma mensagem descrevendo o problema.✅
      1. Fazer a estrutura no arquivo HTML em baixo da tag main. ✅
      2. Fazer a estilização. ✅
      3. O layout deve aparecer caso a API open meteo ou a API geocoding open meteo retornarem um erro acima de 400 e abaixo de 599, no caso ao carregar a página ou ao fazer a pesquisa.✅
      4. Botão “retry”✅
         1. Caso não houver uma pesquisa, recarregar a página com a localização de Berlin, Germany ✅
         2. Caso ouver feito a pesquisa no campo de busca, carregar a página, com a entrada que o cliente digitou no campo de busca.✅
3. Motor de busca.
   1. Quando digitar no campo de busca aparecer as cidades que a API Geocoding meteo retorna como resultado da requisição. São 4 cidades que devem aparecer em baixo do campo de busca
      1. Quando começar a digitar e estiver carregando a requisição da API Geocoding e ainda não tiver retorno, é para aparecer um campo abaixo com um icone e o campo com a mensagem “Search in progress”
   2. Quando for clicado em algum desses campos, ou, for digitado enter quando o campo estiver preenchido com algum nome de cidade no campo de busca, mostrar a tela de carregamento, campos sáo modificados, fazer correspondente a screen “Loading state” do Figma.
   3. Se o resultado não for encontrado aparecer a seção do FIGMA “No results”.

## Estrutura do Projeto

## Project Status

Projeto em desenvolvimeto

### Progress

- Progresso na finalização do tratamento dos dados da API, está faltando detalhes.
- Ajuste nos IDs HTML
- Ajuste na documentação sobre como devem ser dispostos as chaves e valores da API formatada.
- Formatação da requisição da API para até o passo de coloca-la a carregar a página foi feita
- Modulariação na separação das funções de tratamento da API e separação da requisição da API
- Novas funções adicionanadas no arquivo function.js
  - Funções referênte ao preencchimento dos dados do hero-content
- Finalizada o preencimento bruto de hero-content.
- Forão feitas uma ou duas modificações no HTML refer`^ente a IDs e estilos no CSS.
- Finalizado parcialmente o tratamento de erro.
- Motivo de eu estar colocando também os estados junto a pesquisa e ao resultado é que existe várias cidades ao redor do mundo com o mesmo nome

### Finalizado ao carregar a página ser preenchido com os dados da API Open meteo.

Ajustes no ID HTML / mexer na documentação e ajustar a formatação da API novamente.

### Current Features

- Projeto estático.✅
- Preenchimento da página ao carregar com os dados da API na localização de Berlin, Germany.✅
- Tratamento de erro da API em caso de algo der errado.✅
- Motor de busca.

### Problems / Challenges

- Desafio do tratamento dos dados da API, como fazer para cortar o zero nos primeiros 9 dias do mês que vem da API.
- Desafio de como fazer a caixa de hourly forecast aparecer o horario atual, até agora eu náo entendi como o código da scroll bar se coporta, o motivo, ainda não pesquisei qual o cóidigo que foi implementado.
- Desafio de como tratar os erros status da API.
- Desafio em como fazer aparecer e sumir a seção de erro.

### Next Steps

- Atualizar a documentação para ficar correspondente ao que foi feito no projeto. ✅
- Finalizar o tratamento dos dados da API, para preenchimento no carregar a página ✅
- Separar responsabilidades de tratamento da API e a requisição da API. ✅
- Fazer a refatoração das variáveis que transformão os dados de dias para o preenchimento dos dias de hourly forecast e daily forecast.✅
- Atualizar o documento do preenchimento ao carregar da API✅
- Bug ao carregar a página, mostrar a temperatura da hora atual na caixa “container-temperature-day”
- Mecher na documentação sobre o tratamento da API referênte Estado.✅
- Em caso de dois resultado com a mesma cidade e o mesmo País, colocar o Estado após o nome da cidade. ✅
- GET http://127.0.0.1:5501/src/html/undefined 404 (Not Found), Erro esquisito que eu não sei aonde que aconteceu.
- Resolver o tratamento de erro ao pesquisar na API Geocoding ou na Open meteo.

# Motivos

## Estado

O motivo de eu adicionar o estado, ocorreu porque, em alguns lugarem temos cidades estado, por exemplo Berlin, Nesse caso ficaria dificil saber qual a cidade no motor de busca, e por questões saudozistas optei por colocar além do motor de busca, nos resultados da pesquisa. Imaginei o seguinte fator, se pesquisou em um site de temperatura global é mais uma questão de uma “estrelinha destacada no mar de possibilidades”, e pra uma cidade de onde eu venho bem antiga joga um ar de saudozismo.
