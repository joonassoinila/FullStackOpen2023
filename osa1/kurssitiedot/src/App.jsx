const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header header={course} />
      <Content parts={parts} />
      <Total name="Number of exercises" totalexercises={parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}




const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map((value, index) => (
        <p key={index}>{value.name} {value.exercises}</p>
      ))}
    </div>
  )
}

const Total = (props) => {
  const { name = "Number of exercises" } = props

  return (
    <p>{props.name} {props.totalexercises}</p>
  )
}


export default App