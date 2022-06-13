import io from "socket.io-client";
import apiUrl from "./api.json";

export let socket = io(
  process.env.NODE_ENV === "development"
    ? apiUrl.SOCKET_DEV_URL
    : apiUrl.SOCKET_BASE_URL,
  {
    transports: ["websocket", "polling"],
    upgrade: true,
    withCredentials: true,
    rememberUpgrade: true,
    reconnection: true,
    reconnectionDelayMax: 2000,
  }
);
