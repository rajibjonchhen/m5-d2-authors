import express from "express";
import res from "express/lib/response";

const authorsRouter = express.Router()

// for creating
authorsRouter.post("/",(req,res)=>{
    res.send('hello')
})

// for getting the list
authorsRouter.get("/",()=>{})

// for getting  the individual items
authorsRouter.get("/:authorId",()=>{})

// for editing the information
authorsRouter.put("/:authorId",()=>{})

// for deleting the items
authorsRouter.delete("/:authorId",()=>{})
export default  authorsRouter