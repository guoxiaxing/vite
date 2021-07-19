import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  // 默认是 development
  mode: "production",
  plugins: [reactRefresh()]
});
