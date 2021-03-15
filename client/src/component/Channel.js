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
        <ul className="messages">
            {messages.map(message=>(
                <li key = {message.id}><Message {...message}/></li>
            ))}
        </ul>
        <form onSubmit={handleonSubmit}>
           <input className='form-control' type="text" value={newMessage} onChange={handleonChange} placeholder="message here"></input>
           <button type="submit" className="btn btn-primary" aria-label="Sizing example input" disabled={!newMessage}>send</button>
        </form>
        </div>
    )
};


export default Channel