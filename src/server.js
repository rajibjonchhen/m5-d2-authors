import express from 'express'
import authorsRouter from './services/authors/index.js'
import listEndpoints from 'express-list-endpoints'

const server = express()
const port = 3001

server.use(express.json())
server.use("/authors", authorsRouter)

console.table(listEndpoints(server))

server.listen(3001,()=>{
    console.log(`the server is running in ${port}`) 
}) 