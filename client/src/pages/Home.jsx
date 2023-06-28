import React, { useState } from 'react'
import CourseCard from '../components/CourseCard'
import InstructorCard from '../components/InstructorCard'
import { Link } from 'react-router-dom'


export default function Home(courses) {

  function withExpandable(Component) {
    return function Expandable(props) {
      const [isExpanded, setIsExpanded] = useState(false);

      function handleExpandClick() {
        setIsExpanded(!isExpanded);
      }

      return (
        <Component
          {...props}
          isExpanded={isExpanded}
          onExpandClick={handleExpandClick}
        />
      );
    };
  }


  function Paragraph(props) {
    const { text, isExpanded, onExpandClick } = props;

    return (
      <div>
        <p>{isExpanded ? text : `${text.slice(0, 100)}...`}</p>
        <a onClick={onExpandClick} className="more-btn"><i className="bx bx-chevron-right"></i>
          {isExpanded ? "Show Less" : "Show More"}
        </a>
      </div>
    );
  }

  const ExpandableParagraph = withExpandable(Paragraph);
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices semper ligula, nec feugiat purus posuere eu. Fusce sagittis, dolor vel consequat pellentesque, mi sapien tempor nunc, eu posuere nisi dolor in magna. Sed vel euismod tellus, ac vestibulum lacus. Nunc aliquam felis nec lobortis tristique. Vestibulum ac luctus magna, in consectetur nunc. Sed malesuada ipsum sit amet massa congue, id scelerisque risus faucibus. Donec fringilla vel turpis sed suscipit.`;

  return (
    <>

      <section id="hero" className="d-flex justify-content-center align-items-center">
        <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
          <h1>Learning Today,<br />Leading Tomorrow</h1>


        </div>
      </section>

      <main id="main">

        <section id="about" className="about">
          <div className="container" data-aos="fade-up">

            <div className="row">
              <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                <img src="assets/img/course-details-tab-1.png" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                <h3>MISSION.</h3>
                <p className="fst-italic">
                  TO TRAIN FUTURE ENGINEERS BECOME MORE COMPETETIVE.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> In Computer profesional </li>
                  <li><i className="bi bi-check-circle"></i> Software Development.</li>
                  <li><i className="bi bi-check-circle"></i> Data Science.</li>
                </ul>
                <p>
                  And more
                </p>

              </div>
            </div>

          </div>
        </section>


        <section id="counts" className="counts section-bg">
          <div className="container">

            <div className="row counters">

            </div>

          </div>
        </section>


        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">

            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                  <h3>Why Choose this University?</h3>
                  <div>
                    <ExpandableParagraph text={text} />
                  </div>
                 
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="row">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-receipt"></i>
                        <h4>Card </h4>
                        <div>adding something after</div>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-cube-alt"></i>
                        <h4>card</h4>
                        <div>add functionality after</div>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-images"></i>
                        <h4>card</h4>
                        <div>add functionality after</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>





        <section id="popular-courses" className="courses">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Courses</h2>
              <p>Popular Courses</p>
            </div>

            <div className="row" data-aos="zoom-in" data-aos-delay="100">

              <CourseCard courses={courses} maxCourses={3} />

            </div>

          </div>
        </section>


        <section id="trainers" className="trainers">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Trainers</h2>
              <p>popular Trainers</p>
            </div>

            <div className="row" data-aos="zoom-in" data-aos-delay="100">
              <InstructorCard />


            </div>

          </div>
        </section>

      </main>

    </>
  )
}
