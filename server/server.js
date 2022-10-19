const express = require('express')
const  router  = require('./routes/routes')
const core =  require('cors')
const morgan =  require('morgan')
var colors = require('colors');
const app = express()
// morgan logger middleware ---> pour afficher  les requests dans la console
app.use(morgan('dev'))
// cors middleware
app.use(core())
// express middleware
app.use(express.json())

// routes middleware
app.use('/api', router)
app.listen(5000, () => {console.log("Server started on port 5000")})