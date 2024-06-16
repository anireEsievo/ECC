import React from 'react'
import './Button.css'

const Button = ({text, clickEvent, type}) => {
    return (
        <button 
            className='fnc--btn' 
            onClick={clickEvent}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button