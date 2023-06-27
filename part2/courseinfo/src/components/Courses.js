const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => {
        return (
          <Part key={part.id}
            name={part.name} 
            exercises={part.exercises} 
          />
        )
      })}
    </div>
  )
}

const Total = ({ parts }) => {
  const num_exercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0)

  return (
    <h4>Number of exercises: {num_exercises}</h4>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => {
        return (
          <Course key={course.id} course={course}/>
        )
      })}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Courses
