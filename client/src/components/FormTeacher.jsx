import React, { useReducer, useState, useEffect } from 'react'
import axios from 'axios';
import './styleForm.css'
import formReducer from './formReducer'
import Table from './Table';
const initialFormState = {
    name: "", code: " ", address: "",
    teachers: [],
    courses: [],
    students: [],

}
console.log("test  ", initialFormState)



export default function FormTeachers() {

    const [schools, setSchools] = useState([])
    console.log("use effect teacher  ", schools)
    useEffect(() => {
        (async function fetchDAta() {
            const res = await axios.get("http://localhost:5000/schools")
            setSchools(res.data)
        })()
    }, [])

    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleTextChange = (e) => {
        dispatch({
            type: "handle input text",
            field: e.target.name,
            payload: e.target.value
        })
    }



    async function postData(formData) {
        try {
            const { code, ...restFormData } = formData;
            const school = schools.find((school) => school.code === code);
            if (!school) {
                throw new Error(`School with code ${code} not found`);
            }
            const res = await axios.put(
                `http://localhost:5000/schools/${code}/teachers`,
                { ...restFormData }
            );
            console.log("Data posted successfully:", res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to post data:", error);
            throw error;
        }
    }


    async function submitFun(e) {
        e.preventDefault()

        try {
            const res = await postData(formState)
            console.log("my data ", res)
        } catch (error) {
            console.log(error)
            alert('request failed')
        }
    }

    return (
        <div className='mainOne'>
            <div className='division'>
                <form onSubmit={submitFun}>
                    <h1>Enter Teacher</h1>

                    <label htmlFor="school">School code</label>
                    <input className='input' type="text" name="code" value={formState.code} placeholder='code ..' onChange={e => handleTextChange(e)} />
                    <label htmlFor="lname">Full Name of trainer</label>
                    <input className='input' type="text" id="lname" name="tname" value={formState.tname} placeholder="trainer name.." onChange={e => handleTextChange(e)} />
                    <label htmlFor="lname">PHOTO</label>
                    <input className='input' type='text' />

                    <input className='input' type="submit" value="Submit" />
                </form>
            </div>
            <div className='element'>

            </div>


        </div>
    )
}
