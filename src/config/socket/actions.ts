import io from "socket.io-client";
import apiUrl from "../../services/api.json";
export let socket = io(apiUrl.SOCKET_BASE_URL);

