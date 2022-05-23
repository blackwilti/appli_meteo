
const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}
capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}
// function toFahrenheit(C){
//     return F = 1.8 * C + 32;
//     }
main = async () => {
    const ip = await fetch('https://geo.ipify.org/api/v2/country?apiKey=at_idJydwp2Va6gdXL4eAPAcpe176tOF&ip=31.35.20.150')
    .then(resultat => resultat.json())
    .then(json =>  json.ip)

    const ville = await fetch('https://timezoneapi.io/api/ip/?token=afuNWmdKyznytuVNLmgJ')
    .then(resultat => resultat.json())
    .then(json => json.city)
    
    const meteo = await fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2f2bde283d34e657c028e1524df570b4&units=metric&lang=fr')
    .then(resultat => resultat.json())
    .then(json => json)

    displayWeatherInfos(meteo);         
}

    displayWeatherInfos = (data) => {
    console.log(data);
    const name = data.city.name;
    const temperature = data.list[data.list.length-1].main.temp;
    const conditions = data.list[data.list.length-1].weather[data.list[data.list.length-1].weather.length-1].description;
    
    
    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(conditions);
    document.querySelector('i .wi').className = weatherIcons[conditions];
}
main();

