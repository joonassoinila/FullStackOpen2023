const Country = ({country, toggleData, clickFunction}) =>{
  const capital = country.capital
  const area = country.area
  const languages = Object.keys(country.languages)
  //const languages = country.languages.map(l => Object.values(l).join(','));
  const flag = country.flags.png

  const shownData = toggleData 
  ? 
  (
    <div><H1>{country.name.common}</H1>
    <p>capital {capital}</p>
    <p>area {area}</p>
    <br></br>
    {languages.map(l =><li>{l}</li>)}
    <picture>{flag}</picture>
    </div>
  )
  :<p>{country.name.common}<button onClick={clickFunction}>show</button></p>
    return(
      <li className="country">
        {shownData}
      </li>
    )
}
export default Country