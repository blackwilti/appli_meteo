
const weatherIcons =  { 
    Rain: "wi wi-day-rain",
    Clouds: "wi wi-day-cloudy",
    Clear: "wi wi-day-sunny",
    Snow: "wi wi-day-snow",
    mist: "wi wi-day-fog",
    Drizzle: "wi wi-day-sleet",
} 
capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}


main = async () => {
    const ip = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_idJydwp2Va6gdXL4eAPAcpe176tOF&`)
    .then(resultat => resultat.json())
    .then(json =>  json.ip)

    const ville = await fetch(`http://api.ipstack.com/31.35.20.150?access_key=e94778bf7ad8466e46bf02b4f4fd36e4`)
    .then(resultat => resultat.json())
    .then(json => document.querySelector('#ville').textContent = json.city)
    
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=2f2bde283d34e657c028e1524df570b4&units=metric&lang=fr`)
    .then(resultat => resultat.json())
    .then(json => displayWeatherInfos(json))          
}
    
    displayWeatherInfos = (data) => {
    
    const name  = data.city.name;
    const temperature = data.list[data.list.length-1].main.temp;
    const conditions = data.list[data.list.length-1].weather[data.list[data.list.length-1].weather.length-1].description;
 
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(conditions);
    if(document.querySelector('icon')){
        document.querySelector('icon').className = weatherIcons[conditions];
    }  
}
main();

