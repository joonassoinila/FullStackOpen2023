import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const MaxVotes = (props) =>{
  if (props.value !==0)
  return(<p>has {props.value} votes</p>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const points = new Array(anecdotes.length).fill(0);
  
  const [selected, setSelected] = useState(0)
  const [currentPoint, setPoint] = useState(points)
  const [maxIndex, setMaxIndex] = useState(-1)

  const handleClickNext = (props) =>{
    const updatedSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(updatedSelected)
  }
  const handleClickVote = (props) =>{
    const copy = [...currentPoint]
    copy[selected]+=1
    setMaxIndex(getMaxIndex(copy))
    setPoint(copy)
  }
  const getMaxIndex = (copy) =>{
    const maxValue = Math.max(...copy)
    if (maxValue !==0) {
      return(copy.indexOf(maxValue))
    }
    else{
      return(-1)
    }
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      has {currentPoint[selected]} votes
      <br></br>
      <Button handleClick={handleClickVote} text="vote"></Button>
      <Button handleClick={handleClickNext} text="next anecdote"></Button>
      <br></br>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <MaxVotes value={Math.max(...currentPoint)}></MaxVotes>

      
    </div>
  )
}

export default App