const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const ClassSchema = new mongoose.Schema({
    classField: [{ 
        classId: {
            type: Number,
        },
        className: {
            type: String,
            unique: true,
            required: true
        },
        studentCount: {
            type: Number,
            required: true
        }
    }]
});

ClassSchema.plugin(autoIncrement, { inc_field: 'classId', start_seq: 100, incrementBy: 1 });
//auto increment id, start from number 100, and increment each by 1
const ClassModel = mongoose.model('Class', ClassSchema);
module.exports = ClassModel;