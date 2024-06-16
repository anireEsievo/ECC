import { ApiSlice } from "../Api/ApiSlice";

const ChatApiSlice = ApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        retrieveReceiver: builder.mutation({
            query: (id) => ({
                url: `auth/users/${id}`,
                method: 'GET'
            })
        }),
        retrieveAllUsers: builder.mutation({
            query: () => ({
                url: '/auth/users',
                method: 'GET'
            })
        })
    })
})

export const {
    useRetrieveReceiverMutation,
    useRetrieveAllUsersMutation
} = ChatApiSlice