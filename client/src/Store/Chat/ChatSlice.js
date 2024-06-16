import {createSlice, createEntityAdapter} from '@reduxjs/toolkit'

const chatsAdapter = createEntityAdapter({
    sortComparer: (a,b) => a?.id - b?.id,
})

const selectId = (chat) => chat?.id

chatsAdapter.selectId = selectId

const initialState = chatsAdapter.getInitialState({
    receiver: null
})

const ChatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setReceiver: (state, action) => {
            state.receiver = action.payload
        },
        addChat: (state, action) => {
            const newChat = {id: state.ids.length + 1, ...action.payload}
            chatsAdapter.addOne(state, newChat)
        },
        clearChat: (state) => {
            chatsAdapter.removeAll(state)
        }
    }
})

export const {
    setReceiver,
    addChat,
    clearChat
} = ChatSlice.actions

export const {
    selectAll: selectAllMessages
} = chatsAdapter.getSelectors(state => state.chat)

export const selectReceiver = (state) => state.chat.receiver

export default ChatSlice.reducer