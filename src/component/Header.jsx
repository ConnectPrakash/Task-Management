import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/male.jpg'
function Header({props}) {
  const navigate = useNavigate();
  const user = localStorage.getItem('token') ||null;
  console.log(user);
  const handleLogOut = () =>{
    navigate('/');
    localStorage.removeItem('token');
   
    window.location.reload(); 
  
  }
  return (
    <div className='header'>
      <h2>{props}</h2>
      <div className='header-inside'>
      {user?<img src={image} alt='default' onClick={()=>navigate('/userProfile')}/>:''}
      {user ?<Link onClick={handleLogOut} className='header-inside-a'>Log Out</Link> :<Link to='/login'>Login</Link>}
 
      </div>
         </div>
  )
}

export default Header
