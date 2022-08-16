import { defineConfig } from "cypress";
import { config } from "dotenv";
config();

export default defineConfig({
  e2e: {
    env: {
      PROD_URL: "https://ttp-back-v1.herokuapp.com/api/",
      DEV_URL: "http://localhost:5000/api/",
      SOCKET_PROD_URL: "https://ttp-back-v1.herokuapp.com",
      SOCKET_DEV_URL: "http://localhost:5000monog",
      OM_USER_EMAIL: "zed.saheer5@gmail.com",
      OM_USER_PASSWORD: "12345678",
    },
  },
});
