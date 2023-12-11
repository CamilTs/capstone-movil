import { createContext, useContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { enviroment } from "../../enviroment";
export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const url = `${enviroment.API_URL}${enviroment.PUERTO_SOCKET}/socket.io/socket.io.js}`;
  const { socket, online } = useSocket(url);

  const value = { socket, online };
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
