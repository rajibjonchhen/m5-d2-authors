import express from "express";
import fs from 'fs'
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from 'uniqid'


const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "authors.json")


// for checking email 
authorsRouter.get("/checkEmail/:email",(req,res)=>{
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

    const emailTaken = (authorsArray.find(author => author.email === req.params.email? true:false)? true:false)

    res.status(201).send(emailTaken)
})
// for creating

authorsRouter.post("/",(req,res)=>{

console.log("new post body",req.body)

const newAuthor = {...req.body, createdAt: new Date(), authorId: uniqid() }
console.log('the new author is',newAuthor)

const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));

let statusCode =''
let msg=''
const isEmailTaken = (authorsArray.find(author => author.email === newAuthor.email))? true:false
if(isEmailTaken !== true){
    authorsArray.push(newAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
    msg = `successfully created with authorId ${newAuthor.authorId}`
    statusCode = '201'
} else {
    msg = 'email already registered'
    statusCode = '401'

}


res.status(statusCode).send(msg)

})
// for getting the list
authorsRouter.get("/",(req,res)=>{
const fileContent = fs.readFileSync(authorsJSONPath)
const authorsArray = JSON.parse(fileContent) 
res.status(200).send(authorsArray)
})


// for getting  the individual items
authorsRouter.get("/:authorId",(req,res)=>{
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
const singleAuthor = authorsArray.find(author=> author.authorId === req.params.authorId)
res.send(singleAuthor)
})

// for editing the information
authorsRouter.put("/:authorId",(req,res)=>{
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const index = authorsArray.findIndex(author => author.authorId === req.params.authorId)
    const singleAuthor = authorsArray[index]
    const updatedSingleAuthor = {...singleAuthor, ...req.body, updatedAt: new Date()}

    let statusCode =''
    let msg=''
    const isEmailTaken = authorsArray.find(author => author.email === updatedSingleAuthor.email)? true:false
    if(!isEmailTaken){
    authorsArray[index] = updatedSingleAuthor
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))
    msg = `successfully updated`
    statusCode = '204'
} else{
    msg = 'cannot be updated email already registered'
    statusCode = '401'
}
res.status(statusCode).send(msg)
})

// for deleting the items
authorsRouter.delete("/:authorId",(req,res)=>{
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const newArray = authorsArray.filter(author => author.authorId !== req.params.authorId)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(newArray))
    res.status(204).send(newArray)
})




export default  authorsRouter