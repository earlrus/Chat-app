import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { auth } from '../firebase'

const Navbar = () => {

  const {currentUser}=useContext(AuthContext);

  return (
    <div className='navbar'>
    <span className='logo'>Aman R Chat</span>
    <div className='user'>
<img src={currentUser.photoURL} alt='user'/>
<span>{currentUser.displayName}</span>
<button onClick={()=>{signOut(auth)}}>logout</button>
    </div>
    </div>
  )
}

export default Navbar
