// For Android Emulator: use 10.0.2.2 (special alias to host machine)
// For iOS Simulator: use localhost or 127.0.0.1
// For Physical Device: use your computer's IP address (e.g., 192.168.x.x)
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:3000/api"
// export const API_URL="https://mindhaven-kvko.onrender.com/api" // Production

// AI API URL - Update this with your deployed Flask AI API URL
// Example: "https://your-ai-service.onrender.com" or "http://localhost:5000"

export const AI_API_URL = "https://pyscological-deep-learning-based.onrender.com";
