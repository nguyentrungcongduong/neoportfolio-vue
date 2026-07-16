import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Loader2, RotateCcw, Eye, EyeOff, ShieldCheck, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";

// ─── System Prompt: Tell Groq about Công Dưỡng ───────────────────────────
const SYSTEM_PROMPT = `You are the AI Assistant embedded in Nguyen Trung Cong Duong's personal portfolio website.
Respond in the SAME LANGUAGE the user writes in (Vietnamese → Vietnamese, English → English).
Be friendly, enthusiastic, and concise. Use emojis naturally. Never fabricate information not listed below.
Keep responses under 200 words unless asked for detail.

=== PERSONAL INFO ===
- Full name: Nguyễn Trung Công Dưỡng (Cong Duong / "Zương")
- Location: Ho Chi Minh City, Vietnam 🇻🇳
- University: UTH (Đại học Giao thông vận tải TP.HCM), GPA 3.25/4.0, graduated 2026
- Graduation thesis: Legal QA RAG System (AI/NLP) — rated excellent
- Roles: Full Stack Developer · Backend Developer · Frontend Developer
- Status: OPEN TO WORK ✅ — looking for full-time backend/fullstack roles
- GitHub: https://github.com/nguyentrungcongduong
- Facebook: https://www.facebook.com/congduong.nguyentrung.3
- Email: congduongnguyentrung@gmail.com

=== WORK EXPERIENCE ===
1. CloudGO (06/2026 – 07/2026) — PHP Developer Intern
   PHP CRM framework, GitLab workflow, enterprise codebase
2. GoPlay Tech (01/2026 – present) — Backend Developer (Remote)
   ERP/CRM modules, RESTful API, sprint planning, Laravel + React
3. Enterprise Company (03/2025 – 05/2025) — C# Backend Intern
   Microservices, Clean Architecture, DDD/CQRS, .NET
4. Java Internship (09/2023 – 11/2023) — Backend Java Intern
   Spring Boot, MySQL, Git workflow basics

=== TECH STACK ===
- Frontend: React, TypeScript, Vue.js, Next.js, Tailwind CSS, Framer Motion, Ant Design
- Backend: Java/Spring Boot ⭐ (strongest), PHP/Laravel, Python/FastAPI, Golang/Gin, Node.js
- Mobile: React Native (Expo), Kotlin, Android (Java)
- Database: MySQL, PostgreSQL, MongoDB, Redis, Qdrant (vector DB), pgvector
- DevOps: Docker, Docker Compose, AWS EC2, Vercel, Git/GitLab
- AI/Special: Socket.IO, WebSocket, Yjs CRDT, JWT, OAuth 2.0 PKCE, BM25, RAG, Gemini AI, OCR

=== PROJECTS (14 total) ===

1. Legal QA RAG System (2026) — GRADUATION THESIS ⭐ Most technically advanced
   Vietnamese legal Q&A using Hybrid RAG: dense vector (Qdrant) + BM25 sparse merged via RRF
   Stack: Vue.js + Spring Boot API Gateway + Python FastAPI + PostgreSQL + Qdrant + Docker
   GitHub: https://github.com/nguyentrungcongduong/Legal_QA.git

2. News Portal CMS (2026) — Featured
   Headless CMS: Laravel 12 + React+Ant Design admin + Next.js public site
   Features: 3-level RBAC, TipTap editor, real-time Breaking News via Socket.IO
   Live: https://news-portal-public-gray.vercel.app

3. PlanBookAI (2026) — Team of 4
   AI SaaS for K-12 teachers: Gemini AI generates lesson plans + OCR answer sheet grading
   Stack: React, Spring Boot, MySQL, Docker

4. CKFMS (2026) — Team of 4
   Franchise supply chain: orders, production, inventory, delivery + mobile app
   Stack: Laravel, React, Expo (React Native), PostgreSQL

5. Veritas — The Daily Deduction (2026) — Solo
   Gamification: users play Detective or Criminal, solve mystery cases
   Live: https://veritas-iota-mocha.vercel.app/

6. Job Application Tracker Pro (2025) — Featured · AWS Deployed
   Kanban job tracker with AI resume analysis + Gmail automation
   Stack: Spring Boot, React, Docker, PostgreSQL, AWS EC2
   Live: https://57.180.52.73

7. 3D Container Load Planning (2024) — Featured
   3D bin packing for shipping containers, 3 algorithms, Three.js visualization
   Stack: React, Go/Gin, Python, Three.js, Redis, PostgreSQL

8. Real-Time Collaborative Whiteboard / Miro Clone (2024) — Featured
   Multi-user whiteboard with Yjs CRDT + Laravel Reverb WebSockets
   Stack: Vue 3, Laravel 11, Yjs, PostgreSQL

9. Social Media Website (2025)
   Mini social network: posts, likes, comments, follow system
   Stack: React, Node.js, Clerk, Inngest
   Live: https://build-and-deploy-a-full-stack-socia-three.vercel.app/

10. COD Management System (2024)
    Cash-on-delivery management + fraud detection (3 roles)
    Stack: Java, PostgreSQL, React, Ant Design

11–14: Template E-commerce (Next.js), Multiple-Choice Exam (Spring Boot), No-Regret Exit (HTML/JS), Mobile App (Android/Java)

=== THIS PORTFOLIO WEBSITE ===
Built with React + TypeScript + Vite + Framer Motion. Features:
- 🌙 Dark/Light mode toggle
- 🎨 5 accent color themes (yellow/pink/cyan/purple/orange)
- 🌐 VI/EN language switch
- 🖱️ Cursor trail effect
- 🎮 Easter egg: Konami code (↑↑↓↓←→←→BA)
- 📊 Skill bars, experience timeline
- 🔄 Page transitions
- 📱 PWA — installable as app
- 🤖 AI chatbot (that's me!)

=== PERSONALITY ===
- Loves coffee ☕, always learning new tech
- Believes in clean code, scalable architecture, and good DX
- Enjoys backend system design as much as frontend UX polish
- Hardworking, self-taught, open to feedback
- Fun fact: built 14 projects in 2 years while studying full-time

=== HOW TO RESPOND ===
- If asked about hiring/contact: share email + GitHub
- If asked which project to look at first: recommend Legal QA RAG → News Portal → PlanBookAI
- If asked about salary/rate: say "hãy liên hệ trực tiếp qua email để thảo luận"
- If asked something you don't know: say you only know what's listed above, suggest emailing directly`;


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

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "llama-3.1-8b-instant"; // fast & free-tier friendly

