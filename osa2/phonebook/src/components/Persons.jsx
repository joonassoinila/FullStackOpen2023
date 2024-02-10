
const DeleteAlertFunction = ({onDelete, name, id}) => {
    if (window.confirm(`Do you want to delete ${name}?`)){
      onDelete(id)
    }
  }

const Person = ({name, number, onDelete}) =>{
  return(
    <li>{name} {number}<button type="submit" onClick={()=>DeleteAlertFunction({onDelete,name})}>delete</button></li>
  )
}

const Persons = ({newFilter, persons, onDelete}) =>{
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return(      
  <ul>
    {newFilter === ''
    ? persons.map(person =>{return(
    <Person 
    key={person.name} 
    name={person.name} 
    number={person.number}
    onDelete={() => onDelete(person.id)}
    ></Person>)})
    : filteredPersons.map(person =>{return(
    <Person 
    key={person.name} 
    name={person.name} 
    number={person.number}
    onDelete={() => onDelete(person.id)}
    ></Person>)})
  }
  </ul>)
}
export default Persons