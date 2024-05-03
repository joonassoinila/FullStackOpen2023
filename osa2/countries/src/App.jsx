import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const Country = ({countryJObject}) => {
  if(countryJObject===null){
    return null
  }
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
      </div>
    )
}

const CountryList = ({countryArray}) => {
  length = countryArray.length
  switch (true) {
    case length >= 10:
      return("Too many countries, set filter")
    case length>1 && length<10:
       return(countryArray.map(c => <li key={c.name.common}>{c.name.common}</li>))
    case length===1:
        return(countryArray.map(c => <Country key={c.name.common} countryJObject={c}/>))
    default:
      return("No countries found with filter")
  }
  /*countryArray.length >= 10
    ? "Too many countries, set filter"
    : countryArray.length
    countryArray.map(c => <li key={c.name.common}>{c.name.common}</li>)*/
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState("")
  const [shownCountries, setShownCountries] = useState([])

 //Importattu funktio, joka hakee kaikki maat palvelimelta
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