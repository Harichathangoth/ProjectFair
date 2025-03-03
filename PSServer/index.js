
// Load .env file contents into process .env by default

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/router')
require('./DB/connection')

//Create express server

const pfserver = express()

pfserver.use(cors())
//Parse json
pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))
 

const PORT = 4000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(`Project Fair started Running at port:${PORT} and waiting for the client request!!!`)
})

pfserver.get('/',(req,res)=>{
    res.send('<h1>Project-fair server started and waitting for the client request!!!</h1>')
})

pfserver.post('/',(req,res)=>{
    res.send('post request')
})

pfserver.put('/',(req,res)=>{
    res.send('put request')
})