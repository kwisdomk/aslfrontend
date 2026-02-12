
import { GoogleGenerativeAI, ChatSession, GenerateContentResult } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { logDevEvent } from "./devLogger";

let chatSession: ChatSession | null = null;

const getClient = () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
        throw new Error("VITE_API_KEY is not defined in .env.local");
    }
    return new GoogleGenerativeAI(apiKey);
};

const initializeChat = async (): Promise<ChatSession> => {
    if (chatSession) {
        return chatSession;
    }
    const genAI = getClient();
    chatSession = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
        .startChat({
            systemInstruction: {
                role: "system",
                parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            history: [],
        });
    return chatSession;
};

export const sendMessageToAthena = async (message: string): Promise<string> => {
    const startTime = performance.now();

    try {
        const chat = await initializeChat();
        const result: GenerateContentResult = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        const executionTime = performance.now() - startTime;

        // Non-blocking call to the dev logger
        logDevEvent({
            event_type: "API_CALL_GEMINI_SUCCESS",
            metadata: { request: message, response: text },
            execution_time: executionTime,
        });

        return text || "Athena system offline. No response received.";
    } catch (error: any) {
        const executionTime = performance.now() - startTime;
        console.error("Athena Communication Error:", error);

        // Log the failure event
        logDevEvent({
            event_type: "API_CALL_GEMINI_FAILURE",
            metadata: { request: message, error: error.message },
            execution_time: executionTime,
        });

        if (error.message && error.message.includes("API Key")) {
            return "CRITICAL ERROR: API Key missing. Please configure VITE_API_KEY in your .env.local file to activate Athena.";
        }
        return "Error: Secure connection to Athena Mainframe failed.";
    }
};
