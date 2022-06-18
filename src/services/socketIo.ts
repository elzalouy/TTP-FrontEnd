import io from "socket.io-client";
import { User } from "../redux/Auth";
import apiUrl from "./api.json";

export const openConnection = (user: User | null) => {
  let socket = io(
    process.env.NODE_ENV === "development"
      ? apiUrl.SOCKET_DEV_URL
      : apiUrl.SOCKET_BASE_URL,
    {
      transports: ["websocket"],
    }
  );
  let IO = socket.on("connect", () => {
    console.log("client is connected");
    //todo check user auth
    if (user?.type === "admin") {
      // this for admins role only
      socket.emit("joined admin");
    }
    if (user?.role === "PM") {
      // this for project managers role only
      socket.emit("joined manager");
    }
    // this is for specific user
    socket.emit("joined user", { id: user?._id });
    // on event for lestening if task moved on trello (__webhookUpdate)
  });
  return IO;
};
