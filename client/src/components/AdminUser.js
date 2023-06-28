import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import './AdminStyle.css'
import { Context } from './Context'
import { useLoaderData, useNavigation } from 'react-router-dom'


export default function AdminUser() {
    const { user } = useContext(Context)
    // const [isLogin, setIsLogin] = useState(user);
    

    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)
  
    const[editId, setEditId] = useState('')
    const [newUser, setNewUser] = useState({ name:'', email:'', phone:'', role:'' })


    let AdminUsers = useLoaderData()

    useEffect(() => {
        setUsers(AdminUsers)
    }, [])

    const navigate = useNavigation()

    if (navigate.state === "loading") {
        return <h1>page loading....</h1>
    }

    const handleDelete = async (id) => {
        const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const del = await axios.delete(`http://localhost:5000/user/${id}`, config);
        if (del) {
            const usersList = users.filter((user) => user._id !== id)
            setUsers(usersList)

        }

    }


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({...newUser,[name]:value});
    }

    async function handleAdd() {
        const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        try {
            const newData = await axios.post('http://localhost:5000/user/create', newUser, config);
            let newUserList = newData.data.success ? [...users, newUser] : users
            setUsers(newUserList)

            setNewUser({ name: "", email: "", phone: "", role: "" })
            setShowForm(false)
        } catch (error) {
            console.log(error)
        }
    }

    function handleShowForm() {
        setShowForm(true)
    }
    
   
    const handleUpdate = async () => {
        const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const updatedUser = await axios.put(`http://localhost:5000/user/${editId}`, newUser, config);
            if (updatedUser.data.success){
                const updatedUsersList = users.map(user=>{
                    if(user._id == editId){
                        user.name = newUser.name;
                        user.email = newUser.email;
                        user.role = newUser.role;
                        user.phone = newUser.phone;
                    }
                    return user;
                })
                setUsers(updatedUsersList);
            }
            setNewUser({name:'',email:'',phone:'',role:''});
            setEditId('');
            setShowForm(false);
        } catch (error) {
           console.log(error)
        }
    }

    const handleEdit = (userId) => {
         setEditId(userId)
         let userToEdit = users.find(user=>user._id == userId);
         setNewUser({name:userToEdit.name,email:userToEdit.email,role:userToEdit.role,phone:userToEdit.phone});
         handleShowForm();
    };
    return (
        <>
            <b> USERS LIST</b><hr />
            <div className="container" >
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2><b>Details</b></h2></div>
                            <div className="col-sm-4">
                                {showForm ? (
                                    <form >
                                        <input className='inputf' type="text" name="name" placeholder='name' onChange={handleInputChange} value={newUser.name}  />

                                        <input className='inputf' type="text" name="email" placeholder='email' onChange={handleInputChange} value={newUser.email} />
                                       {!editId && <input className='inputf' type="text" name="password" placeholder='password' onChange={handleInputChange}  />}
                                        <input className='inputf' type="text" name="phone" placeholder='phone' onChange={handleInputChange} value={newUser.phone} />
                                        <input className='inputf' type="text" name="role" placeholder='role' onChange={handleInputChange} value={newUser.role} />

                                        {!editId && <button type="button" onClick={handleAdd}>Add User</button>}
                                        {editId && <button type="button" onClick={handleUpdate}>Save Change</button>}
                                        <button type="button" onClick={()=>setShowForm(false)}>Cancel</button>
                                    </form>
                                ) : (

                                    <button type="button" className="btn btn-info add-new" onClick={handleShowForm}><i className="fa fa-plus"></i > Add New </button>
                                    
                                )} 


                            </div>
                        </div>
                    </div><br />
                    <table className="table table-bordered" >
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>

                                <th>PHONE</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => {
                                return (
                                    
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            
                                            <a className="edit" title="Edit" data-toggle="tooltip"  onClick={() => handleEdit(user._id)}><i className="bi bi-pencil-square" > </i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(user._id)}><i className="material-icons"><i className="bi bi-trash3"></i></i></a>
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


export const dataLoaderUserAdmin = async () => {
    const res = await axios.get("http://localhost:5000/user")

    return res.data.data
}