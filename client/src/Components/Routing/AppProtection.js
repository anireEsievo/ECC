import React, { useCallback, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {selectUser, setIsLoggedIn, setUser } from '../../Store/Auth/AuthSlice'
import Protect from '../../UI/Protect/Protect'

const AppProtection = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = useSelector(selectUser)

    const [validating, setValidating] = useState(true)

    // Re-Auth Methods
    const saveTokenToStorage = useCallback(() => {
        sessionStorage.setItem('user', JSON.stringify(user))
    },[user])

    const getTokenFromStorage = useCallback(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'))
        
        dispatch(setIsLoggedIn(true))
        dispatch(setUser({...storedUser}))

        sessionStorage.removeItem('user')
    },[dispatch])

    useEffect(()=>{
        if(user === 'signed-out'){
            navigate('/login', {replace: true})
        }
    },[navigate, user])

    useEffect(()=> {
        window.addEventListener('beforeunload', saveTokenToStorage)
        window.addEventListener('load', getTokenFromStorage)
        
        setTimeout(()=>{
            setValidating(false)
        }, 1500)
        
        return () => {
            window.removeEventListener('beforeunload', saveTokenToStorage)
            window.removeEventListener('load', getTokenFromStorage)
        }

    }, [saveTokenToStorage, getTokenFromStorage])

    return (validating) ? <Protect/> : (!validating && user) ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
}

export default AppProtection