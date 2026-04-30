import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { 
  X, 
  Cpu, 
  Bot, 
  User as UserIcon, 
  MessageSquare, 
  History, 
  Plus, 
  LogOut, 
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { PromptInputBox } from './ui/ai-prompt-box';
import { WordmarkIcon } from './ui/header-1';

interface NexusAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `You are ExpoGL AI — a helpful assistant for InnoExpoGL.
Your goal is to help visitors understand our research, navigate our projects, and answer questions about the community.
Keep your tone friendly, professional, and clear. Avoid robotic or sci-fi jargon.`;

export default function NexusAI({ isOpen, onClose }: NexusAIProps) {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('expogl_sessions') : null;
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  useEffect(() => {
    localStorage.setItem('expogl_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (isOpen && sessions.length === 0) {
      createNewSession();
    } else if (isOpen && !currentSessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const createNewSession = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newSession: ChatSession = {
      id: newId,
      title: "New Chat",
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm **ExpoGL AI**. I'm here to help you explore our projects and research. What can I help you with today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ],
      timestamp: new Date().toISOString()
    };
    setSessions([newSession, ...sessions]);
    setCurrentSessionId(newId);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    if (currentSessionId === id) {
      setCurrentSessionId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleSend = async (input: string) => {
    if (!input.trim() || isThinking || !currentSessionId) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedSessions = sessions.map(s => {
      if (s.id === currentSessionId) {
        const title = s.messages.length <= 1 ? (input.slice(0, 40) + (input.length > 40 ? "..." : "")) : s.title;
        return { ...s, title, messages: [...s.messages, userMsg] };
      }
      return s;
    });
    setSessions(updatedSessions);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const currentMessages = updatedSessions.find(s => s.id === currentSessionId)?.messages || [];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: currentMessages.map(m => ({ 
          role: m.role === 'user' ? 'user' : 'model', 
          parts: [{ text: m.content }] 
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't process that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => 
        s.id === currentSessionId ? { ...s, messages: [...s.messages, assistantMsg] } : s
      ));
    } catch (error) {
      console.error("Gemini Error:", error);
      setSessions(prev => prev.map(s => 
        s.id === currentSessionId ? { ...s, messages: [...s.messages, {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }] } : s
      ));
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-zinc-950 flex overflow-hidden font-body"
        >
          {/* Sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: isSidebarOpen ? 260 : 0, opacity: isSidebarOpen ? 1 : 0 }}
            className="h-full bg-zinc-900 flex flex-col relative"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <button 
                onClick={createNewSession}
                className="flex-1 flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-3 py-4">
                Chat History
              </div>
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => setCurrentSessionId(session.id)}
                  className={cn(
                    "w-full group text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 relative overflow-hidden text-sm",
                    currentSessionId === session.id 
                      ? "bg-zinc-800 text-white" 
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                  )}
                >
                  <MessageSquare className="w-4 h-4 shrink-0 opacity-60" />
                  <span className="truncate flex-1">{session.title}</span>
                  <Trash2 
                    className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 hover:text-zinc-400 transition-all ml-auto" 
                    onClick={(e) => deleteSession(session.id, e)}
                  />
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-white/5 space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button 
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Close Chat
              </button>
            </div>
          </motion.aside>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col relative bg-zinc-950">
            {/* Header */}
            <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                  {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                </button>
                <div className="flex items-center gap-2 ml-2">
                  <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center p-1.5">
                    <WordmarkIcon className="w-full h-full text-white" />
                  </div>
                  <h2 className="text-sm font-semibold text-white tracking-tight">ExpoGL AI</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-none">
              <div className="max-w-3xl mx-auto space-y-10">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-3xl mb-6">
                      👋
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Welcome to InnoExpoGL</h1>
                    <p className="text-zinc-400 max-w-sm text-base">Ask me about our projects, research focus, or how to get involved.</p>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-5"
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                      msg.role === 'assistant' 
                        ? "bg-zinc-100 text-zinc-950 shadow-sm p-1.5" 
                        : "bg-zinc-800 text-zinc-400"
                    )}>
                      {msg.role === 'assistant' ? <WordmarkIcon className="w-full h-full" /> : <UserIcon className="w-4 h-4 text-zinc-400" />}
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-200">
                          {msg.role === 'assistant' ? 'AI' : 'You'}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-medium">{msg.timestamp}</span>
                      </div>
                      <div className={cn(
                        "text-[15px] leading-relaxed text-zinc-300",
                        msg.role === 'assistant' ? "prose prose-invert prose-zinc max-w-none" : ""
                      )}>
                        {msg.role === 'assistant' ? (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isThinking && (
                  <div className="flex gap-5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
                    </div>
                    <div className="pt-2">
                      <div className="h-4 bg-zinc-900 rounded-full w-24 animate-pulse" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input Overlay */}
            <div className="w-full max-w-3xl mx-auto px-4 pb-8 pt-2">
              <PromptInputBox 
                onSend={handleSend}
                isLoading={isThinking}
                placeholder="Message AI..."
                className="rounded-xl border-zinc-800 bg-zinc-900/50 shadow-lg"
              />
              <p className="mt-3 text-center text-[10px] text-zinc-600">
                ExpoGL AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
