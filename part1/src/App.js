const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}! You are {props.age} years old!</p>
    </div>
  )
}

const App = () => {
  const name = "Peter"
  const age = "10"
  // console.log("Hello from component");
  // const now = new Date()
  // const a = 10
  // const b = 20
  // console.log(now, a + b);
  return (
    // <div>
    //   <p>Hello world!, it is {now.toString()}</p>
    //   <p>{a} + {b} is {a + b}</p>
    // </div>
    <div>
      <h1>Greetings!</h1>
      <Hello name={name} age={age} />
      <Hello name="Daisy" age={26 + 10} />
    </div>
  );
}

export default App;
