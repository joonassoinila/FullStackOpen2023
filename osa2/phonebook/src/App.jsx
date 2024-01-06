import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Arto Hellassa', number: '040-123456' },
    { name: 'Ada Lovelacea', number: '39-44-5323523' },
    { name: 'Dan Abramova', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value) 
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const updatedName = {name: newName, number: newNumber}
    var identicalPersonCount = persons.filter(function(person) {
      return person.name === newName
    })
    if (identicalPersonCount.length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(updatedName))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text="Filter shown with: " newFilter={newFilter} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons}></Persons>
    </div>
  )

}

export default App