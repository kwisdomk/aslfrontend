import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Loader2, Cpu } from 'lucide-react';
import { Message } from '../types';
import { sendMessage } from '../services/geminiService';

interface AthenaChatProps {
  context?: string;
}

export function AthenaChat({ context }: AthenaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm Athena, your strategic planning assistant. How can I help optimize your goals today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input, context);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-280px)] bg-white rounded-[32px] shadow-[0_20px_50px_rgb(0,0,0,0.08)] overflow-hidden">
      {/* Floating Glass Header (Status Bar) */}
      <div className="sticky top-0 z-10 p-6 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-sm">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Athena AI</h3>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                Strategic Intelligence
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              ONLINE
            </span>
          </div>
        </div>
      </div>

      {/* Conversation Stream (The Feed) */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-5 py-4 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                  : 'bg-white text-slate-900 rounded-2xl rounded-tl-sm shadow-sm'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <span
                className={`text-xs mt-2 block font-mono ${
                  message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm px-5 py-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-slate-600 animate-spin" />
              <span className="text-sm text-slate-600">Athena is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Command Input (The Console) */}
      <div className="p-6 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-3 bg-slate-100 rounded-full px-2 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Athena anything..."
            className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
