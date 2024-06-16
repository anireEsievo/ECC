import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'
import { setUser, setIsLoggedIn, signOut } from '../Auth/AuthSlice'


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LOCAL_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.user?.token

        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
    }
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    const token = api.getState().auth.user?.token

    let response = await baseQuery(args, api, extraOptions)

    if(response?.error?.status === 401 && token){
        const refreshResult = await baseQuery(`/auth/refresh/${token}`, api, extraOptions)

        if(refreshResult?.data){
            const data = api.getState()

            const newUser = {
                id: data?._id,
                publicKey: data?.public_key,
                privateKey: data?.private_key,
                token: data?.access_token,
                userName: data?.user_name
            }

            api.dispatch(setIsLoggedIn(true))
            api.dispatch(setUser(newUser))

            response = await baseQuery(args, api, extraOptions)
        }
        else if(refreshResult?.error){
            api.dispatch(signOut())
        }
    }
    else if (response?.error?.status === 403){
        api.dispatch(signOut())
    }
    return response
}

export const ApiSlice = createApi({
    reducerPath: 'Api',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({})
})