import io from "socket.io-client";
import { User } from "../types/models/user";
import apiUrl from "./api.json";

export const openConnection = (user: User | null) => {
  let url =
    process.env.NODE_ENV === "development"
      ? apiUrl.SOCKET_DEV_URL
      : apiUrl.SOCKET_BASE_URL;

  let socket = io(url, {
    path: "/socket.io",
    reconnection: true,
    withCredentials: true,
  });
  let Io = socket.on("connect", () => {
    console.log("client is connected");
  });
  if (user?.role === "OM") {
    Io.emit("joined-OM", user);
  } else if (user?.role === "PM") {
    Io.emit("joined-PM", user);
  }
  return Io;
};
