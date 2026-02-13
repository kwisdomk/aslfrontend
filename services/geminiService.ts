import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { logDevEvent } from "./devLogger";

const apiKey = import.meta.env.VITE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAthenaResponse = async (userPrompt: string) => {
  if (!ai) throw new Error("Aelpher Error: API Key missing.");

  try {
    // FIX: Call ai.models.generateContent directly.
    // In v2 SDK, this is stateless and returns the response directly.
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: userPrompt }] }]
    });

    // FIX: In the new SDK, .text is a property, not a function.
    const athenaText = response.text;

    await logDevEvent('ATHENA_CHAT_SUCCESS', { prompt: userPrompt });

    return athenaText;
  } catch (err: any) {
    await logDevEvent('ATHENA_CHAT_ERROR', { error: err.message });
    throw err;
  }
};

export const sendMessageToAthena = async (message: string): Promise<string> => {
  try {
    const result = await getAthenaResponse(message);
    return result || "Athena system offline. No response received.";
  } catch (error: any) {
    console.error("Athena Communication Error:", error);
    return "Error: Secure connection to Athena Mainframe failed.";
  }
};
