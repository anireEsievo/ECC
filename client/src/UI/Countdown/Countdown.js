import React, { useEffect, useState } from 'react'
import './Countdown.css'

const Countdown = () => {
    const [seconds, setSeconds] = useState(3);

    useEffect(()=>{
        setInterval(()=>{
            if(seconds !== 0){
                setSeconds(seconds - 1)
            }
        }, 1000)
    },[seconds])

    return (
        <div className= "countdown">
            <h4>Something went wrong; <span>Retrying in..</span></h4>
            <p>{seconds}</p>
            <div className="countdownSpinner">
                <div className='spinner'/>
            </div>
        </div>
    )
}

export default Countdown