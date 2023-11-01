import { createContext, useContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const url = "http://192.168.2.104:81/socket.io/socket.io.js";
  const { socket, online } = useSocket(url);

  const value = { socket, online };
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
