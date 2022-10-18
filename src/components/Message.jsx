import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext';
import { ChatContext } from '../ChatContext';



const Message = ({message}) => {
  const {data}=useContext(ChatContext);
  const {currentUser}=useContext(AuthContext);

  return (
    <div className={`message ${message.senderId===currentUser.uid && "owner"}`}>
    <div className='messageInfo'>
      <img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt='image'/>
      <span>Just Now</span>
    </div>

    <div className='messageContent'>
      <p>{message.text}</p>
      
    </div>
    </div>
  )
}

export default Message
