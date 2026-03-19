
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import knowledgeData from '@/lib/knowledge.json';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: knowledgeData.default_welcome,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }

    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-support-chat', handleOpenEvent);
    return () => window.removeEventListener('open-support-chat', handleOpenEvent);
  }, []);

  // Suggestions Logic
  useEffect(() => {
    const term = inputValue.trim().toLowerCase();
    if (term.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const handler = setTimeout(() => {
      const matches: string[] = [];
      knowledgeData.intents.forEach(intent => {
        intent.suggestions.forEach(s => {
          if (s.toLowerCase().includes(term) || intent.keywords.some(k => term.includes(k))) {
            if (!matches.includes(s)) matches.push(s);
          }
        });
      });
      setSuggestions(matches.slice(0, 4));
      setShowSuggestions(matches.length > 0);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Click Outside logic
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const submitMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = trimmed.toLowerCase();
      let responseText = knowledgeData.fallback;

      for (const intent of knowledgeData.intents) {
        const keywordMatch = intent.keywords.some(k => lowerText.includes(k));
        const suggestionMatch = intent.suggestions.some(s => lowerText === s.toLowerCase());
        
        if (keywordMatch || suggestionMatch) {
          responseText = intent.responses[Math.floor(Math.random() * intent.responses.length)];
          break;
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const highlightMatch = (text: string, match: string) => {
    if (!match) return text;
    const parts = text.split(new RegExp(`(${match})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === match.toLowerCase() 
        ? <span key={i} className="text-primary font-black">{part}</span> 
        : part
    );
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[9999] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_8px_30px_rgba(250,70,22,0.4)] cursor-pointer border-none outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className={cn(
              "fixed z-[9999] flex flex-col overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
              "bottom-20 right-4 w-[340px] max-w-[90%] h-[520px] rounded-[24px]",
              "max-[480px]:w-[calc(100%-24px)] max-[480px]:h-[70vh]"
            )}
          >
            <header className="bg-black p-4 text-white flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles className="w-5 h-5 text-primary fill-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black uppercase tracking-tight leading-none">Smart Assistant</h4>
                <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1">Online Guide</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300", msg.sender === 'user' ? "ml-auto items-end" : "items-start")}>
                  <div className={cn("p-3.5 px-4 rounded-[18px] text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap", msg.sender === 'user' ? "bg-primary text-white font-bold rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none")}>
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[8px] font-bold text-gray-400 uppercase tracking-widest px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 bg-white p-2 px-4 rounded-full border border-gray-100 w-fit">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Smart Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-20 left-4 right-4 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-10"
                >
                  <div className="p-2 space-y-1">
                    <p className="px-3 py-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Suggested</p>
                    {suggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => submitMessage(s)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all text-left group"
                      >
                        <span className="text-[11px] font-bold text-gray-700">{highlightMatch(s, inputValue)}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-primary" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form 
              onSubmit={(e) => { e.preventDefault(); submitMessage(inputValue); }} 
              className="p-4 border-t border-gray-100 bg-white shrink-0 relative"
            >
              <div className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 text-[13px] focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:opacity-50 shrink-0 shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4 fill-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
