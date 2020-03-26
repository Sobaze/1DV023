/**
 * Starting point for the real-time-application
 * 
 * @author Jonas Nilsson
 * @version 1.0.0
 */
'use strict'

const express = require('express')
const helmet = require('helmet')
const hbs = require('express-hbs')

const app = express()
const port = 3000

app.use(helmet())

app.listen(port, () => console.log(`Ess applications listening on port ${port}!`))
app.get('/', (req, res) => res.send('NODE_ENV is set to : ' + process.env.NODE_ENV))
app.get('/error', (req,res) => {
        process.exit(1)
})
