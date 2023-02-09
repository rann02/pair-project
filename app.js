const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/', router)

app.listen(port, () => console.log(`listening in port, ${port}`))