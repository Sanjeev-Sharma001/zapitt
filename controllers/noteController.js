const noteModel = require("../models/note");

const createNode = async(req,res)=>{

    const {name, description,completed} = req.body;

    const newNote = new noteModel({
        name: name,
        description : description,
        userId : req.userId,
        completed:completed

    });

    try {
        
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const updateNode = async(req,res)=>{
    const id = req.params.id;
    const {name, description,completed} = req.body;

    const newNote = {
        name : name,
        description: description,
        userId : req.userId,
        completed:completed
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, {new : true});
        res.status(200).json(newNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const deleteNode = async(req,res)=>{
    const id = req.params.id;
    try {
        
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const getNodes = async(req,res)=>{
    try {
        
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports={
    createNode,
    updateNode,
    deleteNode,
    getNodes
}