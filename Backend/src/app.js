const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())


app.get('/', (req, res) => {
    res.send('API - OLC1 Proyecto 1')
})


//Routes API
app.use(require('./routes/analisis.route'))


app.listen(3000, () => {
    console.log('Server on port 3000')
})