import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ChatReducer from "./Chat/ChatSlice";
import { ApiSlice } from "./Api/ApiSlice";

const Store = configureStore({
    reducer:{
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        auth: AuthReducer,
        chat: ChatReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
})

export default Store;