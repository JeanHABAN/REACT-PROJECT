import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import axios from 'axios'

//get all schools
export default function Table() {


    const [schools, setSchools] = useState([])
    console.log("use effect  ", schools)
    useEffect(() => {
        (async function fetchDAta() {
            const res = await axios.get("http://localhost:5000/schools")
            setSchools(res.data)
        })()
    }, [])


    const deleteSchoolHandler = async(id) =>{
        const resul = await axios.delete(`http://localhost:5000/schools/${id}`)
        if(resul){
          const newArr=  schools.filter(sch => sch._id !== id)
            setSchools(newArr)
        }else{
            alert('delete failed')
        }
      
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>School Name</th>
                        <th>code</th>
                        <th>addres</th>
                        <th>Teachers</th>
                        <th>Courses</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {schools && schools.map((school) => (
                        <tr key={school._id}>
                            <td>{school.name}</td>
                            <td>{school.code}</td>
                            <td>{school.addres}</td>
                            <td>
                                <ul>
                                    {school.teachers.map(teacher => (
                                        <li key={teacher._id}>
                                            <img src={teacher.photo} alt={teacher.tname} />
                                            {teacher.tname}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <div>
                                    {school.courses.map(course => (
                                        <li key={course._id}>
                                            <strong>{course.title}</strong>
                                            <br />
                                            Capacity: {course.capacity}
                                            
                                            Available: {course.available}
                                            <br />
                                            Students:
                                            <ul>
                                                {course.students.map(student => (
                                                    <li key={student._id}>{student.sname}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </div>
                            </td>


                            <td><button onClick={() => deleteSchoolHandler(school._id)}>DELETE</button></td>
                            <td><button>EDIT</button></td>
                        </tr>
                    )

                    )}
                </tbody>
            </table >

        </>
    )
}

