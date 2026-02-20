# AI Integration Guide

This guide explains how to connect the MindHaven mobile app to your deployed Flask AI API.

## Setup Instructions

### 1. Deploy Your Flask API

Follow the deployment guide in `Final-Year-project/DEPLOYMENT.md` to deploy your Flask API to Render, Railway, or another hosting platform.

### 2. Update API URL

Once your API is deployed, update the API URL in `constants/api.js`:

```javascript
export const AI_API_URL = "https://your-deployed-url.onrender.com/api"
```

Replace `your-deployed-url.onrender.com` with your actual deployed URL.

### 3. Test the Connection

1. Start your mobile app: `npm start` or `expo start`
2. Navigate to the "AI Simulation" tab
3. Check if the API status shows "API Connected"
4. Try running a simulation

## Features

### AI Simulation Screen

The simulation screen (`app/(tabs)/simulation.jsx`) provides:

- **Cognitive State Simulation**: Simulate three cognitive states:
  - Drowsy / Low Engagement
  - Relaxed / Neutral
  - Focused / High Engagement

- **Quick Prediction**: Generate a synthetic prediction without specifying a state

- **Mental Health Analysis**: View detailed metrics for:
  - Stress
  - Anxiety
  - Depression
  - ADHD
  - Fatigue

- **Recommendations**: Get personalized recommendations based on the analysis

- **Visual Indicators**: 
  - Progress bars for probabilities
  - Color-coded mental health metrics
  - Status indicators

## API Service

The `services/aiService.js` file provides functions to interact with the Flask API:

- `checkAIHealth()` - Check API health and model status
- `getAIInfo()` - Get API information
- `makePrediction({ mode, data })` - Make a prediction
- `simulateState(state)` - Simulate a specific cognitive state

## API Endpoints Used

- `GET /api/health` - Health check
- `GET /api/info` - API information
- `POST /api/predict` - Make predictions
- `POST /api/simulate` - Simulate states

## Troubleshooting

### API Not Connecting

1. **Check API URL**: Ensure `AI_API_URL` in `constants/api.js` is correct
2. **Check API Status**: Visit `https://your-api-url/api/health` in a browser
3. **Check CORS**: Ensure CORS is enabled in your Flask API (already configured)
4. **Check Network**: Ensure your device/emulator has internet access

### Models Not Loading

If the API health check shows models are not loaded:
1. Check that all model files are in `results/model/` directory
2. Verify model files are committed to git (if using git deployment)
3. Check server logs for loading errors

### Timeout Errors

If requests timeout:
1. Check your hosting platform's timeout limits
2. Consider upgrading your hosting plan
3. Check server logs for performance issues

## Example Usage

```javascript
import { makePrediction, simulateState } from '../services/aiService';

// Make a synthetic prediction
const result = await makePrediction({ mode: 'synthetic' });
console.log(result.cognitive_state.name);
console.log(result.mental_health.interpretation);

// Simulate a focused state
const simulation = await simulateState(2);
console.log(simulation.cognitive_state.name);
console.log(simulation.recommendations);
```

## Response Format

### Prediction Response

```json
{
  "success": true,
  "cognitive_state": {
    "label": 2,
    "name": "Focused / High Engagement",
    "probabilities": {
      "drowsy": 5.2,
      "relaxed": 12.8,
      "focused": 82.0
    }
  },
  "mental_health": {
    "raw_scores": {
      "stress": 0.65,
      "anxiety": 0.48,
      "depression": 0.32,
      "adhd": 0.25,
      "fatigue": 0.18
    },
    "interpretation": {
      "stress": "High",
      "anxiety": "Moderate",
      "depression": "Low",
      "adhd": "Low",
      "fatigue": "Low"
    }
  },
  "recommendations": [
    "Try short relaxation or breathing exercises.",
    "Take a quick hydration or stretch break."
  ],
  "mode": "synthetic",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Next Steps

1. Deploy your Flask API
2. Update the API URL in the mobile app
3. Test the integration
4. Customize the UI as needed
5. Add real EEG data input if you have hardware
