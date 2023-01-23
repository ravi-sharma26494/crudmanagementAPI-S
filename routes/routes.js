const { createClass, allClasses, specificClass, deleteSpecifiedClass } = require('../controllers/classController');
const { registerStudent, specificClassStudents, specificStudent, updateStudentInfo, deleteStudent } = require('../controllers/studentController');

const router = require('express').Router();

// Test Case: 1
router.post('/v1/myClass', createClass);
// Test Case: 2
router.post('/v1/myClass/:myClassId/students', registerStudent);
// Test Case: 3
router.get('/v1/myClass', allClasses);
// Test Case: 4
router.get('/v1/myClass/:myClassId', specificClass);
// Test Case: 5
router.get('/v1/myClass/:myClassId/students', specificClassStudents);
// Test Case: 6
router.get('/v1/myClass/:myClassId/students/:studentId', specificStudent);
// Test Case: 7
router.put('/v1/myClass/:myClassId/students/:studentId', updateStudentInfo);
// Test Case : 8
router.delete('/v1/myClass/:myClassId', deleteSpecifiedClass);
// Test Case: 9
router.delete('/v1/myClass/:myClassId/students/:studentId', deleteStudent);

module.exports = router;