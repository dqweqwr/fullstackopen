import { useState } from "react";

const SelectedAnecdoteDisplay = ({ selectedAnecdote, numVotes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selectedAnecdote}</p>
      <p>has {numVotes} votes</p>
    </div>
  )
}

const MostVotedDisplay = ({ mostVotedAnecdote, numVotes }) => {
  if (typeof mostVotedAnecdote === "undefined") {
    return (
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>no votes have been put in yet</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <p>{mostVotedAnecdote}</p>
      <p>has {numVotes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(-1)

  const handleNextClick = () => {
    let randnum = selected
    while (randnum === selected) {
      randnum = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randnum)
  }

  const handleVoteClick = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    const updatedMostVoted = copy.indexOf(Math.max(...copy))
    setMostVoted(updatedMostVoted)
  }

  return (
    <div>
      <SelectedAnecdoteDisplay
        selectedAnecdote={anecdotes[selected]}
        numVotes={votes[selected]}
      />
      <Button handleClick={handleNextClick} text={"next anecdote"} />
      <Button handleClick={handleVoteClick} text={"vote"} />
      <MostVotedDisplay
        mostVotedAnecdote={anecdotes[mostVoted]}
        numVotes={votes[mostVoted]}
      />
    </div>
  );
}

export default App;
