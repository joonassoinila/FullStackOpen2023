const Person = ({props}) =>{
  return(
    <li>{props.name} {props.number}</li>
  )
}

const Persons = ({newFilter,persons}) =>{
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return(      
  <ul>
    {newFilter === ''
    ? persons.map(person =>{return(<Person key={person.name} props={person}></Person>)})
    : filteredPersons.map(person =>{return(<Person key={person.name} props={person}></Person>)})
  }
  </ul>)
}
export default Persons