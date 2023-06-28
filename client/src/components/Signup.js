import React ,{useEffect, useState}from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './style.css'
export default function Signup() {
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    

    async function submit(e){
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/user/create',{
               name, email, password, phone
            }).then(res =>{
                if(res.data){
                  alert('user is registered successfully')
                  history('/home', {state:{id:email}})
                }
                
            }).catch(e =>{
                alert('wrong input')
                console.log(e)
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='signup' >
      <h2>signup</h2>
      <form action='POST' >
      <label><b>Full Name
        </b>
        </label>
        <input type='text' onChange={e =>setName(e.target.value)} placeholder='Name' value={name} name='name' id='name'/>
        <label><b>Email
        </b>
        </label>
        <input type='email' onChange={e => {setEmail (e.target.value)}} placeholder='email' name='email' value={email} id="email"/>
        <label><b>Password
        </b>
        </label>
        <input type='password' onChange={e => {setPassword (e.target.value)}} placeholder='password' name='password' value={password} id="password"/>
        <label><b>Phone Number
        </b>
        </label>
        <input type='text' onChange={e =>setPhone(e.target.value)} placeholder='phone number' value={phone} name='phone' id='phone'/>
        <label><b>Role
        </b>
        </label>
    
        <input type='submit' onClick={submit}  id='reg' value="sign up"/>
      </form>
      <br/>
      <p className='or'>OR</p>
      <Link to ="/" className='back'> login page</Link>
    </div>
  )
}
