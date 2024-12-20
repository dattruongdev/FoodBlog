import { useEffect, useState } from "react"
import './updateUser.css'
import { useUpdatePassword } from "../hooks/useUpdatePassword"
import { useUpdateEmail } from "../hooks/useUpdateEmail"
import { useUpdateAvatar } from "../hooks/useUpdateAvatar"
import { useUpdateName } from "../hooks/useUpdateName"
import {Link} from 'react-router-dom'
import Navbar from "../components/Navbar";

const UpdateUser = ()=>{
    
    
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword , setNewPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {updatePassword, passwordPending, passwordError} = useUpdatePassword()
    const {updateEmail, emailPending, emailError} = useUpdateEmail()
    const {updateAvatar, avatarPending, avatarError} = useUpdateAvatar()
    const {updateName, namePending, nameError} = useUpdateName()


    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    },[])

    const changeAvatar = (e)=>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setAvatar(reader.result)
        }
    }

    const handleAvatar = async(e) =>{
        e.preventDefault()
        await updateAvatar(avatar)
        setAvatar('')
    }

    const handleName = async(e) =>{
        e.preventDefault()
        await updateName(name)
        setName('')
    }

    const handleEmail = async (e)=>{
        e.preventDefault()
        await updateEmail(email)
        setEmail('')

    }
    
    const handlePasswordClick = async (e) =>{
        e.preventDefault()
        await updatePassword(oldPassword,newPassword)
        setOldPassword('')
        setNewPassword('')
    }
    

    return (
    <div>

        <div className="navbar-container">
          <Navbar />
        </div>


        <div className="updateUser">
            <h3>Change User Infomation</h3>
            <div className="form">
                <img id='avatar' width='100px' height='100px' alt='User Avatar' src={avatar}/>
                    
                <label> Change Avatar
                    <input
                        type='file'
                        onChange={(e)=>changeAvatar(e)}
                        accept='image/png, image/jpg'
                    />
                   
                </label>
                <button disabled={avatarPending} onClick={handleAvatar}>Change</button>
                <p>{avatarError}</p>



                <label> Change Name: 
                    <input
                        onChange={(e)=> setName(e.target.value)}
                        value = {name}
                    />
                    
                </label>
                <button disabled={namePending} onClick={handleName}>Change</button>
                <p>{nameError}</p>

                <label> Change Email : 
                    <input
                        onChange={(e)=> setEmail(e.target.value)}
                        value = {email}
                    />
                    
                </label>
                <button disabled={emailPending} onClick={handleEmail}>Change</button>
                <p>{emailError}</p>

                <p>Change Password</p>
                    <label> Old Password : 
                        <input
                            onChange={(e)=> setOldPassword(e.target.value)}
                            value = {oldPassword}
                        />
                    </label>

                    <label> New Password : 
                        <input
                            onChange={(e)=> setNewPassword(e.target.value)}
                            value = {newPassword}
                        />
                    </label>
                <button disabled={passwordPending} onClick={handlePasswordClick}>Change</button>
                <p>{passwordError}</p>
           

            </div>
            <div>
                <Link to='/auth/dashboard'> Finish Update</Link>
            </div>
        </div>

    </div>
        

    )
}

export default UpdateUser