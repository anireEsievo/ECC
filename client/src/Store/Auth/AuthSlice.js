import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user: null
}

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = {...action.payload}
        },
        signOut: (state) => {
            state.isLoggedIn = false
            state.user = 'signed-out'
        }
    }
})

export const {
    setIsLoggedIn,
    setUser,
    signOut
} = AuthSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn 
export const selectUser = (state) => state.auth.user

export default AuthSlice.reducer