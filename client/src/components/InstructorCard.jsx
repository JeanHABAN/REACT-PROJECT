
import React, { useEffect, useState } from "react";
import axios from "axios"
import {useLoaderData, useNavigation} from 'react-router-dom'

export default function InstructorCard() {
  const [trainers, setTrainers] = useState([]);
 console.log("trainer " , trainers)
  useEffect(()=>{
    (
      async function fetchTrainer(){
        const trainer = await axios.get("http://localhost:5000/trainer")
        setTrainers(trainer.data)
        console.log("yesss  ", trainer)
      }
    )()
  }, [])
  return (
   <>
   <div className="breadcrumbs">
        <div className="container">
          {/* <h2>Trainers</h2> */}
        
          {/* <input type="text" placeholder="Search trainer.."/> */}
        </div>
      </div>
   <div className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{gap: "5px"}}>
    {trainers&&trainers.map((trainer, index ) =>{
      return(
        <div className="member" data-aos="zoom-in" data-aos-delay="100" key={index}>
              <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
              <div className="member-content">
                <h4>{trainer.tname}</h4>
                <p>{trainer.email}</p>
                <p>{trainer.phone}</p>
                <p>{trainer.photo}</p>
                <p>
                  {trainer.about} 
                </p>
                <div className="social">
                  <a href=""><i className="bi bi-twitter"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
      )
    })}
            
          </div>
   </>
  )
}

