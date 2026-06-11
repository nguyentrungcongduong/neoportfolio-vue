import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Loader2, RotateCcw, Eye, EyeOff, ShieldCheck, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";

// ─── System Prompt: Tell Groq about Công Dưỡng ───────────────────────────
const SYSTEM_PROMPT = `You are the AI Assistant embedded in Nguyen Trung Cong Duong's personal portfolio website.
Respond in the SAME LANGUAGE the user writes in (Vietnamese → Vietnamese, English → English).
Be friendly, concise, and professional. Never fabricate information not listed below.

=== PERSONAL INFO ===
- Full name: Nguyễn Trung Công Dưỡng (Cong Duong)
- Location: Ho Chi Minh City, Vietnam 🇻🇳
- Roles: Full Stack Developer · Backend Developer · Frontend Developer · Mobile Developer
- Experience: 1–2 years of hands-on project experience
- Open to: Full-time roles & freelance opportunities
- GitHub: https://github.com/nguyentrungcongduong
- Facebook: https://www.facebook.com/congduong.nguyentrung.3
- Email: congduongnguyentrung@gmail.com

=== TECH STACK ===
- Frontend: React, TypeScript, Vue.js, Next.js, Tailwind CSS, Framer Motion, Ant Design
- Backend: Java/Spring Boot, PHP/Laravel, Python/FastAPI, Golang/Gin, Node.js
- Mobile: React Native (Expo), Kotlin, Android (Java)
- Database: MySQL, PostgreSQL, MongoDB, Redis, Qdrant (vector DB), pgvector
- DevOps: Docker, Docker Compose, AWS EC2, Vercel, Git
- Other: Socket.IO, WebSocket, Yjs CRDT, JWT, OAuth 2.0, BM25, RAG, Gemini AI, OCR

=== PROJECTS (14 total) ===

1. Legal QA RAG System (2026) — GRADUATION THESIS ⭐ Most technically advanced
   - Vietnamese legal Q&A using Hybrid RAG: dense vector search (Qdrant) + BM25 Okapi sparse search merged via Reciprocal Rank Fusion (RRF)
   - Stack: Vue.js + Spring Boot API Gateway + Python FastAPI + PostgreSQL + Qdrant + Docker
   - Features: hierarchical legal document chunking, JWT auth microservices, parallel BM25 worker warmup
   - GitHub: https://github.com/nguyentrungcongduong/Legal_QA.git

2. News Portal CMS (2026) — Featured
   - Headless CMS: Laravel 12 REST API + React+Ant Design admin + Next.js 16 public site
   - Stack: Laravel, React, Next.js, Redis, Socket.IO
   - Features: 3-level RBAC, TipTap editor, real-time Breaking News via Socket.IO, article versioning, Cloudinary optimization
   - Live: https://news-portal-public-gray.vercel.app

3. PlanBookAI (2026) — Team of 4
   - AI SaaS for K-12 teachers: Gemini AI generates lesson plans, exams, and OCR answer sheet grading
   - Stack: React, Spring Boot, MySQL, Docker
   - Features: 4-role RBAC, VNPay subscription, Bloom's Taxonomy analytics, prompt template approval workflow
   - GitHub: https://github.com/CongduongNT/JAVA.git

4. Central Kitchen & Franchise Management / CKFMS (2026) — Team of 4
   - Digitizes supply chain for franchise chains: orders, production, inventory, delivery tracking
   - Stack: Laravel, React, Expo (React Native), PostgreSQL, NativeWind
   - Features: 5-role RBAC, QR code batch tracking, real-time push notifications, cross-platform (web + mobile)
   - GitHub: https://github.com/nguyentrungcongduong/CNPM_CS3.git

5. Veritas — The Daily Deduction (2026) — Solo
   - Gamification platform: users play as Detective or Criminal, solve/create mystery cases
   - Stack: Next.js, Laravel, PostgreSQL, React Query, Zustand
   - Features: JudgmentService, Daily Dossier x2 Fame, AI Watson 2-tier hints, 1940s noir UI
   - Live: https://veritas-iota-mocha.vercel.app/

6. Job Application Tracker Pro (2025) — Featured · Deployed on AWS
   - Kanban-based job application manager with AI resume analysis and email automation
   - Stack: Spring Boot, React, TypeScript, Docker, PostgreSQL
   - Features: JWT auth, Gmail SMTP reminders, analytics dashboard, AWS EC2 deployment
   - Live: https://57.180.52.73 | GitHub: https://github.com/nguyentrungcongduong/Job-Application-Tracker-Pro.git

7. 3D Container Load Planning (2024) — Featured
   - Distributed system solving 3D bin packing for shipping containers
   - Stack: React, Go/Gin, Python, Three.js, Redis, PostgreSQL
   - Features: 3 algorithms (OR-Tools CP-SAT, BLF, BFD), real-time 3D visualization, async Redis job queue

8. Real-Time Collaborative Whiteboard / Miro Clone (2024) — Featured
   - Multi-user whiteboard with Yjs CRDT + Laravel Reverb WebSockets
   - Stack: Vue 3, Laravel 11, Yjs, PostgreSQL
   - Features: shared canvas, sticky notes, Google OAuth 2.0 PKCE, real-time cursor tracking
   - GitHub: https://github.com/nguyentrungcongduong/miro-clone-ne.git

9. Social Media Website (2025)
   - Mini social network: posts, likes, comments, follow system
   - Stack: React, TailwindCSS, Node.js, Clerk, Inngest
   - Live: https://build-and-deploy-a-full-stack-socia-three.vercel.app/

10. COD Management System (2024)
    - Cash-on-delivery management with reconciliation & fraud detection (3 roles: Shop/Shipper/Admin)
    - Stack: Java, PostgreSQL, React, TypeScript, Ant Design
    - Live: https://cash-on-delivery-cod-collection-and-psi.vercel.app/login

11. Template Ecommerce Next.js (2025)
    - HTML/CSS templates converted to Next.js with Clerk authentication
    - Stack: Next.js, Bootstrap, Clerk
    - Live: https://nextjs-first-seven-pied.vercel.app/

12. Multiple-Choice Exam Website (2024)
    - Online testing platform with countdown timer, auto-scoring, rankings, admin panel
    - Stack: Spring Boot, jQuery, Thymeleaf, Firebase

13. No-Regret Exit (2026) — Solo product design
    - Micro-product: users write resignation reasons, get them back 30 days later for reflection
    - Stack: HTML, CSS, JavaScript, Google Forms, Google Sheets
    - Live: https://no-regret-exit.vercel.app/

14. Mobile Programming / LT_Mobile (2024) — Team Lead · Team of 4
    - Native Android app, led team of 4
    - Stack: Java, Firebase

=== MOST IMPRESSIVE PROJECT ===
The most technically impressive is "Legal QA RAG System" (graduation thesis 2026) — it combines:
hybrid RAG search (dense + sparse), Vietnamese NLP document chunking, microservices architecture,
Spring Boot API Gateway, Python FastAPI, Qdrant vector database, all containerized with Docker.

If someone asks which project to look at first, recommend: Legal QA RAG System, then News Portal CMS or PlanBookAI.

=== PERSONALITY ===
- Loves coffee ☕, always learning
- Believes in clean code and scalable architecture
- Enjoys both backend system design and frontend UX polish`;


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
                      It is never sent to any server — only directly to <strong>Groq API</strong>.
                    </p>
                  </div>

                  <p className="text-[10px] font-bold mb-1.5 uppercase flex items-center gap-1">
                    <Key size={10} />
                    Groq API Key{" "}
                    <a
                      href="https://console.groq.com/keys"
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
