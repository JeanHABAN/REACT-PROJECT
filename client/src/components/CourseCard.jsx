import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CourseCard(maxCourses) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async function fetch() {
      const dat = await axios.get('http://localhost:5000/course')
      setCourses(dat.data)
    })()
  }, [])

  return (
    <>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch" style={{ width: "1000px", gap: "15px" }} >
        {courses && courses.map((course, index) => (
          <div className="course-item" key={index} >
            <img src="assets/img/course-1.jpg" className="img-fluid" alt="..." />
            <div className="course-content">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{course.title}</h4>

              </div>

              <h3><a href="course-details.html">{course.title}</a></h3>
              <p>{course.descrip}</p>
              <div className="trainer d-flex justify-content-between align-items-center">

                <div className="trainer-profile d-flex align-items-center">
                  <img src={course.trainerImage} className="img-fluid" alt={course.tname} />
                  <span>{course.trainer}</span>
                </div>
                <div className="trainer-rank d-flex align-items-center">
                  <i className="bx bx-user"></i>&nbsp;{course.capacity}
                  <i className="bx bx-heart"></i>&nbsp;{course.available}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
