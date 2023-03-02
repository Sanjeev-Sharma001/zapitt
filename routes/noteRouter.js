const express=require("express");
const { getNodes, createNode, updateNode, deleteNode } = require("../controllers/noteController");
const auth = require("../middlewares/auth");

const noteRouter = express.Router();

noteRouter.get("/",auth,getNodes)
noteRouter.post("/",auth,createNode)
noteRouter.put("/:id",auth,updateNode)
noteRouter.delete("/:id",auth,deleteNode)

module.exports=noteRouter

