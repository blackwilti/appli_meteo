const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}


function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}
async function main(){
  
  const ip = await fetch("https://geo.ipify.org/api/v2/country?apiKey=at_idJydwp2Va6gdXL4eAPAcpe176tOF&format=json")
    .then((resultat) => resultat.json())
    .then((json) => json.ip);
 
  const ville = await fetch(
    `http://api.ipstack.com/${ip}?access_key=d82c5e16dd0bf2ad8a5b189d4679eb0d`
  )
    .then((resultat) => resultat.json())
    .then((json) => json.city);
  
  const meteo = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=675676a6815a678c46bb033c60a9c39f&lang=fr&units=metric`
  )
    .then((resultat) => resultat.json())
    .then((json) => json);
 
  displayWeatherInfos(meteo);
}
function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent= Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector("i.wi").className = weatherIcons[conditions];
    document.body.className = conditions.toLowerCase();
}

main();

