import React,{useEffect, useState} from 'react'
import axios from "axios"
import './AdminStyle.css'
import { useContext } from 'react'
import { Context } from './Context'
import { useLoaderData, useNavigation } from 'react-router-dom'


export default function AdminCourses() {
    const { user } = useContext(Context)
    const [isLogin, setIsLogin] = useState(user);
    
    const AdminCourses = useLoaderData()
     
    const [courses, setCourses] = useState(AdminCourses ? AdminCourses : [])
    const [newCourse, setNewCourse] = useState({ title: "", capacity: 0, available: 0, descrip: "" })
    const [showForm, setShowForm] = useState(true)
    const [searchInput, setsearchInput] =useState({search:""});
    const [students , setStudents] = useState([])
    const [matchingStd, setMatchingStd] = useState([]);
    const [courseId, setCourseId] = useState()

     useEffect(() =>{
       setCourses(AdminCourses)
      },[])

    useEffect(()=>{
        
       ( async function fetchStd(){
        
        const res = await axios.get("http://localhost:5000/student");
        setStudents(res.data)
    })()
    },[])
    
    const navigate = useNavigation()
    if (navigate.state === "loading") {
        return <h1>page loading....</h1>
    }

    const handleDelete = async(id) =>{
        const token = user.accessToken;
       
         const config = {
           headers: { Authorization: `Bearer ${token}` } 
        }
        const del = await axios.delete(`http://localhost:5000/course/${id}`, config);
        if(del){
          const coursesList=  courses.filter((c) => c._id !==id)
          setCourses(coursesList)
        }
      
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCourse(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleAdd() {
        
        const token = user.accessToken;
      
        const config = {
           headers: { Authorization: `Bearer ${token}` } 
        }
        
        try {
            const newData = await axios.post('http://localhost:5000/course/add', newCourse, config);
            
            let newCourseList = newData.data.success?[...courses, newData.data.course]: courses
            setCourses(newCourseList)
            setNewCourse({ title: "", capacity: 0, available: 0, descrip: "" })
            setShowForm(false)
        } catch (error) {
            console.log(error)
        }

    }

    function handleHideForm() {
        setShowForm(false)
    }
    const handleAddStd = (id)=>{
       setCourseId(id)
    }


    const handleSearchInput = (e)=>{
      setsearchInput(prev =>( {...prev, [e.target.name]:e.target.value}));
    const findMatchingStudents  = students.filter(std=>{
      
    
        const stdName = std.sname || ''; // null check
        // const searchStr = (searchInput?.search || '').toLowerCase(); // null check
        const searchStr = (searchInput && searchInput.search) ? searchInput.search.toLowerCase() : '';

        return stdName.toLowerCase().includes(searchStr);
    }) ;
    console.log(findMatchingStudents)
    
    setMatchingStd(findMatchingStudents)
    }
    
    async function addstudent(std){
      const courseid = courseId;
      const studentId = std._id;
      console.log(courseid, studentId)
      const token = user.accessToken;

      const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
      const response = await axios.put('http://localhost:5000/student/update', {courseid, studentId}, config);
      if(response.data.message == "SUCCESSFULY  ADDED"){
        let newCourseList = courses.map(course=>{
            if (course._id == courseid){
                course.available -= 1
            }
         
            return course;
          })
          setCourses(newCourseList);
      }
     
      alert(response.data.message)
      
    }

    return (
        <>
          <b> COURSES LIST</b><hr/>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                            <div className="col-sm-4" id='divf' >
                            {showForm ? (
                                    <form >
                                        

                                        <input  type="text" name="title" value={newCourse.title}  placeholder='title' onChange={handleInputChange}/>
                                       <label htmlFor='capacity'>capacity</label> <input  type="Number" name="capacity"  value={newCourse.capacity} placeholder='capacity' onChange={handleInputChange}/>
                                       <label htmlFor='available'>available</label><input  type="Number" name="available"  value={newCourse.available} placeholder='available' onChange={handleInputChange}/>
                                        <input   type="text" name="descrip"  value={newCourse.descrip} placeholder='description' onChange={handleInputChange}/>
                                        
                                        <button type="button" onClick={handleAdd}>Add Course</button>
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
                                <th>TITLE</th>
                                <th>CAPACITY</th>
                                <th>AVAILABLE</th>
                                <th>DESCRIPTION</th>
                                
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses && courses.map((course, index) =>{
                                return(
                                    <tr key={index}>
                                    <td>{course.title}</td>
                                    <td>{course.capacity}</td>
                                    <td>{course.available}</td>
                                    
                                    <td>{course.descrip}</td>
                                   
                                
    
                                    <td >
                                    
                                        <span className="edit" title="Edit" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleAddStd(course._id)}>  <i className="bi bi-plus text-dark"></i></span>
                                        <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons"><i className="bi bi-pencil-square"></i></i></a>
                                        <a className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(course._id)}><i className="material-icons"><i className="bi bi-trash3"></i></i></a>
                                  
                                    </td>
                                </tr>
                                )
                            })}
                         
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Search a Student:  <input  value={searchInput.search}  name='search' onChange={handleSearchInput}/>
       <div>
        <ul className='list-group'>
        {matchingStd && matchingStd.map(std=>{
         return  <li className="mt-3 list-group-item" onClick={()=>addstudent(std)}>{std.sname}</li>
        })}
        </ul>
       </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
            </div>
        </>
    )
}

export const dataLoaderCourseAdmin = async () => {
    const res = await axios.get("http://localhost:5000/course")
  
    return res.data
}