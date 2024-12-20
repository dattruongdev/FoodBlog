import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../styles/nav.style.css"
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout'


const NavB = () => {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const logout = useLogout()

  const [email, setEmail] = useState('')
 
  useEffect(()=>{
    if(!user){
      return
    }
    setEmail(user.email)
  },[user])

  const handleLogout = async e => {
    e.preventDefault();
    await logout()
    navigate('/')
  }

  return (
    <div className="navbar">
      <NavLink className="nav-home" to="/" style={({ isActive, isPending, isTransitioning }) => {
        return {
          fontWeight: isActive ? "bold" : "",
          color: isPending ? "red" : "black",
          viewTransitionName: isTransitioning ? "slide" : "",
        };
      }}></NavLink>


      {!user && <div>
      {
      <button>
        <NavLink to={"/auth/login"} style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}>Login</NavLink>
      </button>}
      </div>}


      {user && <div>
        <button className={ "nav-user"}>
        <NavLink to={"/auth/dashboard"} style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}>{email}</NavLink>
      </button>
      <button onClick={handleLogout} style={user ? {} : { display: "none" }}>Log out</button>
      </div>}
      
      

    </div>
  )
}

export default NavB;
