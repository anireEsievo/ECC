import { createContext, useState, useCallback } from "react";

export const Context = createContext({
    users: null,
    setUsers: () => {},
    receiver: null,
    setReceiver: () => {},
    useCase: '',
    setUseCase: () =>{},
    response: {
        type: '',
        message: '',
        valid: false,
        timeout: 2500
    },
    resetResponse: () => {},
    handleResponse: (response) => {}
})

export const ContextProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState(null)
    const [useCase, setUseCase] = useState("")
    const [response, setResponse] = useState({
        type: '',
        message: '',
        valid: false,
        timeout: 0
    })

    const resetResponse = useCallback(() => {
        setResponse({
            type: '',
            message: '',
            valid: false,
            timeout: 0
        })
    },[setResponse])

    const handleResponse = (response) => {
        resetResponse()
        setTimeout(()=>{
            setResponse(response)
        },500)
    }
    
    const value = {
        users,
        receiver,
        useCase,
        response,
        resetResponse,
        handleResponse,
        setUseCase,
        setUsers,
        setReceiver
    }
    
    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}