import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  ArrowRight,
  Cpu,
  Droplets,
  Zap,
  TrendingUp,
  User,
  ShieldCheck
} from 'lucide-react';
import { ChatMessage, ChatAction } from '../types/chat';
import { QUICK_PROMPTS } from '../data/chatbotKnowledge';
import { sendChatMessage } from '../services/aiChatService';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Tech': return <Cpu className="w-3.5 h-3.5 text-sky-500" />;
    case 'Chemistry': return <Droplets className="w-3.5 h-3.5 text-cyan-500" />;
    case 'Business': return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
    case 'Safety': return <Zap className="w-3.5 h-3.5 text-amber-500" />;
    case 'Author': return <User className="w-3.5 h-3.5 text-indigo-500" />;
    default: return <Sparkles className="w-3.5 h-3.5 text-sky-500" />;
  }
};

// Formats basic markdown into formatted JSX
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header ###
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-slate-900 text-sm mt-3 mb-1 flex items-center gap-1.5">
              {trimmed.replace('### ', '')}
            </h4>
          );
        }

        // Header ##
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-extrabold text-slate-900 text-base mt-3 mb-1">
              {trimmed.replace('## ', '')}
            </h3>
          );
        }

        // Bullet point - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 ml-1 text-slate-700">
              <span className="text-sky-500 font-bold mt-1 text-xs">•</span>
              <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(bulletContent) }} />
            </div>
          );
        }

        // Numbered list 1.
        if (/^\d+\.\s/.test(trimmed)) {
          const num = trimmed.match(/^(\d+)\.\s/)?.[1] || '•';
          const listContent = trimmed.replace(/^\d+\.\s/, '');
          return (
            <div key={idx} className="flex items-start gap-2 ml-1 text-slate-700">
              <span className="text-sky-600 font-bold text-xs mt-0.5">{num}.</span>
              <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(listContent) }} />
            </div>
          );
        }

        // Table rows handling basic markdown table
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          if (trimmed.includes('---')) return null;
          const cells = trimmed.split('|').filter(c => c.trim().length > 0);
          return (
            <div key={idx} className="grid grid-cols-2 gap-2 p-1.5 rounded-lg bg-slate-100/80 text-xs my-1">
              {cells.map((cell, cIdx) => (
                <div 
                  key={cIdx} 
                  className={cIdx === 0 ? "font-bold text-slate-900" : "text-slate-600"}
                  dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(cell.trim()) }} 
                />
              ))}
            </div>
          );
        }

        // Regular paragraph
        return (
          <p 
            key={idx} 
            className="text-slate-700" 
            dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmed) }} 
          />
        );
      })}
    </div>
  );
};

// Helper for inline markdown like **bold**, *italic*, and [links](url)
const parseInlineMarkdown = (content: string): string => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 font-semibold hover:underline">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-sky-700 text-xs font-mono">$1</code>');
};

