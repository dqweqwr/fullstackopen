import { useState } from "react";
import { useCounter, useField } from "./hooks";

const Counter = () => {
  const counter = useCounter()

  return (
    <div>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>+</button>
      <button onClick={counter.decrease}>-</button>
      <button onClick={counter.zero}>0</button>
    </div>
  );
}

const LeftRight = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      {left.value}
      <button onClick={left.increase}>left</button>
      <button onClick={right.increase}>right</button>
      {right.value}
    </div>
  )
}

const Form = () => {
  const name = useField("text")
  const born = useField("date")
  const height = useField("number")

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.name.value)
    console.log(event.target.born.value)
    console.log(event.target.height.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        name:
        {" "}
        <input {...name} name="name" />
        <br />
        birthdate:
        {" "}
        <input {...born} name="born" />
        <br />
        height:
        {" "}
        <input {...height} name="height" />
        <button type="submit">submit</button>
      </form>
      <br />
      <div>
        name: {name.value}
        <br />
        birthdate: {born.value}
        <br />
        height: {height.value}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <>
      <Counter />
      <br />
      <LeftRight />
      <br />
      <Form />
    </>
  )
}

export default App;
