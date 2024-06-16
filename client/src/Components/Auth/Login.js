import React, { useState } from 'react'
import { ValidateAuth } from '../../Utils/Validate'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../Store/Auth/AuthApiSlice'
import { useAppContext } from '../../Hooks/useContext'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn, setUser } from '../../Store/Auth/AuthSlice'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const Login = React.memo(() => {
    const [login] = useLoginMutation()
    
    const {handleResponse} = useAppContext()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [isEmpty, setIsEmpty] = useState({
        username: false,
        password: false
    })

    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    })
    
    const [inputErrors, setInputErrors] = useState({
        username: '',
        password: '',
        none: false
    })
    
    const handleUserNameChange = (e) => {
        setInputValues(prev => {
            return {...prev, username:e.target.value}
        })
    }
    
    const handlePasswordChange = (e) => {
        setInputValues(prev => {
            return {...prev, password:e.target.value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = ValidateAuth(inputValues, 'login')
        setInputErrors(errors)

        if(errors.password){
            setIsEmpty(prev => {
                return {...prev, username:true}
            })
        }
        if(errors.password){
            setIsEmpty(prev => {
                return {...prev, password:true}
            })
        }

        if(errors.none){
            const newResponse = {
                type: 'processing',
                message: 'Please wait',
                valid: true,
                timeout: 2500
            }
            
            handleResponse(newResponse)

            const payload = {
                userName: inputValues.username,
                password: inputValues.password
            }

            const loginResponse = await login(payload)
            
            const {data, error} = loginResponse
            
            if(data){
                navigate('/chat', {replace: true})

                const newResponse = {
                    type: 'success',
                    message: 'Logged In',
                    valid: true,
                    timeout: 2500
                }
                
                handleResponse(newResponse)

                const newUser = {
                    id: data?._id,
                    publicKey: data?.public_key,
                    privateKey: data?.private_key,
                    token: data?.access_token,
                    userName: data?.user_name
                }
    
                dispatch(setIsLoggedIn(true))
                dispatch(setUser(newUser))
                
                setInputValues({
                    username: '',
                    password: ''
                })
            }
            else{
                const newErr = {
                    type: 'fail',
                    message:error?.data?.message,
                    valid: true,
                    timeout: 2500
                }

                handleResponse(newErr)
            }
            
        }
        else{
            handleResponse({
                type: 'fail',
                message: 'Something went wrong..',
                valid: true,
                timeout: 2500
            })
        }
    }

    return (
        <div className='authForm'>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    value={inputValues.username}
                    error={inputErrors.username}
                    onChange={handleUserNameChange}
                    onKeyDown={()=>{}}
                    placeholder={"Enter your username.."}
                    isEmpty={isEmpty.username}
                    type={"text"}
                />
                <Input
                    value={inputValues.password}
                    error={inputErrors.password}
                    onChange={handlePasswordChange}
                    onKeyDown={()=>{}}
                    placeholder={"Password"}
                    isEmpty={isEmpty.password}
                    type={"password"}
                />
                <Button
                    text='Login'
                    type='submit'
                    clickEvent={()=>{}}
                />
            </form>
            <p className='alternateRoute'>Don't have an account? <span><Link to= '/'>Register</Link></span></p>
        </div>
    )
})

export default Login