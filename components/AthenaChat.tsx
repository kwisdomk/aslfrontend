
import React, { useState, useEffect, useRef } from 'react';
import { CornerDownLeft, Loader2, User, BrainCircuit } from 'lucide-react';
import { sendMessageToAthena } from '../services/geminiService';

type Message = {
  sender: 'user' | 'athena';
  text: string;
};

const AthenaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const athenaResponse = await sendMessageToAthena(input);
      const aiMessage: Message = { sender: 'athena', text: athenaResponse };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get response from Athena:", error);
      const errorMessage: Message = {
        sender: 'athena',
        text: "SYSTEM ALERT: Connection to Intelligence Core failed. Please check console.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-white/5'>
      <div ref={chatContainerRef} className='h-[500px] p-8 overflow-y-auto'>
        <div className="space-y-8">
          {/* Initial Message from Athena */}
          {messages.length === 0 && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6" />
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 text-slate-700 dark:text-slate-300 w-full md:w-4/5">
                    <p className="font-semibold mb-2">Athena Online</p>
                    <p>I am the system controller for your HPI roadmap. How can I assist you in optimizing your schedule or clearing bottlenecks?</p>
                </div>
              </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'athena' && (
                <div className="flex-shrink-0 w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6" />
                </div>
              )}

              <div className={`rounded-2xl p-5 w-full md:w-4/5 ${msg.sender === 'user'
                  ? 'bg-blue-500 text-white order-last'
                  : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}>
                <p>{msg.text}</p>
              </div>

              {msg.sender === 'user' && (
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-white/10 text-slate-500 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
               <div className="flex-shrink-0 w-12 h-12 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6" />
                </div>
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 flex items-center gap-3 w-4/5">
                <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                <span className="text-slate-500 dark:text-slate-400 italic">Athena is processing...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-white/5">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Athena for strategic advice... (e.g., 'What is my primary focus?')"
            className="w-full bg-slate-50 dark:bg-white/5 h-14 rounded-full pl-6 pr-20 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 disabled:bg-slate-300 dark:disabled:bg-slate-600 transition-all disabled:cursor-not-allowed"
          >
            <CornerDownLeft className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AthenaChat;
