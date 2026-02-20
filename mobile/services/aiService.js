// services/aiService.js

const BASE_URL = "https://pyscological-deep-learning-based.onrender.com";

export const checkAIHealth = async () => {
  try {
    const response = await fetch(`${BASE_URL}/`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Health check failed");
    }

    return data;
  } catch (error) {
    console.error("Health check error:", error.message);
    throw error;
  }
};

export const makePrediction = async (eegData) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eegData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Backend error response:", data);
      throw new Error(data.detail || JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error("Prediction error:", error.message);
    throw error;
  }
};