async function callGroq(messages: Message[], apiKey: string): Promise<string> {
  const body = {
    model: GROQ_MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    temperature: 0.7,
    max_tokens: 512,
  };

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || "Groq API Error");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response received.";
}

// ─── Component ──────────────────────────────────────────────────────────────
const BUBBLE_MESSAGES = [
  "👋 Hi! Got questions about Cong Duong?",
  "💬 Ask me anything about his skills!",
  "🚀 Want to know his tech stack?",
  "✨ Chat with the AI Assistant!",
];

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(
    () =>
      localStorage.getItem("cong_duong_groq_key") ||
      import.meta.env.VITE_GROQ_API_KEY ||
      ""
  );
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-show bubble after 2s, cycle messages every 4s
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!bubbleDismissed) setShowBubble(true);
    }, 2000);
    return () => clearTimeout(showTimer);
  }, [bubbleDismissed]);

  useEffect(() => {
    if (!showBubble) return;
    const cycleTimer = setInterval(() => {
      setBubbleIndex((i) => (i + 1) % BUBBLE_MESSAGES.length);
    }, 4000);
    return () => clearInterval(cycleTimer);
  }, [showBubble]);

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
      const reply = await callGroq(newMessages, apiKey);
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

    localStorage.setItem("cong_duong_groq_key", trimmed);
    setApiKey(trimmed);
    setShowApiInput(false);
    setTempApiKey("");
    setShowKey(false);

    toast.success("Groq API key saved! 🎉", {
      description: "Stored only in your browser's localStorage — sent directly to Groq API only.",
      duration: 5000,
      icon: <ShieldCheck className="text-green-500" size={18} />,
    });
  };

  const handleDeleteKey = () => {
    localStorage.removeItem("cong_duong_groq_key");
    setApiKey("");
    setTempApiKey("");
    setMessages([]);
    toast.info("API key removed from your browser.", { duration: 3000 });
  };

  const resetChat = () => setMessages([]);

  return (
    <>
      {/* ── Floating Button + Speech Bubble ─────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Auto speech bubble */}
        <AnimatePresence>
          {showBubble && !isOpen && !bubbleDismissed && (
            <motion.div
              className="relative flex items-center gap-1.5 px-3 py-2 bg-foreground text-background text-xs font-black border-[2px] border-foreground whitespace-nowrap max-w-[220px]"
              style={{ boxShadow: "3px 3px 0px 0px #888" }}
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{
                opacity: 1,
                y: [0, -4, 0],
                scale: 1,
              }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* Dismiss button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                  setBubbleDismissed(true);
                }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-foreground border border-background text-background flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
                style={{ fontSize: "8px", lineHeight: 1 }}
                aria-label="Dismiss"
              >
                ✕
              </button>

              {/* Cycling message */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={bubbleIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {BUBBLE_MESSAGES[bubbleIndex]}
                </motion.span>
              </AnimatePresence>

              {/* Arrow pointing down-right to button */}
              <span className="absolute -bottom-[9px] right-5 border-4 border-transparent border-t-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="w-14 h-14 bg-primary border-[3px] border-foreground flex items-center justify-center"
          style={{ boxShadow: "4px 4px 0px 0px #000" }}
          whileHover={{ scale: 1.1, boxShadow: "6px 6px 0px 0px #000", y: -3 }}
          whileTap={{ scale: 0.9, boxShadow: "1px 1px 0px 0px #000" }}
          onClick={() => {
                  setIsOpen((v) => !v);
                  setShowBubble(false);
                }}
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
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border border-white/50 transition-all duration-200 hover:bg-white hover:text-foreground hover:border-white hover:px-3"
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
                      It is never sent to any server — only directly to <strong>Groq API</strong>.
                    </p>
                  </div>

                  <p className="text-[10px] font-bold mb-1 uppercase flex items-center gap-1">
                    <Key size={10} />
                    Groq API Key
                  </p>
                  <a
                    href="https://console.groq.com/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mb-2 px-3 py-1.5 text-xs font-bold border-[2px] border-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-150"
                  >
                    🔑 Get yours free here ↗
                  </a>
                  <div className="flex gap-2">
                    <div className="flex-1 flex border-[2px] border-foreground bg-background overflow-hidden">
                      <input
                        className="flex-1 text-xs px-2 py-1.5 font-mono bg-transparent outline-none"
                        placeholder="gsk_..."
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
                      className="px-3 py-1.5 bg-foreground text-background text-xs font-black uppercase border-[2px] border-foreground hover:bg-green-500 hover:border-green-600 hover:text-white transition-all duration-200"
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
