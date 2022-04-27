/**
 * Starting point for the application.
 *
 * @author Jonas Nilsson
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import hbs from 'express-hbs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import dotenv from 'dotenv'
import { router } from './routes/router.js'
dotenv.config()

import http from 'http'
import { Server } from 'socket.io'
import { closeIssues, openIssues } from './public/js/issuesState.js'

const app = express()
const PORT = process.env.PORT || 3000
const baseURL = process.env.BASE_URL || '/'

app.use(helmet())


app.use(express.urlencoded({ extended: false}))

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const directoryName = dirname(__filename)


// Configure rendering and setup view engine
app.engine('hbs', hbs.express4({
  defaultLayout: join(directoryName, 'views', 'layouts', 'default'),
  partialsDir: join(directoryName, 'views', 'partials')
}))

// View engines
app.set('view engine', 'hbs')
app.set('views', join(directoryName, 'views'))


// The static files to be served
app.use(express.static(join(directoryName, '/public')))

// Connection to webbsocket
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Client ' + socket.id + 'has connected')
  socket.on('disconnect', () => { 
    console.log('User disconnected ' + socket.id) })
    socket.on('open', (arg) => {
      openIssues(arg)
    } )
    socket.on('close', (arg) => {
      closeIssues(arg)
    } )
})

app.use((req, res, next) => {
  res.locals.baseURL = baseURL
  res.io = io
  next()
})

// Routes
app.use('/', router)

// Handling Errors. 404 errors.
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(directoryName, 'public', '404.html'))
})

// 403 forbidden errors or 500 errors.
app.use((err, req, res, next) => {
  if (err.message === '403') {
    return res
    .status(403)
    .sendFile(path.join(directoryName, 'public', '403.html'))
  } else {
    res.status(err.status || 500)
    res.send(err.message || 'Internal Server Error')
  }
})

server.listen(PORT, () => console.log(`The application is listening on port ${PORT}!`))
