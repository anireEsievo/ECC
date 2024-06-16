import { ApiSlice } from "../Api/ApiSlice";

const AuthApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: payload => ({
                url:'/auth/register',
                method: 'POST',
                body: {...payload}
            })
        }),
        login: builder.mutation({
            query: payload => ({
                url: '/auth/login',
                method: 'POST',
                body: {...payload}
            }) 
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            })
        }),
        refresh: builder.mutation({
            query: token => ({
                url: `/auth/refresh/${token}`,
                method: 'GET'
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation
} = AuthApiSlice