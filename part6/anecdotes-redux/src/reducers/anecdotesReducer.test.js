import anecdotesReducer from "./anecdotesReducer";
import deepFreeze from "deep-freeze";

describe("anecdotesReducer", () => {
  test("action with type NEW_ANECDOTE creates new anecdote", () => {
    const state = [{
      content: "test anecdote",
      votes: 500,
      id: 1234
    }]

    const action = {
      type: "NEW_ANECDOTE",
      payload: {
        content: "new anecdote",
        votes: 300,
        id: 99999
      }
    }

    deepFreeze(state)
    const newState = anecdotesReducer(state, action)

    expect(newState.length).toBe(state.length + 1)
    expect(newState).toContainEqual(action.payload)
  })

  test("action with type VOTE adds one to anecdote vote count", () => {
    const state = [
      {
        content: "test anecdote",
        votes: 500,
        id: 1234
      },
      {
        content: "new anecdote",
        votes: 300,
        id: 99999
      }
    ]

    const action = {
      type: "VOTE",
      payload: {
        id: 99999
      }
    }

    deepFreeze(state)
    const newState = anecdotesReducer(state, action)

    expect(newState[0].votes).toBe(state[0].votes)
    expect(newState[1].votes).toBe(state[1].votes + 1)
  })

  test("most voted anecdotes will be placed first in store", () => {
    const state = [
      {
        content: "initially first",
        votes: 3,
        id: 1234
      },
      {
        content: "initially second",
        votes: 2,
        id: 99999
      },
      {
        content: "initially last",
        votes: 1,
        id: 55555
      }
    ]

    const action = {
      type: "VOTE",
      payload: {
        id: 55555
      }
    }

    deepFreeze(state)
    let voteOnce = anecdotesReducer(state, action)
    let voteTwice = anecdotesReducer(voteOnce, action)
    let voteThreeTimes = anecdotesReducer(voteTwice, action)

    expect(voteThreeTimes[0].id).toEqual(55555)
  })
})
