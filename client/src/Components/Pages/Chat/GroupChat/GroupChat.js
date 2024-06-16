import React from 'react'
import { GrGroup } from "react-icons/gr";
import { useAppContext } from '../../../../Hooks/useContext';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ChatList from './ChatList/ChatList'
import ChatInput from './ChatInput/ChatInput'
import Button from '../../../../UI/Button/Button';
import './GroupChat.css'

const GroupChat = React.memo(() => {
    const {useCase, setUseCase, receiver} = useAppContext()

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    const toggleTest = () => {
        if(useCase === "ecc"){
            setUseCase("normal")
        }
        else{
            setUseCase("ecc")
        }
    }
    
    return (
        <div className='groupChat'>
            <div className="chatBody">
                <div className='groupChat--head'>
                    <div>
                        <FaArrowLeft className='chatBack' onClick={goBack}/>
                        <div className="chat-head">
                            <GrGroup size={20} color='#0C4A60' />
                        </div>
                        <div className='testUser'>
                            <h2>Test</h2>
                            <h5>@{receiver ? receiver?.user_name : ' ...'}</h5>
                        </div>
                    </div>
                        <Button
                            type="button"
                            text={useCase === "ecc" ? "ECC" : "Default"}
                            clickEvent={toggleTest}
                        />
                </div>
                <ChatList/>
                <ChatInput/>
            </div>
        </div>
    )
})

export default GroupChat