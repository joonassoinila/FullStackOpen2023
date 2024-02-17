import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import numberService from './services/numbers'

const SuccessNotification = ({message}) =>{
   if(message===null){
    return null
   }
   return(
    <div className="success">
      {message}
    </div>
   )
}
const ErrorNotification = ({message}) =>{
  if(message===null){
   return null
  }
  return(
   <div className="error">
     {message}
   </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() =>{
    numberService
    .getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
    })
  },[])
  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value) 
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  //Adds new persons to phonebook while evaluating if person already exists in the phonebook
  const addName = (event) =>{
    event.preventDefault()
    const updatedName = {name: newName, number: newNumber}
    var identicalPersonCount = persons.filter(function(person) {
      return person.name === newName
    })
    //Checks if current person already exists and if the number-field has a value. Last condition can be removed as well as next else if, in case no need for the second "is already added to phonebook"-message
    if (identicalPersonCount.length > 0 && newNumber!==null && newNumber.length>0){
      const personToUpdate = persons.find(p => p.name === updatedName.name)
      if (window.confirm(`${newName} has already been added to phonebook. Do you want to update the number?`)){
        numberService
        .update(personToUpdate.id,updatedName)
        .then(returnedName => {
          const updatedPersons = persons.map(p => p.id===returnedName.id ? returnedName : p)
          setPersons(updatedPersons)
          setNotificationMessage(`${newName} updated successfully`)
          setTimeout(() =>{setNotificationMessage(null)},2500)
        })
        //Catches exception on updating a person
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() =>{setErrorMessage(null)},2500)
        })
      }
      //Checks if person already exists in phonebook
    } else if (identicalPersonCount.length > 0){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      numberService
      .create(updatedName)
      .then(returnedName => {
        setPersons(persons.concat(returnedName))
      })
      setNotificationMessage(`${newName} added successfully`)
      setTimeout(() =>{setNotificationMessage(null)},2500)
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (id) => {
    numberService.deleteName(id).then(response => {
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={notificationMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter text="Filter shown with: " newFilter={newFilter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} onDelete={deletePerson}></Persons>
    </div>
  )

}

export default App