import React from 'react'
import './Input.css'

const Input = ({type, onChange, value, error, onKeyDown, placeholder, isEmpty}) => {
    return (
        <div className='formElement'>
            <small className={error !== '' ? 'error' : ''}>{error !== '' ? error : ''}</small>
            {
                type === "text" || type === "password" ?
                    <input
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        className={isEmpty ? 'shake error': ''}
                    />
                :
                <textarea
                    onChange={onChange} 
                    placeholder={placeholder} 
                    value={value} 
                    onKeyDown={onKeyDown}
                    cols={20} 
                    rows={5}
                    className={isEmpty ? 'shake error': ''}
                />
            }
        </div>
    )
}

export default Input