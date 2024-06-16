import React, {useState} from 'react'
import { IoIosArrowDropleft, IoIosArrowDropright  } from "react-icons/io";
import { useLogoutMutation } from '../../Store/Auth/AuthApiSlice'
import { useDispatch } from 'react-redux'
import { signOut } from '../../Store/Auth/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Hooks/useContext'
import Button from '../Button/Button';
import './Logout.css'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [logout] = useLogoutMutation()
    
    const [isOpen, setIsOpen] = useState(false)

    const {handleResponse} = useAppContext()

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleLogOut = async () => {
        setIsOpen(false)

        const newResponse = {
            type: 'processing',
            message: 'Please wait',
            valid: true,
            timeout: 2500
        }

        handleResponse(newResponse)

        const logoutResponse = await logout()

        const {data, error} = logoutResponse

        if(data){
            navigate('/login', {replace: true})

            const newResponse = {
                type: 'success',
                message: 'Logged Out.',
                valid: true,
                timeout: 2500
            }

            handleResponse(newResponse)

            dispatch(signOut())

        }
        else{
            dispatch(signOut())
        }
    }

    return (
        <div className='logout'>
            {isOpen ? <IoIosArrowDropright size={40} className='logOutControls' color='#0C4A60' onClick={handleOpen} /> : <IoIosArrowDropleft className='logOutControls' size={40} color='#0C4A60' onClick={handleOpen} />}
            <div className = {isOpen ? 'buttonBlock open' : 'buttonBlock close'}>
                <Button
                    text='Logout'
                    type='button'
                    clickEvent={handleLogOut}
                />
            </div>
        </div>
    )
}

export default Logout