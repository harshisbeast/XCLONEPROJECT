import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000, // Frontend development server will run on this port
		proxy: {
			"/api": {
				target: "http://localhost:8080", // Update backend port here
				changeOrigin: true,
			},
		},
	},
});
