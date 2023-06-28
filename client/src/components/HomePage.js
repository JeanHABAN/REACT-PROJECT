import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HomePage() {
    const location = useLocation();
    console.log(location)
  return (
    <div className='homepage'>
      <h1>hello {location.state.id} and welcome </h1>
  
    </div>
    
  )
  
}