interface AIChatBotProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ 
  isOpenExternal, 
  onCloseExternal 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down' | undefined>>({});
  const [activeEngine, setActiveEngine] = useState<'native' | 'gemini'>('native');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external open triggers (e.g. clicking "Ask AI" in Header)
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  // Initial welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'assistant',
          content: `Hi there! 👋 I am **AeroBot**, your technical AI assistant for **DroneCleaning.Tech**.

I can answer any questions about our tethered facade drones, 77GHz radar sensors, 0 PPM deionized water chemistry, aerodynamics, ROI economics, and project creator **Yash Mukade**.

Choose a prompt below or type any question!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: [
            'How does radar detect glass when lasers fail?',
            'Why use deionized water instead of soap?',
            'How does the composite tether work?',
            'What are the ROI savings over scaffolding?'
          ],
          actions: [
            { label: 'Explore Concept Papers', type: 'scroll', target: 'articles' }
          ]
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState && onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.type === 'scroll') {
      const elem = document.getElementById(action.target);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'link') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'prompt') {
      handleSendMessage(action.target);
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(textToSend, messages);
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        suggestedQuestions: response.suggestedQuestions
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setActiveEngine(response.usedEngine);
    } catch {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I'm sorry, I encountered an issue processing that query. Please try asking again or select one of the suggested topics.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: 'up' | 'down') => {
    setFeedback((prev) => ({
      ...prev,
      [id]: prev[id] === type ? undefined : type
    }));
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset! How can I help you explore **DroneCleaning.Tech**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'How does radar detect glass when lasers fail?',
          'Why use deionized water instead of soap?',
          'What are the ROI savings over scaffolding?'
        ]
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white shadow-xl shadow-sky-600/30 hover:shadow-sky-600/50 hover:scale-105 transition-all duration-300 active:scale-95"
          aria-label="Open AI Assistant"
        >
          {/* Animated Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />
          
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
            <Bot className="w-5 h-5 text-white animate-bounce" style={{ animationDuration: '2s' }} />
          </div>

          <div className="relative flex flex-col text-left">
            <span className="text-xs font-extrabold tracking-wide uppercase flex items-center gap-1">
              Ask Drone AI
              <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
            <span className="text-[10px] text-sky-100 font-medium">Instant Technical Answers</span>
          </div>

          {/* Unread Ping Badge */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
        </button>
      )}

      {/* Main Glassmorphic Chat Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[620px] max-h-[85vh] bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Chat Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">AeroBot AI</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                    {activeEngine === 'gemini' ? 'Gemini AI' : 'Project Knowledge'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">DroneCleaning.Tech Specialist</p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
              Explore:
            </span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handleSendMessage(prompt.query)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-[11px] font-semibold text-slate-700 hover:text-sky-700 whitespace-nowrap shadow-xs transition-all hover:scale-[1.02]"
              >
                {getCategoryIcon(prompt.category)}
                <span>{prompt.label}</span>
              </button>
            ))}
          </div>

          {/* Message Thread List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mb-1 text-xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl shadow-xs ${
                      msg.role === 'user'
                        ? 'bg-sky-600 text-white rounded-br-xs'
                        : msg.isError
                        ? 'bg-red-50 border border-red-200 text-red-900 rounded-bl-xs'
                        : 'bg-white border border-slate-200/90 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm font-medium whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <FormattedMessage text={msg.content} />
                    )}

                    {/* Contextual Action Buttons */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold text-xs transition-all hover:scale-[1.02]"
                          >
                            <span>{act.label}</span>
                            {act.type === 'link' ? (
                              <ExternalLink className="w-3 h-3 text-sky-600" />
                            ) : (
                              <ArrowRight className="w-3 h-3 text-sky-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Meta & Feedback Toolbar */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 ml-2">
                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-600 p-0.5"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Thumbs Up */}
                      <button
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className={`p-0.5 hover:text-emerald-600 ${
                          feedback[msg.id] === 'up' ? 'text-emerald-600 font-bold' : ''
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>

                      {/* Thumbs Down */}
                      <button
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className={`p-0.5 hover:text-red-600 ${
                          feedback[msg.id] === 'down' ? 'text-red-600 font-bold' : ''
                        }`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Follow-up Questions Pills */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-2.5 ml-8 flex flex-col gap-1 w-full max-w-[85%]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Suggested follow-ups:
                    </span>
                    {msg.suggestedQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-xs bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 text-slate-700 hover:text-sky-700 px-3 py-1.5 rounded-xl transition-all font-medium flex items-center justify-between group"
                      >
                        <span>{q}</span>
                        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-sky-600 -rotate-90" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-1">
                <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-2 rounded-2xl shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about radar, pure water, tether, ROI, Yash..."
                disabled={isTyping}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputQuery.trim() || isTyping}
                className="absolute right-1.5 p-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white transition-all shadow-sm"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-1.5 px-1 text-[10px] text-slate-400 font-medium">
              <span>Secure DroneCleaning AI</span>
              <span>Press <strong>Enter ↵</strong> to send</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
