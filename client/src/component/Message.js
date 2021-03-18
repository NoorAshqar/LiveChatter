import React from 'react';
import { formatRelative } from 'date-fns';

import './Message.css'


const Message = ({
    createdAt = null,
    text='',
    displayName = '',
    photoURL='',
}) =>{
    return (
        <div className='card text-white bg-success message'>
            <div className="container d-flex justify-content-start align-items-center mt-2 space">
                <img className="profile" src={photoURL || "https://icon-library.com/images/profile-icon/profile-icon-22.jpg"} alt="profile"></img>
                <span className="userName">{displayName ? displayName : 'user not found'}</span>
                <span className="time">{formatRelative(new Date(createdAt.seconds * 1000), new Date())}</span>
            </div>
            <p className='text'>{text}</p>
        </div>
    );
};

Message.propTypes = {
    
};

export default Message;