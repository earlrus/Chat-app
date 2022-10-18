
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../AuthContext';
import { ChatContext } from '../ChatContext';
import { db, storage } from '../firebase';
import Img from '../images/photo.png'
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
const [text,setText]=useState("");
const [img,setImg]=useState(null);

  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);

  const handleSend=async()=>{

    if(img){
      const storageRef = ref(storage,uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(  
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chat",data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
            })
            
          });
        }
      );
      
    }
    else{
      await updateDoc(doc(db,"chat",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,"userChat",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    await updateDoc(doc(db,"userChat",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

setText("");
setImg(null);

  }

  return (
    <div className='input'>
    <input type='text' placeholder='Type something....' value={text} onChange={(e)=>{setText(e.target.value)}}/>
      <div className='send'>
   
      
        
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
