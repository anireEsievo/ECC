import React, { useEffect } from 'react'
import { useAppContext } from '../../Hooks/useContext'
import { FaCheck } from "react-icons/fa6";
import { BiError } from 'react-icons/bi';
import Spinner from '../Spinner/Spinner'
import './Response.css'

const Response = () => {
    const {response, resetResponse} = useAppContext()
    const {type, message, valid, timeout} = response

    useEffect(()=>{
        if(valid !== false && type !== 'processing'){
            setTimeout(()=>{
                resetResponse()
            }, timeout)    
        }
    },[resetResponse, type, valid, timeout])

    return (
        <div className={
                (type === 'success' && valid) ?
                'response success valid'
                :
                (type === 'success' && !valid) ?
                'response success'
                :
                (type === 'fail' && valid) ?
                'response fail valid'
                :
                (type === 'fail' && !valid) ?
                'response fail'
                :
                (type === 'processing' && valid) ?
                'response processing valid'
                :
                (type === 'processing' && !valid) ?
                'response processing'
                :
                'response null'    
            }
        >
            {message}
            {
                type === 'success' ?
                <FaCheck />
                :
                type === 'fail' ?
                <BiError />
                :
                <Spinner/>
            }
        </div>
    )
}

export default Response