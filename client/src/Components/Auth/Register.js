import React, { useState } from 'react'
import { ValidateAuth } from '../../Utils/Validate'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useContext'
import { useRegisterMutation } from '../../Store/Auth/AuthApiSlice'
import { ec } from '../../Services/Ecc'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const Register = React.memo(() => {
    // Generating the key-pair (Public and Private Keys)
    const keyPair= ec.genKeyPair()

    // Obtaining public and private keys; public for encryption, private for decryption.
    const publicKey = keyPair.getPublic('hex')
    const privateKey = keyPair.getPrivate('hex')

    const {handleResponse} = useAppContext()
    
    const navigate = useNavigate()

    const [register] = useRegisterMutation()

    const [isEmpty, setIsEmpty] = useState({
        username: false,
        password: false,
        confirmPassword: false
    })

    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    
    const [inputErrors, setInputErrors] = useState({
        username: '',
        password: '',
        confirmPassword: '',
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
    
    const handleConfirmPasswordChange = (e) => {
        setInputValues(prev => {
            return {...prev, confirmPassword:e.target.value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const errors = ValidateAuth(inputValues, 'registration')
        setInputErrors(errors)

        if(errors.username){
            setIsEmpty(prev => {
                return {...prev, username:true}
            })
        }
        if(errors.password){
            setIsEmpty(prev => {
                return {...prev, password:true}
            })
        }
        if(errors.confirmPassword){
            setIsEmpty(prev => {
                return {...prev, confirmPassword:true}
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
                password: inputValues.password,
                publicKey: publicKey,
                privateKey: privateKey
            }
            
            const regResponse = await register(payload)
            
            const {data, error} = regResponse

            if(data){
                navigate('/login', {replace: true})
                const newResponse = {
                    type: 'success',
                    message: 'Registration Successful',
                    valid: true,
                    timeout: 2500
                }
                handleResponse(newResponse)
                setInputValues({
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
            }
            else{
                const newErr = {
                    type: 'fail',
                    message: error?.data?.message,
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
            <h2>REGISTER</h2>
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
                <Input
                    value={inputValues.confirmPassword}
                    error={inputErrors.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onKeyDown={()=>{}}
                    placeholder={"Confirm Password"}
                    isEmpty={isEmpty.confirmPassword}
                    type={"password"}
                />
                <Button
                    text='Register'
                    type='submit'
                    clickEvent={()=>{}}
                />
            </form>
            <p className='alternateRoute'>Already have an account? <span><Link to= '/login'>Login</Link></span></p>
        </div>
    )
})

export default Register