const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err))

const oracleSchema = new mongoose.Schema({
  name: String,
  description: String,
}, { strict: false })

const Oracle = mongoose.model('Oracle', oracleSchema)

app.get('/oracles', async (req, res) => {
  try {
    const oracles = await Oracle.find()
    res.json(oracles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch oracles' })
  }
})

app.get('/oracles/:id', async (req, res) => {
  try {
    const oracle = await Oracle.findOne({ _id: req.params.id })
    if (oracle) {
      res.json(oracle)
    } else {
      res.status(404).json({ error: 'Oracle not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch oracle' })
  }
})

// Create a new oracle
app.post('/oracles', async (req, res) => {
  try {
    const oracle = new Oracle(req.body)
    await oracle.save()
    res.json(oracle)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create oracle' })
  }
})

app.put('/oracles/:id', async (req, res) => {
  try {
    const oracle = await Oracle.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    if (oracle) {
      res.json(oracle)
    } else {
      res.status(404).json({ error: 'Oracle not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update oracle' })
  }
})

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})
