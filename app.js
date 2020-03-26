/**
 * Starting point for the real-time-application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const hbs = require('express-hbs')
const path = require('path')

const app = express()
const port = 3000

app.use(helmet())

// Configure rendering and setup view engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))

// View engines
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// The static files to be served
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/homeRouter'))

app.listen(port, () => console.log(`Ess applications listening on port ${port}!`))
