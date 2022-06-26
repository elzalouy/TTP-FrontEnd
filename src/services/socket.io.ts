import io from "socket.io-client";
import { User } from "../redux/Auth";
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
  if (user?.type === "admin") {
    Io.emit("joined-admin");
  }
  if (user?.role === "PM") {
    Io.emit("joined-manager");
  }
  Io.emit("joined-user", { id: user?._id });
  return Io;
};
