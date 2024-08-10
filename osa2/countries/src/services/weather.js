import axios from "axios"
const iconBaseUrl = 'https://openweathermap.org/img/wn/'

const generateUrl =(lat, lon, appId) =>{
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
}

const getCountryWeather = (lat, lon, appId) => {
    const generatedUrl = generateUrl(lat,lon,appId)
    const request = axios.get(generatedUrl)
    return request.then(response => response.data)
}

const getWeatherIcon = (iconCode) => {
    const iconUrl = (`https://openweathermap.org/img/wn/${iconCode}@2x.png`)
    return(iconUrl)
}

export default{getCountryWeather,getWeatherIcon}