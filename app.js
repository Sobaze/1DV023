const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => console.log(`Ess applications listening on port ${port}!`))
app.get('/', (req, res) => res.send('NODE_ENV is set to : ' + process.env.NODE_ENV))
app.get('/error', (req,res) => {
        process.exit(1)
})
