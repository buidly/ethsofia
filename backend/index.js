const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const oracles = []

app.get('/oracles', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  res.json(oracles)
})

app.get('/oracles/:id', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const oracle = oracles.find(oracle => oracle.id === req.params.id)
  if (oracle) {
    res.json(oracle)
  } else {
    res.status(404).json({ error: 'Oracle not found' })
  }
})

app.post('/oracles', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const oracle = req.body
  oracles.push(oracle)
  res.json(oracle)
})

app.put('/oracles/:id', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const oracle = oracles.find(oracle => oracle.id === req.params.id)
  if (oracle) {
    Object.assign(oracle, req.body)
    res.json(oracle)
  } else {
    res.status(404).json({ error: 'Oracle not found' })
  }
})

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})