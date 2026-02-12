import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Loader2, Sparkles, Cpu, ArrowUp } from 'lucide-react';

const AthenaChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'Athena Core online. How can I optimize your HPI workflow today?',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessage(input);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[700px] bg-white dark:bg-[#1C1C1E] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.08)] dark:shadow-black/50 border border-slate-100 dark:border-white/5">
      {/* Header */}
      <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Athena</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Strategic Advisor</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold rounded-full">
            ONLINE
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-black/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-5 rounded-2xl shadow-sm leading-relaxed text-[15px] ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-white dark:bg-[#2C2C2E] text-slate-800 dark:text-slate-100 rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl p-4 shadow-sm flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Athena is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-white dark:bg-[#1C1C1E] border-t border-slate-100 dark:border-white/5">
        <div className="flex items-center space-x-3 bg-slate-100 dark:bg-[#2C2C2E] rounded-full px-2 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white px-4 placeholder-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all disabled:opacity-50 disabled:scale-95 shadow-md flex items-center justify-center"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AthenaChat;