

const SchoolModel = require('../models/schoolModel')
const mongoose = require('mongoose')
//1. Create a new school with name, code & address (code should be unique)
async function createSchoolOne(req, res) {
    const { name, code, address } = req.body;
    try {
        
        const schoolInfo = await SchoolModel.createSchool(req.body);
        res.send(schoolInfo)

    } catch (error) { 
        console.log(error)
    }
}
//2. Update address of an existing school
async function updateSchoolAddressOne(req, res) {
    const { code } = req.params;
    const { address } = req.body;
    try {
        const update = await SchoolModel.updateSchoolAddress(code, address)
        console.log("updated ", update)
        res.send(update)

    } catch (error) {
        console.log(error)

    }
}
// 3. Delete a school
async function deleteSchool(req, res) {
    const { id } = req.params;
    try {
       const datadel= await SchoolModel.deleteSchool(id);
        res.send("deleted" )
    } catch (error) {
        console.log(error)
    }
}
// 4. Add teacher *(level 1)*
async function addTeacher(req, res) {
    const { code } = req.params;
    const { tname } = req.body
    try {
        const result = await SchoolModel.addTeacher(code, tname)
        console.log(result)
        return res.send('done');
    } catch (error) {
        console.log(error)
    }

}
// 5. Update teacher by ID *(level 1)*
async function updateTeacher(req, res) {
    const { code, _id } = req.params;
    const { tname } = req.body;
    try {
        await SchoolModel.updateTeacher(code, _id, tname);
        res.send('updated')

    } catch (error) {
        console.log(error)
    }

}
// 6. Delete teacher by ID *(level 1)* // not yet done
async function deleteTeacher(req, res) {
    const { code, _id } = req.params;
    try {
        await SchoolModel.deleteTeacher(code, _id)
        res.send('deleted')
    } catch (error) {
        console.log(error)
    }

}
// 7. Add a new course with title *(level 1)*

async function addNewCourse(req, res) {
    const { code } = req.params;
    const { title, capacity, available } = req.body;
    try {
        await SchoolModel.addNewCourse(code, title, capacity, available);
        res.send('added');

    } catch (error) {
        console.log(error)
    }
}

// 7. a update a course title with level 1
async function updateCourse(req, res) {
    try {
        const {schoolCode, courseId} = req.params;
        const {coursenewName} = req.body;

        const resul = await SchoolModel.updateCourse(schoolCode, courseId,coursenewName)
        return res.send("updated");
    } catch (error) {
        console.log(error)
    }
}


//7.b delete a course title (level 1)

async function deleteCourse(schoolCode, courseId) {
    try {
        const res = await SchoolModel.updateOne({ code: schoolCode }, { $pull: { courses: { _id: courseId } } })
        console.log(res)
        return res;
    } catch (error) {

    }
}
// 8. Add a new student to specific course *(level 2)*

async function addNewStudent(req, res) {
    const { code, cid } = req.params;
    const { sname } = req.body;
    try {
        const result = await SchoolModel.addNewStudent(code, cid, sname)

        res.send('student added');
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}
// 9. Update a student's name *(level 2)*

async function updateStudentName(req, res) {
    const { code, cid, sid } = req.params;
    const { sname } = req.body;
    try {
        const result = await SchoolModel.updateStudentName(code, cid, sid, sname);
        console.log(result)
        res.send('student name is updated')

    } catch (error) {
        console.log(error)
        return null;
    }
}
// 10. Delete a student *(level 2)*

async function deleteStudent(req, res) {
    const { code, cid, sid } = req.params;
    try {
        const result = await SchoolModel.deleteStudent(code, cid, sid)
        res.send('deleted successful')
        return result;

    } catch (error) {

    }
}

//13 get all scholls
async function getAllSchools(req, res) {

    try {
        const result = await SchoolModel.getAllSchools()
        res.send(result);
    } catch (error) {
        console.log(error)
    }

}

//14. Get all teachers from a school
async function getAllTeachers(req, res) {

    try {
        const result = await SchoolModel.getAllTeachers()
        //console.log(result)

        res.send(result.teachers)
    } catch (error) {
        console.log(error)
    }
}


// 15. Get all courses from a school

async function getAllCourses(req, res) {

    try {
        const result = await SchoolModel.getAllCourses();

        res.send(result.courses)
        console.log(result.courses)

    } catch (error) {
        console.log(error)

    }

}

//16. Get all students from a course and sort them if needed

async function getAllStudents(req, res) {
    const { code, cid } = req.params;

    try {
        const result = await SchoolModel.getAllStudents(code, cid);
        res.send(result)

    } catch (error) {
       console.log(error)
    }
}


/// get all schools/////////

async function getAllSchools (req,res){
  try {
    const schools= await SchoolModel.getAllSchools();
    res.send(schools)
  } catch (error) {
    console.log(error)
  }
}


async function countStudentsForCoursesByTeachers(req, res){
    const {schoolCode} = req.params;
    try {
       const result =  await SchoolModel.countStudentsForCoursesByTeachers(schoolCode)
       res.send(result)
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    createSchoolOne, updateSchoolAddressOne, deleteSchool, addTeacher,
    updateTeacher, deleteTeacher, addNewCourse, updateCourse, deleteCourse, addNewStudent, updateStudentName, deleteStudent, getAllSchools,
    getAllTeachers, getAllCourses, getAllStudents , countStudentsForCoursesByTeachers, getAllSchools
}
