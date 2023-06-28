import './App.css';
import {
  Routes, Route, createBrowserRouter,
  createRoutesFromElements, Outlet, Router, RouterProvider, Link
} from 'react-router-dom'
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer'
import Home from './pages/Home';
import About from './pages/About';
import Login from './components/Login';
import Signup from './components/Signup';

import Courses from './pages/Courses';
import InstructorCard from './components/InstructorCard';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Logout from './components/Logout';

import { dataLoader } from './components/Data';
import { dataLoaderTrainer } from './components/InstructorCard';
import Form from './components/Form';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from './components/Context';
import Table from './components/Table';
import FormTeachers from './components/FormTeacher';
import Users from './components/AdminUser';
import AdminCourses, { dataLoaderCourseAdmin } from './components/AdminCourses';
import AdminTrainer, { dataLoaderTrainerAdmin } from './components/AdminTrainer';
import AdminStudent, { dataLoaderStudenteAdmin } from './components/AdminStudent';
import { dataLoaderUserAdmin } from './components/AdminUser';

function App() {
  const {user} = useContext(Context)
  const [isLogin, setIsLogin] = useState(user);
  // let loggedInUser = JSON.parse(localStorage.getItem('user'))
  // if(loggedInUser){
  //   dispatch({ type: "LOGIN_SUCCESS", payload: loggedInUser });

  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={user == null ? <Login /> :<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={!isLogin ? <Login /> :<Home />} />
        {/* <Route path='about' element={!isLogin ? <Login /> :<About />} /> */}
        <Route path='courses' element={!isLogin ? <Login /> :<Courses />} loader={dataLoaderCourseAdmin}  />
        <Route path='trainers' element={!isLogin ? <Login /> :<InstructorCard />}  />
        {/* <Route path='events' element={!isLogin ? <Login /> :<Events />} /> */}
        {/* <Route path='contact' element={!isLogin ? <Login /> :<Contact />} /> */}
        <Route path='details' element ={user == null ? <Login /> :  user.role == "admin" && <Form/> }>
          <Route path="users" element={<Users/>} loader={dataLoaderUserAdmin}/>
          <Route path="courses" element={<AdminCourses/>} loader={dataLoaderCourseAdmin}/>
          <Route path='students' element={<AdminStudent/>} loader={dataLoaderStudenteAdmin}/>
          <Route path='trainers' element={<AdminTrainer/>} loader={dataLoaderTrainerAdmin}/>
          
        </Route>
       
      </Route>
    )
  )
  return (
    <>
      <div className='App'>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

export const Root = () => {
  return <><div>
     <Nav/>
    </div>
    <div><Outlet /> </div>
    <div><Footer/></div>
  </>
}