import React, { useEffect } from 'react'
import axios from "axios"
import './AdminStyle.css'
import { useState } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { Context } from './Context'
import { useContext } from 'react'
export default function AdminStudent() {

    const [students, setStudents] = useState([])
    const [newStudent, setNewStudent] = useState({ name: "", email: "", phone: "" })
    const [showForm, setShowForm] = useState(true)
    
    ///// login//////
    const { user } = useContext(Context)
    const [isLogin, setIsLogin] = useState(user);
    

    let AdminStudents = useLoaderData()

    useEffect(() => {
        setStudents(AdminStudents)
    }, [])
    
    
    const navigate = useNavigation()
    if (navigate.state === "loading") {
        return <h1>page loading....</h1>
    }

    const handleDelete = async(id) =>{
         const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
   
        const del = await axios.delete(`http://localhost:5000/student/${id}`, config);
        if(del){
          AdminStudents=  AdminStudents.filter((std) => std._id !==id)
          let studentsList = students.filter(st => st._id !==id )
          setStudents(studentsList)
          
        }
      
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStudent(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleAdd() {
         const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        try {
            const newData = await axios.post('http://localhost:5000/student/add', newStudent, config);
      
            const newStudentList = newData.data.success ? [...students, newData.data.std] : students
            setStudents(newStudentList)
            setNewStudent({ name: "", email: "", phone: "", photo: "" , about:"" })
            setShowForm(false)
        } catch (error) {
            console.log(error)
        }


    }

    function handleHideForm() { 
        setShowForm(false)
    }

    return (
        <>
            student  list
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2> <b>Details</b></h2></div>
                            <div className="col-sm-4">
                            {showForm ? (
                                    <form >
                                        <input className='inputf' type="text" name="sname" placeholder='name' onChange={handleInputChange}/>
                                        <input className='inputf' type="text" name="email" placeholder='email' onChange={handleInputChange}/>
                                        <input className='inputf' type="text" name="phone" placeholder='phone' onChange={handleInputChange}/>
                                        
                                        
                                        <button type="button" onClick={handleAdd}>Add student</button>
                                        <button type="button" onClick={handleHideForm}>Cancel</button>
                                    </form>
                                ) : (
                                    
                                    <button type="button" className="btn btn-info add-new" onClick={() => setShowForm(true)}><i className="fa fa-plus"></i > Add New </button>
                                )}
                               
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                           
                               <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.map((student, index) =>{
                                return(
                                    <tr key={index}>
                                    <td>{student.sname ? student.sname:""}</td>
                                    <td>{student.email ? student.email: ""}</td>
                                    <td>{student.phone ? student.phone :""}</td>

                            
                                    <td>

                                        <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons"><i className="bi bi-pencil-square"></i></i></a>
                                        <a className="delete" title="Delete" data-toggle="tooltip"  onClick={() =>handleDelete(student._id)}><i className="material-icons"><i className="bi bi-trash3"></i></i></a>
                                    </td>
                                </tr>
                                )
                            })}
                         
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export const dataLoaderStudenteAdmin = async () => {
    const res = await axios.get("http://localhost:5000/student")
    console.log("hello std ", res.data)
    return res.data
}