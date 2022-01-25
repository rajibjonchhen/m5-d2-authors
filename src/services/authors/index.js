import express from "express";
import fs from 'fs'
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import uniqid from 'uniqid'


const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "authors.json")

// for creating

authorsRouter.post("/",(req,res)=>{

console.log("new post body",req.body)

const newAuthor = {...req.body, createdAt: new Date(), authorId: uniqid() }
console.log('the new author is',newAuthor)

const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
console.log(newAuthor)
authorsArray.push(newAuthor)

fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

res.status(201).send({ authorId: newAuthor.authorId })

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
    fs.writeFileSync(authorsJSONPath, JSON.stringify(updatedSingleAuthor))
    res.send(updatedSingleAuthor)
})

// for deleting the items
authorsRouter.delete("/:authorId",(req,res)=>{
    const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
    const newArray = authorsArray.filter(author => author.authorId !== req.params.authorId)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(newArray))
    res.status(204).send(newArray)
})
export default  authorsRouter