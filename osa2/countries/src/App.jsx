import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Country = ({countryJObject}) => {
  
  if(countryJObject===null){
    return null
  }

  const countryLat = countryJObject.latlng[0]
  const countryLong = countryJObject.latlng[1]
  const key = import.meta.env.VITE_REACT_WEATHER_API_KEY

    return(
      <div>
        <h1>{countryJObject.name.common.value}</h1>
        <p>capital: {countryJObject.capital}</p>
        <p>area: {countryJObject.area}</p>
        <br></br>
        <h2>languages:</h2>
        {(Object.values(countryJObject.languages)).map(l => <li key={l}>{l}</li>)}
        <br></br>
        <img src={countryJObject.flags.png} alt={countryJObject.name.common}></img>
        <br></br>
        <WeatherComponent countryLat={countryLat} countryLong={countryLong} weatherKey={key}/>
      
        
      </div>
    )
  }
const CountryList = ({countryArray}) => {
  //Tila, jonka perusteella avataan maan koko näkymä klikatessa
  const [openIndex, setOpenIndex] = useState(null)
  length = countryArray.length

  useEffect (() => {
    setOpenIndex(null);
  },[countryArray])

  //
  const handleShowCountry = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  switch (true) {
    case length >= 10:
      //Palauttaa tekstin liian monesta maasta
      return("Too many countries, set filter")
    case length>1 && length<10:
      //Palauttaa vaihtoehtoisen maa-componentin jos nappia painetaan.
       return(countryArray.map((c, index) => openIndex === index 
        ?<Country key={c.name.common} countryJObject={c}/>
        :<li key={c.name.common}>{c.name.common}<button onClick={() =>handleShowCountry(index)}>show</button></li>))
    case length===1:
      //Näyttää yhden maan
        return(countryArray.map(c => <Country key={c.name.common} countryJObject={c}/>))
    default:
      return("No countries found with filter")
  }
}

function WeatherComponent({ countryLat, countryLong, weatherKey}) {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //Muutettu omaan async-funktioon. Ongelmana ollut pending-tila promisen kanssa
  useEffect(() =>{
    async function getWeatherData() {
      try {
        //Hakee weatherJObjectin maan sijainnin perusteella
        const weatherJObject = await weatherService.getCountryWeather(countryLat, countryLong, weatherKey);
        const countryTemperature = weatherJObject.main.temp;
        console.log('Weath',weatherJObject)
        const countryWind = weatherJObject.wind.speed;
        //Hakee weatherJObjectin perusteella sää-iconin
        const weatherIconCode = await weatherJObject.weather[0].icon;
        const weatherIconSrc = weatherService.getWeatherIcon(weatherIconCode)
        setWeatherData({countryTemperature, countryWind, weatherIconSrc, weatherIconCode})
      } catch (error){
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    //Funktion kutsuminen lopussa
    getWeatherData();

  },[countryLat, countryLong, weatherKey]);
  //Ehdollinen renderöinti --> poistaa aiemmat ongelmat pending-promisen kanssa
  if (loading) {
    return <div>ladataan...</div>
  }
  if (error){
    return<div>Error: {error.message}</div>
  }
  if (!weatherData){
    return <div>Ei tietoja saatavilla</div>
  }
  return(
    <div>
    <p>temperature {weatherData.countryTemperature}</p>
    <p>wind {weatherData.countryWind}</p>
    <img src={weatherData.weatherIconSrc} alt={weatherData.weatherIconCode}/>
    </div>
  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState("")
  const [shownCountries, setShownCountries] = useState([])

 //Hakee kaikki maat palvelimelta
  useEffect(() =>{
    countryService
    .getAll()
    .then(initialCountries =>{
      setCountries(initialCountries)
    })
  },[])

  const handleSearchChange = (event) => {
    const searcedText = event.target.value
    setSearchText(searcedText)
    setShownCountries(filterCountries(searcedText))
  }

  const filterCountries = filter =>{
    const tempCountries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    return tempCountries
  }

  return (
    <div>
      <form>
      <p>Find countries</p>
      <input value ={searchText} onChange={handleSearchChange}></input>
      </form> 
      <br></br>
      {<CountryList countryArray={shownCountries}/>}
    </div>
  )
}


export default App