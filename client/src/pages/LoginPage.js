import {useEffect, useState} from 'react'
import './Login.css'
import { useLogin } from '../hooks/useLogin'
import {Link} from 'react-router-dom'
import Navbar from "../components/Navbar";
const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState ('')

    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e)=>{
        e.preventDefault()

        await login(email, password)
    }

    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    },[])

    return(
            <div>
                <div className="navbar-container">
            <Navbar />
            </div>

            <form className='login' onSubmit={handleSubmit}>
                <h3>Log in</h3>
    
                <label>Email: </label>
                <input
                    type="email"
                    onChange= {(e)=>setEmail(e.target.value)}
                    value = {email}
                    
                />
                <label>Password: </label>
                <input
                    type="password"
                    onChange= {(e)=>setPassword(e.target.value)}
                    value = {password}
                />

                {error && <div className='error'>{error}</div>}
                <input disabled={isLoading} id='submit-btn'
                type='submit'
                />
                
                <Link to='/auth/signup'>Signup</Link>
            </form>
        </div>
        
        
    )
}

export default Login