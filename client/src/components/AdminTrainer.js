import React, { useEffect, useState } from 'react'
import axios from "axios"
import './AdminStyle.css'
import { Context } from './Context'
import { useContext } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'

export default function AdminTrainer() {
    const [trainers, setTrainers] = useState([])
    const [newTrainer, setNewTrainer] = useState({ tname: "", email: "", phone: "", photo: "", about: ""})
    const [showForm, setShowForm] = useState(true)

    ///// login//////
    const { user } = useContext(Context)
    const [isLogin, setIsLogin] = useState(user);


    let AdminTrainers = useLoaderData()

    useEffect(() => {
        setTrainers ( AdminTrainers )
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

        const del = await axios.delete(`http://localhost:5000/trainer/${id}`, config);
        if (del) {
            AdminTrainers = AdminTrainers.filter((trainer) => trainer._id !== id)
            let trainersList = trainers.filter( tra => tra._id !== id)
            setTrainers(trainersList)

        }

    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTrainer(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleAddTrainer() {
        const token = user.accessToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        
        try {
            const newData = await axios.post('http://localhost:5000/trainer/add', newTrainer, config);

            console.log(newData)
            const newTrainersList = newData.data.success ? [...trainers, newData.data.trainer] : trainers
            console.log(newTrainersList)
            setTrainers(newTrainersList)
            setNewTrainer({ tname: "", email: "", phone: "", photo: "" , about:"" })
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
            <b>TRAINERS LIST</b>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8"><h2><b>Details</b></h2></div>
                            <div className="col-sm-4">
                            {showForm ? (
                                    <form >
                                        <input className='inputf' type="text" name="tname" placeholder='name' onChange={handleInputChange}/>
                                        <input className='inputf' type="text" name="email" placeholder='email' onChange={handleInputChange}/>
                                        <input className='inputf' type="text" name="phone" placeholder='phone' onChange={handleInputChange}/>
                                        <input  className='inputf' type="text" name="photo" placeholder='photo' onChange={handleInputChange}/>
                                        <input  className='inputf' type="text" name="about" placeholder='about' onChange={handleInputChange}/>
                                   

                                        <button type="button" onClick={handleAddTrainer}>Add Trainer</button>
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
                                <th>PHOTO</th>
                                <th>ABOUT</th>
                               
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers && trainers.map((trainer, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{trainer.tname}</td>
                                        <td>{trainer.email}</td>
                                        <td>{trainer.phone}</td>
                                        <td>{trainer.photo}</td>
                                        <td>{trainer.about}</td>
                                     


                                        <td>
                                            <a className="add" title="Add" data-toggle="tooltip"><i className="material-icons">&#xE03B;</i></a>
                                            <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons"><i className="bi bi-pencil-square"></i></i></a>
                                            <a className="delete" title="Delete" data-toggle="tooltip" onClick={() => handleDelete(trainer._id)}><i className="material-icons"><i className="bi bi-trash3"></i></i></a>
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

export const dataLoaderTrainerAdmin = async () => {
    const res = await axios.get("http://localhost:5000/trainer")
    console.log("hello data ", res.data)
    return res.data
}