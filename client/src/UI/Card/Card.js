import React from 'react'
import { BsWechat } from 'react-icons/bs'

const Card = ({children}) => {
    return (
        <div className="card grid-row">
            <div className="chatIcon--container">
                <BsWechat size={400} className='chatIcon' color='#ABDFF1' />
            </div>
            {children}
        </div>
    )
}

export default Card