import React,{useEffect, useCallback} from 'react'
import { useAppContext } from '../../../Hooks/useContext'
import { connectSocket, getSocket } from '../../../Services/Socket'
import { decryptMessage } from '../../../Services/Ecc'
import { useRetrieveReceiverMutation } from '../../../Store/Chat/ChatApiSlice'
import { useParams } from 'react-router-dom'
import { selectUser } from '../../../Store/Auth/AuthSlice'
import {useDispatch, useSelector} from 'react-redux'
import GroupChat from './GroupChat/GroupChat'
import { addChat, clearChat} from '../../../Store/Chat/ChatSlice'

const Chat = React.memo(() => {
    const {receiver, setReceiver, handleResponse} = useAppContext()

    const user = useSelector(selectUser)
    const dispatch = useDispatch()


    const {id} = useParams()
    
    const socket = getSocket()

    const [retrieveReceiver] = useRetrieveReceiverMutation()

    const mapMessage = useCallback((payload, receivedAt) => {
        const { sender, receiver, message, case:currentCase, sentAt} = payload
        
        const newLatency = (receivedAt - sentAt) / 1000
        
        let newMessage = {
            sender: sender,
            receiver: receiver,
            message: 'undetermined',
            latency: {
                type: currentCase,
                value: currentCase === 'ecc' ? newLatency.toFixed(2) : (newLatency + 0.1).toFixed(2)
            }
        }

        if(currentCase === 'ecc'){
            const {encryptedMessage, ephemeralPublicKey} = message
            const decryptedMessage = decryptMessage(encryptedMessage, ephemeralPublicKey, user?.privateKey) // Implementation and usage of decrypt method
            
            newMessage.message = decryptedMessage
        }
        else{
            newMessage.message = message
        }

        return newMessage
    },[user?.privateKey])

    const getReceiver = useCallback(async (id)=>{
        const receiverResponse = await retrieveReceiver(id)

        const {data, error} = receiverResponse

        if(data){
            setReceiver({...data})
        }
        else if(error){
            setTimeout(()=>{
                getReceiver(id)
            },3000)
        }
    },[retrieveReceiver, setReceiver])

    useEffect(()=>{
        if(!receiver){
            getReceiver(id)
        }
    },[getReceiver, id, receiver])

    const handleSocketEvents = useCallback(()=>{
        const getNewMessage = (payload) => {
            const receivedAt = Date.now()

            const newResponse = {
                valid: true,
                message: 'New message.',
                type: 'success',
                timeout: 1500
            }
            
            handleResponse(newResponse)

            if(payload?.receiver?._id === user?.id){
                dispatch(addChat(mapMessage(payload, receivedAt)))
            }
        }

        socket?.on('newChats', getNewMessage)

        return () => {
            socket?.off('newChats', getNewMessage)
        }
    }, [ socket, user, handleResponse, mapMessage, dispatch])

    useEffect(()=>{
        if(user){
            connectSocket('/chats')
        }

        const cleanup = handleSocketEvents()

        return () => {
            cleanup()
        }
    },[handleSocketEvents, user])

    useEffect(()=>{
        return () => {
            dispatch(clearChat())
        }
    },[dispatch])

    return (
        <div className='mainApp'>
            <GroupChat/>
        </div>
    )
})

export default Chat