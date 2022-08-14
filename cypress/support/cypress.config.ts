import { defineConfig } from "cypress";
import { config } from "dotenv";
config();

export default defineConfig({
  e2e: {
    env: {
      DEV_URL: "http://localhost:5000/api/",
      SOCKET_DEV_URL: "http://localhost:5000",
      PM_USER_EMAIL: "zed.saheer5@gmail.com",
      PM_USER_PASSWORD: "12345678",
    },
  },
});
