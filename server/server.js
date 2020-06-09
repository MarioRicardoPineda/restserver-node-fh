const express = require('express')
const app = express()
const mongoose = require('mongoose')

// const { PORT, MONGO_URI } = 
require('./config/config')

let PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use( require('./routes/usuario') )

mongoose.connect(
  process.env.MONGO_URI, 
  {useNewUrlParser: true, useUnifiedTopology: true},
  (err, res) => {

  if(err) throw err

  console.log('DB conectada:', MONGO_URI)

})

app.listen(PORT, _ => {
  console.log('server on port', PORT)
})