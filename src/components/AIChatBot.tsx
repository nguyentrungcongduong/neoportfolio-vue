import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Loader2, RotateCcw, Eye, EyeOff, ShieldCheck, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";

// ─── System Prompt: Tell Gemini about Công Dưỡng ───────────────────────────
const SYSTEM_PROMPT = `You are the AI Assistant on Nguyen Trung Cong Duong's portfolio — a talented Full Stack Developer.
Always respond in a friendly, concise, and professional tone in English.

Information about Cong Duong:
- Name: Nguyen Trung Cong Duong
- Roles: Full Stack Developer, Backend Developer, Frontend Developer, Mobile Developer
- Experience: 2+ years of real-world experience, 5+ years of self-study and personal projects
- Frontend: React, TypeScript, Vue.js, Next.js, Tailwind CSS, Framer Motion
- Backend: Java/Spring Boot, PHP/Laravel, Golang/Gin, Node.js
- Mobile: React Native, Kotlin, Android
- Database: MySQL, PostgreSQL, MongoDB, Redis
- DevOps: Docker, AWS, Git
- Projects: 10+ personal and real-world projects
- Blog topics: React performance, TypeScript, CSS, Framer Motion, Docker, GraphQL, Testing
- Personality: Tech enthusiast, loves coffee ☕, always learning something new
- GitHub: https://github.com/nguyentrungcongduong
- Facebook: https://www.facebook.com/congduong.nguyentrung.3
- Email: congduongnguyentrung@gmail.com
- Open to: Full-time roles and freelance opportunities

If someone asks something outside this scope, politely let them know you can only assist with information about Cong Duong and his portfolio.
Do not fabricate any information not provided above.`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What are your strongest skills? 🔥",
  "How can I contact you? 📞",
  "What kind of projects can you build? 💼",
  "What's your main tech stack? 🛠️",
];

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(messages: Message[], apiKey: string): Promise<string> {
  // Build conversation history for Gemini
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  };

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || "API Error");
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response received.";
}

