import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const QUICK_REPLIES = [
  '👋 Who is Shubh?',
  '🎨 What services do you offer?',
  '🚀 Show me projects',
  '💬 How to contact?',
  '💰 What are your rates?',
];

/* ────────── keyword → response map ────────── */
function getBotResponse(input: string): string {
  const q = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|sup|yo|howdy|greetings)/i.test(q))
    return "Hey there! 👋 I'm Shubh's AI assistant. I can tell you about our AI Automation, Web Design & SEO, Ads campaigns, or how to get in touch. What would you like to know?";

  // Who / About
  if (/who is|about shubh|about shubham|tell me about|about him|about you/i.test(q))
    return "Hi, SHUBHAM is here! For the past year, he has specialized in AI and AI automation. He helps business owners leverage AI to generate more revenue, eliminate wasted costs, rank in the top 3 on Google, and drive high-converting traffic! 🚀";

  // Services
  if (/services|what do you (do|offer)|what can you do|capabilities/i.test(q))
    return "We offer 3 high-impact core services:\n\n🤖 **1. AI Automation** — Make more revenue with AI, eliminate money wastage & save valuable time.\n🌐 **2. Web Designing & SEO** — Build a dominant Google presence & rank in the top 3 for steady traffic.\n📢 **3. High-Converting Ads** — Scroll-stopping, high-ROI ad creatives & campaigns on Meta, Google & TikTok.\n\nWhich service are you interested in?";

  // Projects
  if (/projects|portfolio|work|showcase|show me/i.test(q))
    return "Here are our featured client platforms:\n\n🛍️ **Elysian Fashion Store** — High-end luxury fashion flagship\n🍽️ **Nocturne Bistro** — Michelin-starred dining & reservation platform\n🦷 **Lumora Dental** — AI-powered healthcare & patient growth system\n\nYou can click 'Live Project' on each card to test the live apps!";

  // Pricing / rates
  if (/price|pricing|cost|rate|how much|budget|charge|fee/i.test(q))
    return "Our pricing is tailored to your business needs:\n\n🤖 **AI Automation** — Starting from $999\n🌐 **Web Design & SEO** — Starting from $1,499\n📢 **Ads Campaign & Creatives** — Starting from $799/mo\n\nReach out directly to get a custom roadmap for your business! 📩";

  // Contact
  if (/contact|reach|email|phone|hire|get in touch|connect|whatsapp/i.test(q))
    return "You can reach Shubham directly through:\n\n📧 **Email:** shubhamz9972@gmail.com\n📱 **Phone / WhatsApp:** +91 7889185797\n\nFeel free to message anytime — we respond promptly! ⚡";

  // Experience / skills
  if (/experience|skill|years|expertise|background/i.test(q))
    return "Shubham specializes in:\n\n• AI Workflows & Automation\n• Top-Rank Google SEO & Traffic Growth\n• High-Converting Web Design\n• Performance Ads & Creative Strategy\n• Revenue Optimization\n\nHelping businesses scale with modern AI technology! 💪";

  // Tools / tech
  if (/tool|software|tech|stack|blender|figma|react|ai/i.test(q))
    return "We build with leading AI & Web frameworks:\n\n🤖 **AI:** LLM Integrations, Custom Automations, Make, Zapier\n💻 **Web & SEO:** React, Next.js, Tailwind CSS, Technical SEO\n📢 **Ads:** Meta Ads Manager, Google Ads, TikTok Ads\n🎨 **Design:** Figma, Adobe Suite\n\nAlways delivering top performance! ⚡";

  // Availability
  if (/available|free|open|booking|schedule|timeline/i.test(q))
    return "We are currently accepting new client partnerships! 🎉\n\nContact us directly via email (shubhamz9972@gmail.com) or call/WhatsApp (+91 7889185797) to get started! 📅";

  // Location
  if (/location|where|based|city|remote/i.test(q))
    return "We work with business owners **worldwide** remotely 🌍. Reach out anytime via WhatsApp or Email!";

  // Thanks
  if (/thank|thanks|thx|appreciate/i.test(q))
    return "You're welcome! 😊 Feel free to ask anything else or reach out at shubhamz9972@gmail.com!";

  // Bye
  if (/bye|goodbye|see you|later|cya/i.test(q))
    return "Goodbye! 👋 Thanks for visiting. Feel free to call/WhatsApp +91 7889185797 whenever you're ready to grow your business! ✨";

  // Fallback
  return "Great question! You can reach Shubham directly for tailored assistance:\n\n📧 shubhamz9972@gmail.com\n📱 +91 7889185797\n\nOr ask about our **AI automation**, **SEO & Web Design**, or **Ads** services! 💡";
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! 👋 I'm Shubh's AI assistant. Ask me about his services, projects, pricing, or anything else!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(1);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = (text ?? inputValue).trim();
      if (!messageText) return;

      const userMsg: Message = {
        id: nextIdRef.current++,
        text: messageText,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      // Simulate AI "thinking" delay
      const delay = 600 + Math.random() * 800;
      setTimeout(() => {
        const response = getBotResponse(messageText);
        const botMsg: Message = {
          id: nextIdRef.current++,
          text: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [inputValue],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ─── render helpers ─── */
  const formatText = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>
        {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={j} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          ),
        )}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    ));

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer select-none"
        style={{
          background:
            'linear-gradient(135deg, #18011F 0%, #B600A8 40%, #7621B0 70%, #BE4C00 100%)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.5 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
      </motion.button>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] sm:w-[400px] max-h-[520px] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-white/10"
            style={{
              background: 'rgba(12, 12, 12, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b border-white/10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(24,1,31,0.8) 0%, rgba(182,0,168,0.15) 100%)',
              }}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
                  }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0C0C0C] rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm tracking-wide">
                  Shubh&apos;s AI Assistant
                </h4>
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-medium">
                  Online • Typically replies instantly
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#D7E2EA]/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[240px] max-h-[340px] scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
                      }}
                    >
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'rounded-2xl rounded-br-md text-white'
                        : 'rounded-2xl rounded-bl-md text-[#D7E2EA]/90'
                    }`}
                    style={{
                      background:
                        msg.sender === 'user'
                          ? 'linear-gradient(135deg, #7621B0 0%, #B600A8 100%)'
                          : 'rgba(215, 226, 234, 0.08)',
                    }}
                  >
                    {formatText(msg.text)}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#D7E2EA]/15 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-[#D7E2EA]" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
                    }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5"
                    style={{ background: 'rgba(215, 226, 234, 0.08)' }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-[#B600A8]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-[#B600A8]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-[#B600A8]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-[#B600A8]/40 text-[#D7E2EA]/80 hover:bg-[#B600A8]/15 hover:border-[#B600A8]/70 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="px-4 pb-4 pt-2 border-t border-white/5">
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                style={{ background: 'rgba(215, 226, 234, 0.06)' }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-[13px] text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none font-light"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: inputValue.trim()
                      ? 'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)'
                      : 'rgba(215, 226, 234, 0.1)',
                  }}
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-[9px] text-[#D7E2EA]/25 text-center mt-2 tracking-wide">
                Powered by Shubh&apos;s AI • Portfolio Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
