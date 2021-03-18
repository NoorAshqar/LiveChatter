import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Message from './Message.js'
import './Channel.css'

const Channel = ({ user = null , db = null }) => {
    const  [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { uid,displayName,photoURL} = user;
    useEffect(() => {
        if(db){
            const unsubscribe = db.collection('messages').orderBy('createdAt').limit(100).onSnapshot(querySnapshot=>{
                const data = querySnapshot.docs.map(doc=>({
                    ...doc.data(),
                    id:doc.id,
                }));
                setMessages(data);
            });
            return unsubscribe;
        }
        
    }, [db]);
    const handleonChange= e =>{
        setNewMessage(e.target.value)
        e.target.style.height = "";e.target.style.height = e.target.scrollHeight + "px"
    }
    const handleonSubmit = e =>{
        e.preventDefault();
        if(db){
            db.collection('messages').add({
                text: newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName ,
                photoURL,
            })
        }
    }
    return (
        <div>
        <ul className="container-fluid d-flex flex-column justify-content-start align-items-start mb-5 messages">
            {messages.map(message=>(
                <li key = {message.id}><Message {...message}/></li>
            ))}
        </ul>
        <form className="container-fluid fixed-bottom d-flex flex-nowrap" onSubmit={handleonSubmit}>
           <textarea className="form-control input" rows="1" type="text" value={newMessage} onChange={handleonChange} placeholder="message here"></textarea>
           <button className="btn btn-success" type="submit" aria-label="Sizing example input" disabled={!newMessage}>send</button>
        </form>
        </div>
    )
};


export default Channel