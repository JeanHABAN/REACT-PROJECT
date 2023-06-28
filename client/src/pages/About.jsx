import React, { useEffect, useState } from "react";

function About() {
  const [store, setStore] = useState(JSON.parse(localStorage.getItem('data')))
  const [input, setInput] = useState({ Title: "", description: "", exc: "", info: "", more: "", welcome: "" })
  useEffect(() => {
    const text = localStorage.setItem("data", JSON.stringify("data", input))
    setStore(text)
  }, [])
  return <>

    <main id="main">

      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>About Us</h2>
          <p>ALL ABOUT DESCRIPTION. </p>
        </div>
      </div>

      <form>
        <input type="text" name="name" />
        <input type="text" name="email" />
        <input type="text" name="phone" />
        <button type="submit">Submit Changes</button>
      </form>
      <section id="about" className="about">
        <div className="container" data-aos="fade-up">

          <div className="row">
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
              <img src="assets/img/course-1.jpg" className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
              <h3>EXCELLENT.</h3>
              <p className="fst-italic">
                IN INFORMATION TECHNOLOGY
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> OUTSTANDING IN COMPUTER PROFESSINAL.</li>
                <li><i className="bi bi-check-circle"></i> OUTSTANDING IN SOFTWARE DEVELOPMENT.</li>
                <li><i className="bi bi-check-circle"></i>  AND ALSO DATA SCIENCE.</li>
              </ul>
              <p>
                YOU ARE MOST WELCOME TO OUR UNIVERSITY
              </p>

            </div>
          </div>

        </div>
      </section>


      <section id="counts" className="counts section-bg">
        <div className="container">

          <div className="row counters">

            <div className="col-lg-3 col-6 text-center">
              <span data-purecounter-start="0" data-purecounter-end="1232" data-purecounter-duration="1" className="purecounter"></span>
              <p>Students</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-purecounter-start="0" data-purecounter-end="64" data-purecounter-duration="1" className="purecounter"></span>
              <p>Courses</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-purecounter-start="0" data-purecounter-end="42" data-purecounter-duration="1" className="purecounter"></span>
              <p>Events</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
              <p>Trainers</p>
            </div>

          </div>

        </div>
      </section>


      <section id="testimonials" className="testimonials">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Testimonials</h2>
            <p>What are they saying</p>
          </div>

          <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper-wrapper">

              <div className="swiper-slide">
                <div className="testimonial-wrap">
                  <div className="testimonial-item">
                    <img src="assets/img/testimonials/jeanh.jpg" className="testimonial-img" alt="" />
                    <h3>Jean </h3>
                    <h4>Ceo &amp; Founder</h4>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      we are offering an excellence service
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  </>
}



export default About;