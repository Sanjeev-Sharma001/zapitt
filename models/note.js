const mongoose=require("mongoose")

const noteSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    completed:{
        type: Boolean,
        required:true
    },

},{timestamps:true})

module.exports  = mongoose.model("Note",noteSchema);