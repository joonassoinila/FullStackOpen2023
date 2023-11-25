import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const { goodCount, neutralCount, badCount } = props
  const total = (goodCount + neutralCount + badCount)
  if (total > 0) {
    const avg = ((goodCount * 1 + neutralCount * 0 + badCount * -1) / total)
    const positive = ((goodCount / total * 100) + " %")
    return (
      <div>
        <p>good {goodCount}</p>
        <p>neutral {neutralCount}</p>
        <p>bad {badCount}</p>
        <p>all {total}</p>
        <p>average {avg}</p>
        <p> positive {positive}</p>
      </div>
    )
  }
  return (
    <div>No feedback given</div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClickGood = () => {
    console.log("added to good +1", good)
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleClickNeutral = () => {
    console.log("added to neutral +1", neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleClickBad = () => {
    console.log("added to bad +1", bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="Good"></Button>
      <Button handleClick={handleClickNeutral} text="Neutral"></Button>
      <Button handleClick={handleClickBad} text="Bad"></Button>
      <h1>statistics</h1>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad}></Statistics>
    </div >
  )
}

export default App