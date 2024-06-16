import io from 'socket.io-client';

let socket;

export const connectSocket = (namespace, id, token) => {
    const url = `${process.env.REACT_APP_LOCAL_URL}${namespace}`;

    // ESTABLISHING CONNECTION
    socket = io(url, {
        auth: {
            id,
            token
        },
        transports: ['websocket', 'polling']
    });


    // --> ** LISTENERS ** <--
    
    // SUCCESS LISTENER
    socket.on('connect', () => {})


    // ERROR LISTENERS
    socket.on('connect_error', (error) => {});

    socket.on('connect_timeout', () => {});

    socket.on('error', (error) => {});

    socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect' || reason === 'ping timeout') {
            socket.connect();
        }
    });

    socket.on('reconnect_attempt', (attemptNumber) => {});

    socket.on('reconnect_failed', () => {});

    socket.on('reconnect_error', (error) => {});
};

// DISCONNECTS SOCKET
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};


// GET SOCKET
export const getSocket = () => socket;
