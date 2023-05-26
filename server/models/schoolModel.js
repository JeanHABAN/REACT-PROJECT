const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
    {
        
        name: String,
        code:   String ,
        address: String,
       
        teachers: [
            { _id: mongoose.Types.ObjectId, 
                tname: String,
                email: String,
                photo : String 
                
            }
        ],
        courses: [
            {
                _id: mongoose.Types.ObjectId, 
                title: String, 
                capacity : Number,
                available : Number,
                students: [
                    { _id: mongoose.Types.ObjectId,
                         sname: String,
                       
                    },   
                ],
              
            }
        ]
    }
)
const SchoolModel = mongoose.model('school', schoolSchema);


exports.createSchool = async (schoolOne) => {
    try {
        const schoolInfo = new SchoolModel(schoolOne);
        const result = await schoolInfo.save()
        return result;
    } catch (error) {
        console.log(error)
    }
}
//2. Update address of an existing school
exports.updateSchoolAddress = async (code, address) => {
    try {
        let u = await SchoolModel.updateOne({ code }, { $set: { address } });
        return u;
    } catch (error) {
        console.log(error)

    }
}
// 3. Delete a school
exports.deleteSchool = async (id) => {
    try {
        await SchoolModel.findByIdAndDelete(id )
    } catch (error) {
        console.log(error)
    }
}
// 4. Add teacher *(level 1)*
exports.addTeacher = async (schoolCode, teacher) => {
    try {
        const schoolFind = await SchoolModel.findOne({ code: schoolCode })
        if (!schoolFind) {
            throw new Error('not found')
        }

        const newteacher = new SchoolModel({
            _id: new mongoose.Types.ObjectId(),
            tname: teacher
        })

        schoolFind.teachers.push(newteacher)
        await schoolFind.save();
        return schoolFind;
    } catch (error) {
        console.log(error)
    }

}
// 5. Update teacher by ID *(level 1)*
exports.updateTeacher = async (schoolCode, teacherId, newTeacherName) => {
    try {
        await SchoolModel.updateOne({ code: schoolCode, 'teachers._id': teacherId }, 
        { $set: { "teachers.$.name": newTeacherName } })

    } catch (error) {
        console.log(error)
    }

}
// 6. Delete teacher by ID *(level 1)* // 
exports.deleteTeacher = async (schoolCode, teacherId) => {
    try {
        await SchoolModel.updateOne({ code: schoolCode, 'teachers._id': teacherId },
         { $pull: { teachers: { _id: teacherId } } })
    } catch (error) {
        console.log(error)
    }

}
// 7. Add a new course with title *(level 1)*

exports.addNewCourse = async (schoolCode, courseName, capacity, available) => {
    try {
        const findSchool = await SchoolModel.findOne({ code: schoolCode })

        if (!findSchool) {
            throw new error('No Found');
        }else{
            const course = {
                _id: new mongoose.Types.ObjectId,
                title: courseName,
                capacity,
                available
            }
            const res = await SchoolModel.updateOne({ code: schoolCode }, 
                { $push: { courses: course } });
            console.log(res);
            return res;

        }
      
    } catch (error) {
        console.log(error)
    }
}

// 7. a update a course title with level 1
exports.updateCourse = async (schoolCode, courseId, coursenewName) => {
    try {

        const res = await SchoolModel.updateOne({ code: schoolCode, 'courses._id': courseId }, 
        { $set: { 'courses.$.title': coursenewName } });
        return res;
    } catch (error) {
        console.log(error)
    }
}


//7.b delete a course title (level 1)

exports.deleteCourse = async (schoolCode, courseId) => {
    try {
        const res = await SchoolModel.updateOne({ code: schoolCode }, 
            { $pull: { courses: { _id: courseId } } })
        console.log(res)
        return res;
    } catch (error) {

    }
}
// 8. Add a new student to specific course *(level 2)*

exports.addNewStudent = async (schoolCode, courseId, newStudent) => {
    try {
        const student = {
            _id: new mongoose.Types.ObjectId,
            sname: newStudent,
           
        }
        const res = await SchoolModel.updateOne({ code: schoolCode, 'courses._id': courseId },
        {$inc:{"courses.$.available":-1}, 
        $push: { 'courses.$.students': student } })
        console.log(res)

        return res;

    } catch (error) {
        console.log(error)
        return null;
    }
}
// 9. Update a student's name *(level 2)*

exports.updateStudentName = async (schoolCode, courseId, studentId, newNameStd) => {
    try {
        const res = await SchoolModel.updateOne({ code: schoolCode }, { $set: { 'courses.$[c].students.$[st].name': newNameStd } },
            { arrayFilters: [{ 'c._id': courseId }, { 'st._id': studentId }] })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error)
        return nll;
    }
}
// 10. Delete a student *(level 2)*


