import io from "socket.io-client";
import apiUrl from "./api.json";

export let socket = io(
  process.env.NODE_ENV === "development"
    ? apiUrl.SOCKET_DEV_URL
    : apiUrl.SOCKET_BASE_URL,
  {
    transports: ["polling", "websocket"],
    upgrade: true,
    withCredentials: true,
    rememberUpgrade: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 2000,
  }
);
