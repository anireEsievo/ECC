import React, {useState} from 'react'
import { useAppContext } from '../../../../../Hooks/useContext'
import { getSocket } from '../../../../../Services/Socket'
import { encryptMessage } from '../../../../../Services/Ecc'
import { selectUser } from '../../../../../Store/Auth/AuthSlice'
import  {useSelector, useDispatch} from 'react-redux'
import { addChat} from '../../../../../Store/Chat/ChatSlice'
import Input from '../../../../../UI/Input/Input'
import Button from '../../../../../UI/Button/Button'
import './ChatInput.css'

const ChatInput = () => {
    const [message, setMessage] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const {receiver, handleResponse, useCase} = useAppContext()

    const socket = getSocket()

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    // Usage of encrypt method
    const encrypt = (message, publicKey) => {
        return encryptMessage(message, publicKey)
    }

    const mapMessage = (payload, plainText) => {
        const newMessage = {
            case: payload.case,
            sender: payload.sender,
            receiver: payload.receiver,
            message: payload.message,
            sentAt: payload.sentAt,
            plainText: plainText
        };
        return newMessage 
    };

    const sendMessage = (payload, plainText) => {
        dispatch(addChat(mapMessage(payload, plainText)))
        
        socket?.emit('sendChat', payload);

        handleResponse({
            valid: true,
            message: 'Message sent.',
            type: 'success',
            timeout: 1500,
        });
    };

    const handleSend = () => {
        if (message !== '') {
            setIsEmpty(false);

            const noEccPayload = {
                case: "no-Ecc",
                sender: user,
                receiver: receiver,
                message: message,
                sentAt: Date.now()
            };

            const eccPayload = {
                case: "ecc",
                sender: user,
                receiver: receiver,
                message: encrypt(message, receiver?.public_key),
                sentAt: Date.now()
            };

            if(useCase === "ecc"){
                sendMessage(eccPayload, message)
            }
            else{
                sendMessage(noEccPayload, message)
            }

            setMessage('');
        } else {
            setIsEmpty(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSend();
    };

    const handleKeySubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };
    
    return (
        <form className='chatInput' onSubmit={handleSubmit}>
            <Input
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeySubmit}
                placeholder={"Enter message.."}
                isEmpty={isEmpty}
                type={"textarea"}
            />
            <Button
                text={"Send"}
                type={"submit"}
                clickEvent={()=>{}}
            />
        </form>
    )
}

export default ChatInput