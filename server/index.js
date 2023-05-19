const express = require('express')
const userRouter = require('./routes/user.routes')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static('static'))
app.use('/api', userRouter)
app.use(fileUpload({}))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`working on ${PORT}`))