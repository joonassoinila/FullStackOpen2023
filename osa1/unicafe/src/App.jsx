import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) =>{
  const { text, value } = props
  return(
    <p>{text} {value}</p>
  )
}

const Statistics = (props) => {
  const { goodCount, neutralCount, badCount } = props
  const total = (goodCount + neutralCount + badCount)
  if (total > 0) {
    const avg = ((goodCount * 1 + neutralCount * 0 + badCount * -1) / total)
    const positive = ((goodCount / total * 100) + " %")
    return (
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good" value={goodCount} ></StatisticLine></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" value={neutralCount} ></StatisticLine></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" value={badCount} ></StatisticLine></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" value={total} ></StatisticLine></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" value={avg} ></StatisticLine></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" value={positive} ></StatisticLine></td>
          </tr>
        </tbody>
      </table>
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