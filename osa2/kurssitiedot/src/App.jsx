
import Courses from './components/Course'

/*
const Courses = ({courses}) =>{
  return(
    courses.map(course => <Course key={course.id} course={course}></Course>)
  )
}

const Course = ({course}) =>{
  return(
    <div>
      <h1>{course.name}</h1>
      <Parts parts={course.parts}></Parts>
      <Content parts={course.parts}></Content>
    </div>
  )
}

const Parts = ({parts})=>{
  return(
    parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  )
}

const Content = ({parts}) => {
  var sum = parts.reduce(function(sum,part){
    return(
      sum + part.exercises
    )
  },0)
  
  return(
    <p>total of {sum} exercises</p>
  )
}*/
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Courses courses={courses}></Courses>
    </div>
  )
}

export default App