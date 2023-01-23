const asyncHandler = require('express-async-handler');
const ClassModel = require('../models/classModel');
const StudentModel = require('../models/studentModel');

const createClass = asyncHandler( async(req, res)=>{
    const {className, studentCount}=req.body;
    if(!className || !studentCount){
        return res.status(400).json({
            message: "Class Name and Student Count is required..."
        });  
    }
    
    //find if the same class exists or not
    const existingClass = await ClassModel.findOne({'classField.className': className}); 
    //console.log(existingClass);
    if(existingClass){
        return res.status(400).json({
            message: "Cannot create a new class since a Class with the same already exists.."
        });
    }

    const newClass = await new ClassModel({
        classField: [{
          className: className,
          studentCount: studentCount,
        }]
      });
    const result = await newClass.save();
    res.status(201).json({
        message: "New Class Created Successfully",
        result
    });

});

const allClasses = asyncHandler(async(req,res)=>{
    const classes = await ClassModel.find();
    if(!classes){
        res.status(404).json({message: "N0 class found, please add.."})
    }
    res.status(200).json({
        classes
    }) 
});

const specificClass = asyncHandler(async(req,res)=>{
    const {myClassId} = req.params
    console.log(myClassId);
    // await Number(classId)
    const classes = await ClassModel.findOne({classId:myClassId});
    if(!classes){
        res.status(404).json({message: "No class found, to peform this task"})
    }
    res.status(200).json({
        classes
    }) 
});

const deleteSpecifiedClass = asyncHandler( async(req, res)=>{
    const {myClassId} = req.params;
    try {
        // validate classId
        if(isNaN(myClassId)) return res.status(400).json({error: 'classId must be a number'});
        const classExists = await ClassModel.findOne({'classId': myClassId });
        if(!classExists) return res.status(404).json({ error: "This class does not exists" });
        //delete all students related to this class
        await StudentModel.deleteMany({ classId: myClassId });
        //delete class
        await ClassModel.findOneAndDelete({'classId': myClassId });
        res.status(204).send();
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});
module.exports = {
    createClass,
    allClasses,
    specificClass,
    deleteSpecifiedClass
}