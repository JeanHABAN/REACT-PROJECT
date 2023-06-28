import React, { useReducer, useState } from 'react'
import axios from 'axios';
import './styleForm.css'
import formReducer from './formReducer'
import Table from './Table';
import { Link, Outlet } from 'react-router-dom';



const initialState = {
    name: '',
    code: '',
    address: '',
    teachers: [],
    courses: []
};

function schoolReducer(state, action) {
    switch (action.type) {
        case 'set_name':
            return { ...state, name: action.payload };
        case 'set_code':
            return { ...state, code: action.payload };
        case 'set_address':
            return { ...state, address: action.payload };
        case 'add_teacher':
            return { ...state, teachers: [...state.teachers, { tname: '', photo: '' }] };
        case 'remove_teacher':
            return { ...state, teachers: state.teachers.filter((_, index) => index !== action.payload) };
        case 'set_teacher':
            return {
                ...state,
                teachers: state.teachers.map((teacher, index) => {
                    if (index === action.payload.index) {
                        return { ...teacher, [action.payload.name]: action.payload.value };
                    }
                    return teacher;
                })
            };
        case 'add_course':
            return { ...state, courses: [...state.courses, { title: '', capacity: 0, available: 0, students: [] }] };
        case 'remove_course':
            return { ...state, courses: state.courses.filter((_, index) => index !== action.payload) };
        case 'set_course':
            return {
                ...state,
                courses: state.courses.map((course, index) => {
                    if (index === action.payload.index) {
                        return { ...course, [action.payload.name]: action.payload.value };
                    }
                    return course;
                })
            };
        case 'add_student':
            return {
                ...state,
                courses: state.courses.map((course, index) => {
                    if (index === action.payload.courseIndex) {
                        const students = [...course.students, { sname: '' }];
                        const available = course.available - 1;
                        return { ...course, students, available };
                    }
                    return course;
                })
            };
        case 'remove_student':
            return {
                ...state,
                courses: state.courses.map((course, index) => {
                    if (index === action.payload.courseIndex) {
                        const students = course.students.filter((_, index) => index !== action.payload.studentIndex);
                        const available = course.available + 1;
                        return { ...course, students, available };
                    }
                    return course;
                })
            };
        case 'set_student':
            return {
                ...state,
                courses: state.courses.map((course, index) => {
                    if (index === action.payload.courseIndex) {
                        const students = course.students.map((student, index) => {
                            if (index === action.payload.studentIndex) {
                                return { ...student, [action.payload.name]: action.payload.value };
                            }
                            return student;
                        });
                        return { ...course, students };
                    }
                    return course;
                })
            };

        case 'UPDATE_COURSE':
            const newCourses = [...state.courses];
            newCourses[action.payload.index][action.payload.name] = action.payload.value;
            return { ...state, courses: newCourses };

        case 'update_teacher':
            const { index, name, value } = action.payload;
            const updatedTeachers = [...state.teachers];
            updatedTeachers[index] = { ...updatedTeachers[index], [name]: value };
            return { ...state, teachers: updatedTeachers };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export default function Form() {
    const [school, dispatch] = useReducer(schoolReducer, initialState);
  
    return (
    <>
    <br/><br/>
<ul className='d-flex justify-content-around division'>
    <li style={{color:"white"}}><Link to='users'><b style={{color:"white"}}>USERS</b></Link></li>
    <li style={{color:"white"}}><Link to='courses'><b style={{color:"white"}}>COURSES</b></Link></li>
    <li style={{color:"white"}}><Link to='trainers'><b style={{color:"white"}}>TRAINERS</b></Link></li>
    <li style={{color:"white"}}><Link to='students'><b style={{color:"white"}}>STUDENTS</b></Link></li>
</ul>
<Outlet/>
      </> 
    )
}

