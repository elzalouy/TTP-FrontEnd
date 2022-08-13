import { defineConfig } from "cypress";
import { config } from "dotenv";
config();

export default defineConfig({
  env: {
    DEV_URL: "https://localhost:5000/api/",
    SOCKET_DEV_URL: "http://localhost:5000",
    BASE_URL: "https://ttp-back-v1.herokuapp.com/api/",
    SOCEKT_BASE_URL: "https://ttp-back-v1.herokuapp.com",
    PM_USER_EMAIL: "zed.saheer5@gmail.com",
    PM_USER_PASSWORD: "12345678",
  },
});
