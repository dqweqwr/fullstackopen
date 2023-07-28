const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  born: {
    type: Number,
    default: null,
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model("Author", schema)