exports.deleteStudent = async(schoolCode, courseId, studentId)=>{
    try {
      const result = await SchoolModel.updateOne(
         {code: schoolCode, "courses._id": courseId },
        {   $inc:{"courses.$.available":1}},
           { $pull: { "courses.$[c].students.$[s]._id": { _id: studentId }} },
            {arrayFilters:[{"c._id":courseId}, {"s._id":studentId}]} 
        
      );
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
// exports.deleteStudent = async (schoolCode, courseId, studentId) => {
//     try {
//         const res = await SchoolModel.updateOne(
//             { code: schoolCode, 'courses._id': courseId },
//             { 
//                 $pull: { 'courses.$[course].students': { _id: studentId } },
//                 $inc: { 'courses.$[course].available': 1 }
//             },
//             { 
//                 arrayFilters: [ { 'course._id': courseId } ]
//             }
//         );
//         console.log(res);
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// }

  

//13 get all schools
exports.getAllSchools = async () => {

    try {
        const res = await SchoolModel.find({})
        return res;
    } catch (error) {
        console.log(error)
    }
}

//14. Get all teachers from a school
// exports.getAllTeachers = async (schoolCode) => {
//     try {
//         const res = await SchoolModel.find({ code: schoolCode })
//         return res;

//     } catch (error) {
//         console.log(error)
//     }


// }
exports.getAllTeachers = async ()=>{
    try {
        const res = await SchoolModel.findOne({}, { teachers: 1, _id: 0 })
        return res
    } catch (error) {
        console.log(error)

    }
}


// 15. Get all courses from a school

exports.getAllCourses = async () => {
    try {
        const res = await SchoolModel.findOne({}, { courses: 1, _id: 0 })
        return res
    } catch (error) {
        console.log(error)

    }

}

//16. Get all students from a course and sort them if needed

exports.getAllStudents = async (schoolCode, courseId) => {


    try {
        const res = SchoolModel.findOne({ code: schoolCode, "courses._id": courseId })
        return res;
    } catch (error) {
        console.log(error)

    }

}


///////////STDENT CHOOSE THE COURSE //////
// exports.checkin = async (schoolCode, courseId, studentName, studentId) => {
//     try {

//         const school = await SchoolModel.findOne({ code: schoolCode });
//         if (!school) {
//             return { success: false, message: "No Building for the provided building code Found" };
//         }

//         const course = school.courses.find(course => course._id === courseId);
//         if (!course) {
//             return { success: false, message: "course not found." };
//         }

//         let personId = course.students.find(std => std._id ===studentId && std.name === studentName);
//         if (personId) {
//             return { success: false, message: "Student with the provided Id and name already exists" };
//         }

//         if (course.available == 0) {
//             return { success: false, message: "No more slot" };
//         }

//         const updateCourse = await buildingMod.findOneAndUpdate(
//             { code: schoolCode, "courses._id": courseId },
//             { $inc: { "courses.$.available": -1 }, 
//             $push: { "courses.$.students": studentName } },
//         );

//         return { success: true, data: updateCourse };

//     } catch (error) {
//         return { success: false, message: "Error checking in." };
//     }
// }

///////////checkOut (user and admin are allowed) //////
// exports.checkout = async (buildingCode, aptCode, email) => {
//     try {

//         const building = await SchoolModel.findOne({ code: buildingCode, "apartments.code": aptCode });
//         const apt = building.apartments.find(apt => apt.code === aptCode);

//         if (!apt) {
//             return "Apartment not found.";
//         } else {
//             const findResident = await SchoolModel.findOne({ apartments: { $elemMatch: { code: aptCode, residents: email } } });


//             if (findResident) {
//                 const updateBuilding = await SchoolModel.findOneAndUpdate(
//                     { code: buildingCode, "apartments.code": aptCode },
//                     { $inc: { "apartments.$.vacancies": 1 }, $pull: { "apartments.$.residents": email } },
//                 );

//                 return { success: true, message: "checkout successfully" }
//             }
//             return "no user found"
//         }
//     } catch (error) {
//         return null;
//     }
// }


//   exports.countStudentsForCoursesByTeachers =(schoolId) =>{
//     const school =  SchoolModel.findById(schoolId);
  
//     const result = school.teachers.map((teacher) => {
//       const courses = teacher.courses.map((course) => {
//         const numStudents = course.students.length;
//         return { title: course.title, numStudents };
//       });
  
//       const totalStudents = courses.reduce(
//         (total, course) => total + course.numStudents,
//         0
//       );
  
//       return {
//         teacherName: teacher.name,
//         courses,
//         totalStudents
//       };
//     });
  
//     return result;
//   }
  