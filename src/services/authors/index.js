import express from "express";

const authorsRouter = express.Router()

authorsRouter.post("/",()=>{})
authorsRouter.get("/",()=>{})
authorsRouter.get("/:authorId",()=>{})
authorsRouter.put("/:authorId",()=>{})
authorsRouter.delete("/:authorId",()=>{})
export default  authorsRouter