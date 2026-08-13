// testApp exports the Express app without listening, for tests
const express = require('express')
const app = express()

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const tasksRouter = require('./routes/tasks')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(logger)
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) return res.status(415).json({ error: 'Content-Type must be application/json' })
  }
  next()
})

app.use('/tasks', tasksRouter)
app.use((req, res) => res.status(404).json({ error: 'Not Found' }))
app.use(errorHandler)

module.exports = app
