
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const explainFormulaWithGemini = async (formula: string): Promise<string> => {
  if (!API_KEY) {
    return "AI features are disabled. Please configure your Gemini API key.";
  }
  
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are an expert Microsoft Excel user. Explain the following Excel formula in a clear, concise, and easy-to-understand way for a user who might be a beginner.

    Formula: ${formula}

    Your explanation should include:
    1.  **Purpose**: A one-sentence summary of what the formula does.
    2.  **Breakdown**: Explain each function and argument step-by-step.
    3.  **Example**: Briefly describe how it works with sample data.

    Keep the tone friendly and encouraging. Do not use markdown formatting.
    `;
    
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 1,
        topK: 32,
        maxOutputTokens: 256,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get explanation from Gemini API.");
  }
};