// ─── Component ──────────────────────────────────────────────────────────────
const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(
    () =>
      localStorage.getItem("cong_duong_gemini_key") ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      ""
  );
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && apiKey) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, apiKey]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    if (!apiKey) {
      setShowApiInput(true);
      return;
    }

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(newMessages, apiKey);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `❌ Error: ${errMsg}\n\nPlease check your API key and try again.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = () => {
    const trimmed = tempApiKey.trim();
    if (!trimmed) return;

    localStorage.setItem("cong_duong_gemini_key", trimmed);
    setApiKey(trimmed);
    setShowApiInput(false);
    setTempApiKey("");
    setShowKey(false);

    toast.success("API key saved successfully! 🎉", {
      description: "Your key is stored only in your browser's localStorage — never sent to any server other than Gemini API.",
      duration: 5000,
      icon: <ShieldCheck className="text-green-500" size={18} />,
    });
  };

  const handleDeleteKey = () => {
    localStorage.removeItem("cong_duong_gemini_key");
    setApiKey("");
    setTempApiKey("");
    setMessages([]);
    toast.info("API key removed from your browser.", { duration: 3000 });
  };

  const resetChat = () => setMessages([]);

  return (
    <>
      {/* ── Floating Button + Tooltip ───────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group/chatbtn">
        {/* Tooltip — shows on hover when chat is closed */}
        {!isOpen && (
          <motion.div
            className="hidden group-hover/chatbtn:flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background text-xs font-black border-[2px] border-foreground whitespace-nowrap"
            style={{ boxShadow: "3px 3px 0px 0px #888" }}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <Bot size={12} />
            Chat with me! 💬
            {/* Arrow pointing down to button */}
            <span className="absolute -bottom-2 right-4 border-4 border-transparent border-t-foreground" />
          </motion.div>
        )}

        <motion.button
          className="w-14 h-14 bg-primary border-[3px] border-foreground flex items-center justify-center"
          style={{ boxShadow: "4px 4px 0px 0px #000" }}
          whileHover={{ scale: 1.1, boxShadow: "6px 6px 0px 0px #000", y: -3 }}
          whileTap={{ scale: 0.9, boxShadow: "1px 1px 0px 0px #000" }}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Open AI Chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Bot size={22} strokeWidth={2.5} />
                {/* Pulse dot */}
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent border border-foreground rounded-full animate-pulsate" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── Chat Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col"
            style={{
              height: "520px",
              background: "hsl(60 100% 97%)",
              border: "3px solid #000",
              boxShadow: "6px 6px 0px 0px #000",
            }}
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-foreground text-background border-b-[3px] border-foreground shrink-0">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles size={18} />
                </motion.div>
                <span className="font-black text-sm uppercase tracking-wider">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={resetChat}
                    className="p-1 hover:bg-white/20 transition-colors"
                    title="Reset chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <button
                  onClick={() => setShowApiInput((v) => !v)}
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-white/50 hover:bg-white/20 transition-colors"
                  title="Configure API Key"
                >
                  API Key
                </button>
              </div>
            </div>

            {/* API Key input panel */}
            <AnimatePresence>
              {showApiInput && (
                <motion.div
                  className="px-4 py-3 bg-accent border-b-[3px] border-foreground shrink-0"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Security notice */}
                  <div className="flex items-start gap-1.5 mb-2 bg-black/10 border border-black/20 px-2 py-1.5">
                    <ShieldCheck size={12} className="shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-[10px] font-bold leading-tight">
                      🔒 Your key is stored in your browser's <strong>localStorage</strong> only.
                      It is never sent to any server — only directly to <strong>Gemini API</strong>.
                    </p>
                  </div>

                  <p className="text-[10px] font-bold mb-1.5 uppercase flex items-center gap-1">
                    <Key size={10} />
                    Gemini API Key{" "}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline normal-case"
                    >
                      (get yours free here ↗)
                    </a>
                  </p>

                  <div className="flex gap-2">
                    <div className="flex-1 flex border-[2px] border-foreground bg-background overflow-hidden">
                      <input
                        className="flex-1 text-xs px-2 py-1.5 font-mono bg-transparent outline-none"
                        placeholder="AIza..."
                        type={showKey ? "text" : "password"}
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
                      />
                      <button
                        onClick={() => setShowKey((v) => !v)}
                        className="px-2 border-l border-foreground/30 hover:bg-black/5 transition-colors"
                        title={showKey ? "Hide key" : "Show key"}
                      >
                        {showKey ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                    </div>
                    <button
                      onClick={handleSaveKey}
                      className="px-3 py-1.5 bg-foreground text-background text-xs font-black uppercase border-[2px] border-foreground"
                    >
                      Save
                    </button>
                  </div>

                  {/* Current key status */}
                  {apiKey && (
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] font-bold text-foreground/70 flex items-center gap-1">
                        ✅ Active: <span className="font-mono">{apiKey.slice(0, 8)}••••</span>
                      </p>
                      <button
                        onClick={handleDeleteKey}
                        className="text-[10px] font-black flex items-center gap-0.5 text-red-600 hover:underline"
                        title="Remove API key"
                      >
                        <Trash2 size={10} /> Remove key
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {/* Welcome message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div
                    className="bg-foreground text-background px-3 py-2.5 text-sm font-medium leading-relaxed"
                    style={{ border: "2px solid #000", boxShadow: "2px 2px 0 #000" }}
                  >
                    <span className="text-lg mr-2">👋</span>
                    Hi! I'm <strong>Cong Duong's</strong> AI Assistant. Ask me anything about him!
                    {!apiKey && (
                      <p className="mt-2 text-xs text-accent font-bold">
                        ⚠️ No API key yet. Click "API Key" above to add yours.
                      </p>
                    )}
                  </div>

                  {/* Quick questions */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                      Suggested questions:
                    </p>
                    {QUICK_QUESTIONS.map((q) => (
                      <motion.button
                        key={q}
                        className="w-full text-left px-3 py-2 text-xs font-bold bg-primary border-[2px] border-foreground hover:bg-secondary transition-colors"
                        style={{ boxShadow: "2px 2px 0 #000" }}
                        whileHover={{ x: -2, y: -2, boxShadow: "4px 4px 0 #000" }}
                        whileTap={{ x: 0, y: 0, boxShadow: "0 0 0 #000" }}
                        onClick={() => sendMessage(q)}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-7 h-7 flex items-center justify-center border-[2px] border-foreground text-xs font-black
                      ${msg.role === "user" ? "bg-secondary" : "bg-foreground text-background"}`}
                    style={{ boxShadow: "2px 2px 0 #000" }}
                  >
                    {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed font-medium border-[2px] border-foreground whitespace-pre-wrap
                      ${msg.role === "user"
                        ? "bg-secondary"
                        : "bg-background"
                      }`}
                    style={{ boxShadow: "2px 2px 0 #000" }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div
                    className="w-7 h-7 flex items-center justify-center bg-foreground text-background border-[2px] border-foreground shrink-0"
                    style={{ boxShadow: "2px 2px 0 #000" }}
                  >
                    <Bot size={12} />
                  </div>
                  <div
                    className="px-3 py-2 border-[2px] border-foreground bg-background"
                    style={{ boxShadow: "2px 2px 0 #000" }}
                  >
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="shrink-0 border-t-[3px] border-foreground flex">
              <input
                ref={inputRef}
                className="flex-1 px-4 py-3 text-sm font-medium bg-background border-none outline-none"
                placeholder={apiKey ? "Ask about Cong Duong..." : "Add an API key to start..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={loading}
              />
              <motion.button
                className="px-4 py-3 bg-primary border-l-[3px] border-foreground font-black disabled:opacity-50"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
