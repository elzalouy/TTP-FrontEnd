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
  });
  if (user?.type === "admin") {
    // this for admins role only
    IO.emit("joined admin");
  }
  if (user?.role === "PM") {
    // this for project managers role only
    IO.emit("joined manager");
  }
  // this is for specific user
  IO.emit("joined user", { id: user?._id });
  // on event for lestening if task moved on trello (__webhookUpdate)
  IO.on("connect_failed", function () {
    document.write("Sorry, there seems to be an issue with the connection!");
    setTimeout(() => {
      IO.connect();
    }, 1000);
  });
  IO.on("disconnect", (reason) => {
    if (
      reason === "io server disconnect" ||
      reason === "io client disconnect"
    ) {
      // the disconnection was initiated by the server, you need to reconnect manually
      IO.connect();
    }
    // else the socket will automatically try to reconnect
  });

  return IO;
};
