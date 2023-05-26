const schoolController = require('../controllers/schoolControllers');
const express = require('express');

const route = express.Router();

route.post('/schools/add', schoolController.createSchoolOne );
route.put('/schools/:code', schoolController.updateSchoolAddressOne);

route.delete('/schools/:id', schoolController.deleteSchool);
route.put('/schools/:code/teachers', schoolController.addTeacher);

route.patch('/schools/:code/teachers/:_id', schoolController.updateTeacher);

route.delete('/schools/:code/teachers/:_id', schoolController.deleteTeacher);

route.put('/schools/:code/courses', schoolController.addNewCourse);

route.put('/schools/:code/courses/:cid/students', schoolController.addNewStudent);

route.patch('/schools/:code/courses/:cid/students/:sid', schoolController.updateStudentName);

route.delete('/schools/:code/courses/:cid/students/:sid', schoolController.deleteStudent)
route.get('/schools', schoolController.getAllSchools);
route.get('/schools/teachers', schoolController.getAllTeachers);

route.get('/schools/courses', schoolController.getAllCourses);
route.get('/schools/:code/courses/:cid/students?sort=true', schoolController.getAllStudents);
route.get('/schools', schoolController.getAllSchools)
route.get('schools/:schoolCode', schoolController.countStudentsForCoursesByTeachers);
module.exports = route;