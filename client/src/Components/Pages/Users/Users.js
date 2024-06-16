import React, {useState, useEffect, useCallback} from 'react'
import { IoPerson } from "react-icons/io5";
import { useRetrieveAllUsersMutation } from '../../../Store/Chat/ChatApiSlice';
import { useAppContext } from '../../../Hooks/useContext';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../Store/Auth/AuthSlice';
import { useSelector } from 'react-redux';

import Countdown from '../../../UI/Countdown/Countdown';
import './Users.css'
const Users = () => {
    const [status, setStatus] = useState('idle')
    const [isEmpty, setIsEmpty] = useState(false)

    const user = useSelector(selectUser)

    const [retrieveUsers] = useRetrieveAllUsersMutation()

    const {users, setUsers, setReceiver} = useAppContext()

    const getUsers = useCallback(async() => {
        const retrieveResponse = await retrieveUsers()
        const {data, error} = retrieveResponse

        if(data){
            setStatus('success')

            const myContacts = data.filter(contact => contact?._id !== user?.id)
            
            setUsers([...myContacts])
            
            setIsEmpty(data?.length === 0)
        }
        else if(error){
            setStatus('failed')
        }
    }, [retrieveUsers, setUsers, user?.id])

    const setNewReceiver = (id) => {
        const newReceiver = users?.find(user => user?._id === id)
        
        setReceiver({...newReceiver})
    }

    useEffect(() => {
        getUsers()
    },[getUsers])

    return (
        <div className='users'>
            <h1>Hi <span>@{user?.userName}</span>.</h1>
            <h3>CONTACTS</h3>
            <ul className='usersList'>
                {
                    status === "idle" ? 
                        <div className='spinner'/> :
                    status === "success" && isEmpty ?
                        <li className="defaultText">No users here.</li>
                        :
                    status === "success" && !isEmpty ?
                        users.map((user, index) => {
                            return (
                                <li className='user' key={index}>
                                    <div className='contact'>
                                        <IoPerson />
                                        @{user?.user_name}
                                    </div>
                                    <Link to={`/chat/${user?._id}`} onClick={()=>setNewReceiver(user?._id)}>message</Link>
                                </li>
                            )
                        })
                        :
                        <Countdown/>
                }
            </ul>
        </div>
    )
}

export default Users