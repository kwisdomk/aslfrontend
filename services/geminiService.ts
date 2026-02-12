import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please create a .env.local file with VITE_API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<Chat> => {
  if (chatSession) return chatSession;

  const ai = getClient();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview', // Fast model for responsive UI
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const chat = await initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Athena system offline. No response received.";
  } catch (error: any) {
    console.error("Athena Communication Error:", error);
    if (error.message && error.message.includes("API Key")) {
        return "CRITICAL ERROR: API Key missing. Please configure VITE_API_KEY in your .env.local file to activate Athena.";
    }
    return "Error: Secure connection to Athena Mainframe failed.";
  }
};