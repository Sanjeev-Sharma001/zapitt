const express = require("express")
const noteRouter = require("./routes/noteRouter")
const userRouter = require("./routes/userRouter")
const dotenv = require("dotenv")

dotenv.config()
const app=express()
const mongoose = require("mongoose")

app.use(express.json())


app.use("/users",userRouter)
app.use("/note",noteRouter)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running");
    })
})
.catch((error)=>{
    console.log(error)
})
