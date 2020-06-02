const express = require('express')
const app = express()

const { PORT } = require('../config/config')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/usuario', (req, res) => {
  res.json('get usuario')
})

app.post('/usuario', (req, res) => {

  const body = req.body

  // Codigos de respuesta
  if(body.name === undefined) {
    res.status(400).json({
      ok: false,
      msg: "El nombre es necesario"
    })
  }

  res.json(body)
})

app.put('/usuario/:id', (req, res) => {
  const id = req.params.id
  res.json({id})
})

app.delete('/usuario/:id', (req, res) => {
  const id = req.params
  res.json({id})
})

app.listen(PORT, _ => {
  console.log('server on port', PORT)
})