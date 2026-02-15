const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Mock responses for demo mode
const getMockResponse = (message: string, context?: string): string => {
  const responses = [
    `Based on your current progress (${context}), I recommend focusing on your academic tasks to balance your growth.`,
    `Great question! Here's my analysis: ${message.slice(0, 50)}... Let me help you strategize your next steps.`,
    `I see you're working on balancing professional and academic goals. Consider prioritizing Critical tasks first.`,
    `Your progress shows dedication! To maintain balance, ensure both arms advance at similar rates.`,
    `That's an interesting point about "${message.slice(0, 30)}...". Let's break down the best approach for you.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const sendMessage = async (message: string, context?: string): Promise<string> => {
  // Return mock response for now
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  return getMockResponse(message, context);
};
