/**
 * Starting point for the application.
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

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", 'avatars3.githubusercontent.com'],
    styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
    scriptSrc: ["'self'", 'use.fontawesome.com', 'cdnjs.cloudflare.com'],
    blockAllMixedContent: true
  }
}))
// Connection to webbsocket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('Client ' + socket.id + 'has connected')
})
http.listen(port, () => console.log(`Ess applications listening on port ${port}!`))

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

// Handling Errors. 404 errors.
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', '404.html'))
})

// 403 forbidden errors or 500 errors.
app.use((err, req, res, next) => {
  if (err.message === '403') {
    return res
      .status(403)
      .sendFile(path.join(__dirname, 'public', '403.html'))
  } else {
    res.status(err.status || 500)
    res.send(err.message || 'Internal Server Error')
  }
})
