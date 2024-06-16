import React from 'react'
import { selectUser } from '../../../../../../Store/Auth/AuthSlice';
import { useSelector } from 'react-redux';
import './Text.css'

const Text = ({text}) => {
    const user = useSelector(selectUser);

    return (
        <li className={text?.sender?.id === user?.id ? 'textContainer isMe' : 'textContainer receiver'}>
            <div className={text?.sender?.id === user?.id ? 'text isMe' : 'text receiver'}>
                <p>{text?.plainText || text?.message}</p>
                <div className='triangle'/>
            </div>
            {   text?.sender?.id !== user?.id && 
                <div className="latencyBlock">
                    <p>{text?.latency?.type.toUpperCase()} : <span>{text?.latency?.value}s</span></p>
                </div>
            }
        </li>
    )
}

export default Text