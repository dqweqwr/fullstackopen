const jwt = require("jsonwebtoken")
const notesRouter = require("express").Router()
const Note = require("../models/note")
const User = require("../models/user")

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFhcm9uMSIsImlkIjoiNjRhNzQ5M2UwYTU3ZGMwOWIwOWFlNDAyIiwiaWF0IjoxNjg4Njg4OTQwfQ.mvxASrehBj3hDw_f1pXB2_C7WvzG0GEYaEG6RTh2Rfw"

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// create
notesRouter.post("/", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

// read
notesRouter.get("/", async (request, response) => {
  const notes = await Note
    .find({})
    .populate("user", { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// update
notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// delete
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
