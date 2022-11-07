require('dotenv').config()
const express = require('express')
const dbConnection = require('./db')
const app = express()
const port = process.env.PORT||5500
const router=require('./routes')
const cors=require('cors')
const cookieparser=require('cookie-parser')

const corsOption={
  origin:["http://localhost:3000"],
  credentials: true,
}

app.use(cors(corsOption))
dbConnection()
app.use(cookieparser())
app.use(express.json({limit:"15mb"}))

app.use(router)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})