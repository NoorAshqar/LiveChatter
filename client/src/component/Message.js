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
        <div className='message'>
            {displayName ? <p>{displayName}</p> : null}
            {
                photoURL ? (
                    <img src={photoURL} alt="Avatar" width={40} height={40} border-radius='25px' border='2px'/>
                    ) : null}
                {createdAt?.seconds ?(
                    <span>
                        {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                    </span>
                ) : null}
                <p className='text'>{text}</p>
        </div>
    );
};

Message.propTypes = {
    
};

export default Message;