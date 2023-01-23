const asyncHandler = require("express-async-handler");
const ClassModel = require("../models/classModel");
const StudentModel = require("../models/studentModel");

//register a new student to the class
const registerStudent = asyncHandler(async (req, res) => {
  const {name, classId} = req.body;
  const { myClassId } = req.params;
  
  //if fields are empty
  if(!name || !classId){
    return res.status(400).json({
        message: "Student name and class Id is required..."
    });  
}

//check if the class is existing or not
const existingClass = await ClassModel.findOne({'classField.classId': classId}); 
    //console.log(existingClass);
    if(existingClass){
        return res.status(400).json({
            message: "Cannot create a new class since a Class with the same already exists.."
        });
    }

    //check if student already exists
const newStudent = await new StudentModel({
  name:name,
  classId:classId

});
const result = await newStudent.save();
// console.log(result);
res.status(201).json({
  message: "New Class Created Successfully",
  result
});

});

const specificClassStudents = asyncHandler(async (req, res) => {
  const { myClassId } = req.params;

  if (!myClassId) {
    return res.status(400).json({ message: 'classId is required' });
  }
  if (isNaN(myClassId)) {
    return res.status(400).json({ message: 'classId must be a number' });
  }

  try {
    const classExist = await ClassModel.findOne({'classId': myClassId});
    if (!classExist) {
      return res.status(404).json({ error: "This class does not exist" });
    }
    const students = await StudentModel.find({ classId: myClassId });
    if (!students || students.length < 1) {
      return res.status(404).json({ error: "There are no students at this class" });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const specificStudent = asyncHandler(async (req, res) => {
  try {
    // validate classId
    if(isNaN(req.params.myClassId)) return res.status(400).json({error: 'classId must be a number'});
    const classExists = await ClassModel.findOne({'classId': req.params.myClassId });
    if(!classExists) return res.status(404).json({ error: "This class does not exists" });
    //validate studentId
    if(isNaN(req.params.studentId)) return res.status(400).json({error: 'studentId must be a number'});
    const student = await StudentModel.findOne({ classId: req.params.myClassId, studentId: req.params.studentId });
    if (!student) {
      return res.status(404).json({ error: "There is no student of that id" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const updateStudentInfo = asyncHandler( async(req, res)=>{
  const {myClassId, studentId} = req.params
  const {name} = req.body;
  try {
    // validate classId
    if(isNaN(myClassId)) {return res.status(400).json({error: 'classId must be a number'})};

    const classExists = await ClassModel.findOne({'classId': myClassId });

    if(!classExists) {return res.status(404).json({ error: "This class does not exists" })};
    //validate studentId
    
    if(isNaN(studentId)) {return res.status(400).json({error: 'studentId must be a number'})};
    
    const student = await StudentModel.findOne({ classId: myClassId, studentId: studentId });
    // console.log(student);
    
    if (!student) {
      return res.status(204).json({error: 'No Student Found'});
    }
    //update student information
    student.name = name;
    await student.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deleteStudent = asyncHandler( async(req, res)=>{
  const {myClassId,studentId} = req.params;
  try {
    //validate classId
    if(isNaN(myClassId)) return res.status(400).json({error: 'classId must be a number'});
    const classExists = await ClassModel.findOne({'classId': myClassId });
    if(!classExists) return res.status(404).json({ error: "This class does not exists" });
    //validate studentId
    if(isNaN(studentId)) return res.status(400).json({error: 'studentId must be a number'});
    const student = await StudentModel.findOne({ classId: myClassId, studentId: studentId });
    if (!student) {
      return res.status(404).json({ error: "There is no student of that id" });
    }
    await StudentModel.findOneAndDelete({ classId: myClassId, studentId: studentId });

// update class schema after deleting student
const updatedClass = await ClassModel.updateOne(
    {'classId': myClassId},
    { $inc: { studentCount: -1 } }, {new: true});
    
if(!updatedClass) return res.status(404).json({ error: "This class does not exists" });

res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})



module.exports = {
  registerStudent,
  specificClassStudents,
  specificStudent,
  updateStudentInfo,
  deleteStudent
}
