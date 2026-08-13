const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const tasksRouter = require('./routes/tasks')
const cors = require('cors')

// Built-in JSON parser
app.use(express.json())

// CORS
app.use(cors())

// Logging
app.use(logger)

// Require JSON Content-Type for POST/PUT
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' })
    }
  }
  next()
})

// Mount tasks router at /tasks
app.use('/tasks', tasksRouter)

// 404 for other routes
app.use((req, res) => res.status(404).json({ error: 'Not Found' }))

// Global error handler (last)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Task API running on port ${PORT}`))
