import axios from "axios"
import {useLoaderData, useNavigation} from 'react-router-dom'
import React from "react"

export const Data = () =>{
    const cs = useLoaderData()
    console.log(cs)
    const navigate = useNavigation()
    if(navigate.state==="loading"){
        return <h1>page loading....</h1>
    }
    return (<div>
        {cs&&cs.map(c =>{

        })}

    </div>)

}

export const dataLoader = async() =>{
    const res = await axios.get("http://localhost:5000/schools/courses")
    // const course = await res.json()
    console.log(res.data)
    return res.data
}