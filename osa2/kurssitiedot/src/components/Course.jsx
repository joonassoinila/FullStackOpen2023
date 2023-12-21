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
  }
export default Courses