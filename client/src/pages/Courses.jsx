import React, { useState } from "react";
import axios from "axios"
import { useLoaderData, useNavigation } from 'react-router-dom'

export default function Courses() {

  const [searchField, setSearchField] = useState("");
  const courses = useLoaderData()
  const [data, setData] = useState(courses);

  const navigate = useNavigation()
  if (navigate.state === "loading") {
    return <h1>page loading....</h1>
  }



  

  const handleChange = e => {
    setSearchField(e.target.value);
  };


  return <>
    <main id="main" data-aos="fade-in">


      <div className="breadcrumbs">
        <div className="container">
          <h2>Courses</h2>

          <input type="text" value={searchField} onChange={handleChange} placeholder="Search course.." />
        </div>
      </div>


      <section id="courses" className="courses">
        <div className="container" data-aos="fade-up">

          <div className="row" data-aos="zoom-in" data-aos-delay="100"  >

            <div className=" d-flex flex-wrap align-items-stretch justify-content-center" style={{ gap: "5px" }} >
              {data && data.filter((item) => item.title.toLowerCase().includes(searchField.toLowerCase())).map((course, index) => {
                return (
                  <div className="course-item m-4 col-lg-3 col-md-6" key={index}>
                    <img src="assets/img/course-1.jpg" className="img-fluid" alt="..." />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                     
                        <h4>{course.title}</h4>

                      </div>
                      <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                          <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
                          <span>trainer name </span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                          <i className="bx bx-user"></i>&nbsp; <div>{course.capacity}</div>
                          &nbsp;&nbsp;
                          <i className="bx bx-heart"></i>&nbsp; <div>{course.available}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )


              })}

            </div>

          </div>

        </div>
      </section>

    </main>
  </>
}

export const dataLoader = async () => {
  const res = await axios.get("http://localhost:5000/schools/courses")
  console.log("hello ", res.data)
  return res.data
}