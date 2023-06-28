import React from 'react'

export default function EditForm() {
  return (
    <div className='modal-container'>

      <div className='modal'>modal
      <form >
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name'/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email'/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password'/>
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input type='text' name='phone'/>
        </div>
        <div className='form-group'>
          <label htmlFor='role'>Role</label>
          <input type='text' name='role'/>
        </div>
        <button type='submit' className='btn'>Submit</button>
      </form>
      </div>
      
    </div>
  )
}
