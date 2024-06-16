import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import { selectAllMessages } from '../../../../../Store/Chat/ChatSlice'
import Text from './Text/Text'
import './ChatList.css'

const ChatList = () => {
    const chats = useSelector(selectAllMessages)
    
    useEffect(()=>{
        if(chats.length > 0){
            const texts = document.querySelectorAll('.textContainer')
            
            const currentText = texts[texts?.length - 1]

            currentText?.scrollIntoView({
                behavior: 'smooth'
            })
        }

    }, [chats.length, chats])

    return (
        <ul className='chatList'>
            {
                chats?.length > 0 ?
                chats?.map((value, index) => {
                    return(
                        <Text
                            key={index}
                            text={value}
                        />
                    )
                })
                :
                <li className='defaultText'>No chats here..</li>
            }
        </ul>
    )
}

export default ChatList