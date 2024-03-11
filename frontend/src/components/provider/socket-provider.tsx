
import React, {createContext,useContext, useEffect, useState } from "react";

import {io,Socket} from "socket.io-client"
interface IsocketContext{
    socket:null | Socket,
    isConnected:boolean
}
const SocketContext = createContext<IsocketContext>({
    socket:null,
    isConnected:false

});

export const useSocket = ()=>{
    return useContext(SocketContext)
}

const SocketProvider = ({children}:{children:React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_BACKEND_API_URL!);
        setSocket(socket);
        setIsConnected(true);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;