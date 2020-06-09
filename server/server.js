const express = require('express')
const app = express()
const mongoose = require('mongoose')

// const { PORT, MONGO_URI } = 
require('./config/config')

let PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( require('./routes/usuario') )
let MONGO_URL = process.env.MONGO_URI
mongoose.connect(
  MONGO_URL, 
  {useNewUrlParser: true, useUnifiedTopology: true},
  (err, res) => {

  if(err) throw err

  console.log('DB conectada:', MONGO_URI)

})

app.listen(PORT, _ => {
  console.log('server on port', PORT)
})