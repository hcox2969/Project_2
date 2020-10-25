const mongoose = require('mongoose')
const Schema = mongoose.Schema

const operaSchema = new Schema ({
  name: String,
  composer: String,
  year_written: Number,
  characters: Array,
  famous_performers: Array,
  arias: Array
},
{timestamps: true}
)

const Opera = mongoose.model('Opera', operaSchema)

module.exports = Opera
