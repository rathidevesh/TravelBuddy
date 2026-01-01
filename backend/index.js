const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config(); 

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

//setting up cors
app.use(cors())
app.use(express.json())


//using the middleWare - to run the contents in the request of the body.
app.use(express.json())

//Available Routes.
app.use('/api/auth',require('./routes/auth'))
app.use('/api/rent',require('./routes/rent'))
app.use('/api/Bookingsroute',require('./routes/Bookingsroute'))
app.use('/api/dashboard', require('./routes/dashboard'));


app.listen(port, () => {
  console.log(`travelBuddy backend listening at http://localhost:${port}`)
})