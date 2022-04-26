import io from "socket.io-client";
import apiUrl from "../../services/api.json";
export let socket = io(apiUrl.API_DEV_URL);

