const mongoose = require('mongoose');
const Class = require('./classModel');
const autoIncrement = require('mongoose-sequence')(mongoose);


const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    classId: {
        type: Number,
        ref:'Class'
    },
    studentId: {
        type: Number,
    }
});

StudentSchema.plugin(autoIncrement, { inc_field: 'studentId', start_seq: 100, incrementBy: 1 });

const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
