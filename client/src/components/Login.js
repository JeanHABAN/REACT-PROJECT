import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Context } from './Context'
import { useContext } from 'react'
import './style.css';
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = 'http://localhost:5000/user'
export default function Login() {


    const { user, dispatch, isFetching } = useContext(Context)

    const [login, setLogin] = useState({ email: "", password: "" })
    const [loginMsg, setLogimsg] = useState("")

    const navigate = useNavigate()
    function handleChange(e) {

        setLogin({ ...login, [e.target.name]: e.target.value })
    }


    async function siginFunc(e) {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" });

        try {
            const response = await axios.post('/login', login);
            localStorage.setItem('accessToken', response.data);
            const userData = jwt_decode(response.data);
            const loginuser = {...userData, accessToken:response.data}
            dispatch({ type: "LOGIN_SUCCESS", payload: loginuser });

            if (loginuser.role === "admin") {
                navigate('/details')
            } else {
                navigate('/home')
            }

        } catch (e) {
            dispatch({ type: "LOGIN_FAILURE" });
        }

    }
    ///////////////////////////////////////////
    return (
        <div className='login' >
            <h2>Login</h2>
            <form>
                <label><b>User Name
                </b>
                </label>
                <input type='email' onChange={handleChange} placeholder='email' name='email' value={login.email} id='email' />


                <label><b>Password
                </b>
                </label>
                <input type='password' onChange={handleChange} placeholder='password' name='password' value={login.password} id='password' /><br />

                <input type="checkbox" id="check" />
                <span>Remember me</span>
                <br />

                <input type='button' onClick={siginFunc} id='log' value="login" />
            </form>
            <br />
            <p className='or'>OR</p>
            <Link to="/signup"> sign up</Link>
        </div>
    )
}
