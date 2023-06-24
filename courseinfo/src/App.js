const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(c => {
        return (<Part name={c.name} exercises={c.exercises} />)
      })}
    </div>
  )
}

const Total = (props) => {
  const num_exercises = props.course.parts.reduce((result, item) => {
    return result + item.exercises;
  }, 0)

  return (
    <p>Number of exercises: {num_exercises}</p>
  )
}

function App() {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      },
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

export default App;
