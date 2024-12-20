import {useEffect, useState} from 'react'
import './Signup.css'
import {useSignup} from '../hooks/useSignup'
import {Link} from 'react-router-dom'
import Navbar from "../components/Navbar";
const Signup = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await signup(name, email, password)
    }

    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    })

    return(
        <div>
            <div className="navbar-container">
            <Navbar />
             </div>
            <form className='signup' onSubmit={handleSubmit}>
                <h3>Sign up</h3>

                <label>Your name: </label>
                <input
                    onChange= {(e)=>setName(e.target.value)}
                    value = {name}
                />
                <label>Your email: </label>
                <input
                    type="email"
                    onChange= {(e)=>setEmail(e.target.value)}
                    value = {email}
                />
                <label>Your password: </label>
                <input
                    type="password"
                    onChange= {(e)=>setPassword(e.target.value)}
                    value = {password}
                />
                {error && <div className='error'> {error} </div>}
                <input disabled={isLoading} id='submit-btn'
                type='submit'
                />
                
                <Link to='/auth/login'>Login</Link>
            </form>
        </div>
        
    )
}

export default Signup