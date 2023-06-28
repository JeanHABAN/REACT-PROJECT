import React from 'react'

export default function Events() {
    return (
        <>

            <section id="events" className="events">
                <div className="container" data-aos="fade-up">

                    <div className="row">
                        <div className="col-md-6 d-flex align-items-stretch">
                            <div className="card">
                                <div className="card-img">
                                    <img src="assets/img/events-1.jpg" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="">Introduction to webdesign</a></h5>
                                    <p className="fst-italic text-center">Sunday, September 26th at 7:00 pm</p>
                                    <p className="card-text">Lorem ipsum dolor sit amet ea commodo consequat</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-stretch">
                            <div className="card">
                                <div className="card-img">
                                    <img src="assets/img/events-2.jpg" alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="">Marketing Strategies</a></h5>
                                    <p className="fst-italic text-center">Sunday, November 15th at 7:00 pm</p>
                                    <p className="card-text">Sed ut perspiciatis unde omnis iste natus error sit voo</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
