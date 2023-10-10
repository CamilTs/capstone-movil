import { useState, useEffect, useMemo } from "react";
import { io, Manager } from "socket.io-client";

export const useSocket = (serverPath) => {
  const manager = useMemo(
    () =>
      new Manager(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  const socket = manager.socket("/");
  const [online, setOnline] = useState(false);

  return { socket, online };
};
