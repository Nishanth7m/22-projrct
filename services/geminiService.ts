import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { OPSFLOW_SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

// Use a model that balances speed and intelligence for interactive dashboards
// Using gemini-2.5-flash-latest as requested for efficiency
const MODEL_NAME = 'gemini-2.5-flash-latest'; 

export const generateOpsResponse = async (
  prompt: string, 
  context?: string
): Promise<string> => {
  try {
    const client = getClient();
    
    // Construct a rich prompt
    const fullPrompt = `
      Context: ${context || 'General Social Media App Project'}
      User Query: ${prompt}
    `;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: OPSFLOW_SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance creativity with structure
      },
    });

    return response.text || "OpsFlow Intelligence unavailable. Please check connection.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to OpsFlow Core. Please verify API configuration.";
  }
};

export const parseJsonFromResponse = (text: string): any | null => {
  try {
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    // Attempt to parse raw text if it looks like JSON
    if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
      return JSON.parse(text);
    }
    return null;
  } catch (e) {
    console.error("Failed to parse JSON from OpsFlow response", e);
    return null;
  }
};
