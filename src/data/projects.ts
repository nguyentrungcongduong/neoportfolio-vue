// ── Shared project data (used by AllProjects + ProjectDetail) ─────────────────
import ecommerce1 from "@/assets/projects/ecommerce-1.png";
import ecommerce2 from "@/assets/projects/ecommerce-2.png";
import task1      from "@/assets/projects/task-1.png";
import task2      from "@/assets/projects/task-2.png";
import weather1   from "@/assets/projects/weather-1.png";
import weather2   from "@/assets/projects/weather-2.png";
import portfolio1 from "@/assets/projects/portfolio-1.png";
import portfolio2 from "@/assets/projects/portfolio-2.png";
import game1      from "@/assets/projects/game-1.png";
import game2      from "@/assets/projects/game-2.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  images: string[];
  link?: string;      // undefined = not deployed
  github?: string;    // undefined = private repo
  jira?: string;      // Jira board URL
  jiraToastMsg?: string; // Optional toast message when clicking Jira
  docs?: string;      // Documentation URL (Notion, Google Docs, etc.)
  docsToastMsg?: string; // Optional toast message when clicking Docs
  featured?: boolean;
  inProcess?: boolean;
  year: string;
  role: string;
  teamSize?: number;
  highlights: string[];
}

export const allProjects: Project[] = [
  // ── FEATURED (shown on homepage) ────────────────────────────────────────────
  {
    id: "3d-load-planning",
    title: "3D Container Load Planning",
    description: "Distributed optimization platform solving 3D bin packing for shipping containers with real-time visualization.",
    longDescription:
      "A microservices-based distributed system that solves the 3D bin packing problem to maximize volume utilization in shipping containers. Features a Python OR-Tools optimization engine with multiple algorithms (heuristic BLF, BFD, and CP-SAT), a Go/Gin REST API handling async job queues via Redis, and a React + Three.js frontend delivering interactive 3D load visualization. Includes full JWT authentication, role-based access control, data isolation per user, and comprehensive audit logging.",
    tags: ["React", "Go", "Python", "Three.js", "Redis", "PostgreSQL"],
    color: "bg-accent",
    images: [portfolio1, portfolio2],
    link: undefined,
    github: undefined,
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    highlights: [
      "Implemented 3 optimization algorithms — OR-Tools CP-SAT, heuristic BLF, and BFD — to maximize container volume utilization",
      "Built interactive 3D visualization with Three.js rendering real-time placement results with overlap/z-fighting resolution",
      "Designed microservices: Go/Gin REST API + Python optimizer worker + Redis job queue, all containerized via Docker Compose",
      "Async optimization pipeline with Redis queue — frontend polls job status in real-time without blocking the API",
      "JWT authentication with RBAC (User/Admin), bcrypt password hashing (cost 12), and per-user data isolation",
      "Multi-container bin packing support with weight limits, stacking constraints, and box rotation handling",
    ],
  },
  {
    id: "news-portal-cms",
    title: "News Portal CMS",
    description: "Headless CMS for newsrooms: multi-role editorial workflow, drag-drop Page Builder, and realtime Breaking News via Socket.IO.",
    longDescription:
      "A professional news content management system built on Decoupled/Headless CMS architecture. Laravel 12 backend provides a REST API secured by Sanctum with 3-level RBAC (Admin/Editor/Author) via Spatie Permission. The Admin frontend uses React + Ant Design with a TipTap rich-text editor; the public site uses Next.js 16 with Socket.IO for real-time Breaking News. Includes Service Pattern, article versioning (snapshotting), automatic spam detection for comments, dynamic Sitemap, and Cloudinary image optimization.",
    tags: ["Laravel", "React", "Next.js", "Redis", "Socket.IO"],
    color: "bg-primary",
    images: [ecommerce1, ecommerce2],
    link: "https://news-portal-public-gray.vercel.app",
    github: undefined,
    docs: "https://docs.google.com/spreadsheets/d/1IB9uG0eEGp0-4kUrthaJzMvETIXYfg1u/edit?usp=drive_link&ouid=105379329389586303385&rtpof=true&sd=true",
    featured: true,
    year: "2026",
    role: "Solo Full Stack Developer",
    highlights: [
      "Headless CMS 3-tier: Laravel 12 API — React Admin SPA — Next.js 16 Public site, deployed separately on Vercel",
      "RBAC (Admin/Editor/Author) via Spatie Permission + Laravel Sanctum, each resource protected by dedicated Policy",
      "Drag-drop JSON-based Page Builder: Admin designs static page layouts, React renders dynamically from API config",
      "Realtime view counter: Redis INCR instead of DB writes, Laravel Scheduler syncs to MySQL every 5–10 min (no write storm)",
      "Standalone Socket.IO server (Node.js/Express) broadcasts Breaking News instantly to all online readers without page reload",
      "Article versioning (Snapshotting) + auto spam detection + dynamic Sitemap + Cloudinary WebP optimization",
    ],
  },
  {
    id: "job-application-tracker",
    title: "Job Application Tracker Pro",
    description: "Full-stack job management system with Kanban board, AI resume analysis & automated notifications.",
    longDescription:
      "Developed a comprehensive full-stack job application management system helping job seekers organize applications, track interviews, and optimize job search strategy. Features AI-powered resume analysis, automated email notifications via Gmail SMTP, and a real-time analytics dashboard with conversion funnel and offer probability prediction.",
    tags: ["Spring Boot", "React", "TypeScript", "Docker", "PostgreSQL"],
    color: "bg-secondary",
    images: [task1, task2],
    link: "https://57.180.52.73",
    github: "https://github.com/nguyentrungcongduong/Job-Application-Tracker-Pro.git",
    featured: true,
    year: "2025",
    role: "Full Stack Developer",
    highlights: [
      "JWT authentication + email verification (Spring Security 6)",
      "Kanban board & table view for application pipeline management",
      "Automated email notifications for interview reminders (Gmail SMTP)",
      "Analytics dashboard with conversion funnel & offer probability prediction",
      "Real-time in-app notifications & scheduled background jobs",
      "Deployed on AWS EC2 with Docker containerization",
    ],
  },
  {
    id: "miro-clone",
    title: "Real-Time Collaborative Whiteboard",
    description: "Miro-inspired whiteboard with live multi-user sync powered by Yjs CRDT and Laravel Reverb WebSockets.",
    longDescription:
      "A full-stack real-time collaborative whiteboard application inspired by Miro, built with Laravel 11 and Vue 3. Multiple users can simultaneously draw on a shared canvas, create sticky notes, mini text editors, and text captions — all synchronized instantly via a dual-channel real-time architecture combining Yjs (CRDT-based conflict-free sync over y-websocket) and Laravel Reverb (native WebSocket server). Users authenticate via Google OAuth 2.0 with PKCE flow using Laravel Passport and Socialite.",
    tags: ["Vue 3", "Laravel", "Yjs", "Laravel Reverb", "PostgreSQL"],
    color: "bg-info",
    images: [weather1, weather2],
    link: undefined,
    github: "https://github.com/nguyentrungcongduong/miro-clone-ne.git",
    featured: true,
    year: "2024",
    role: "Solo Developer",
    highlights: [
      "Dual real-time sync: Yjs CRDT (y-websocket) for conflict-free state + Laravel Reverb for user presence & typing indicators",
      "Freehand drawing canvas via HTML5 Canvas API with undo/redo, DPI-aware scaling, and path replay from persisted JSON",
      "Draggable & resizable board elements (Sticky Notes, Mini Text Editors, Captions) synced across all clients via Yjs",
      "Real-time shared cursor tracking throttled at 20fps (50ms) using Yjs Map — named cursors per user",
      "Google OAuth 2.0 with PKCE flow via Laravel Passport + Socialite — no passwords stored",
      "4-service deployment on Render: Laravel web, Reverb WebSocket, queue worker, and Node.js y-websocket server",
    ],
  },

  // ── OTHER PROJECTS ───────────────────────────────────────────────────────────
  {
    id: "ckfms",
    title: "Central Kitchen & Franchise Management",
    description: "Full-stack platform digitizing supply chain for franchise chains — orders, production, inventory & delivery in real time.",
    longDescription:
      "CKFMS replaces fragmented Excel/paper workflows in franchise chains with a unified, real-time platform. Franchise store staff place ingredient orders via a React web portal or Expo mobile app, which flow into a Laravel backend where coordinators confirm, kitchen staff plan production batches, and deliveries are tracked end-to-end. The system spans 5 distinct actor roles — Admin, Manager, Supply Coordinator, Kitchen Staff, and Store Staff — each with a dedicated role-based interface and scoped API routes.",
    tags: ["Laravel", "React", "Expo", "PostgreSQL", "NativeWind"],
    color: "bg-primary",
    images: [portfolio1, portfolio2],
    link: undefined,
    github: "https://github.com/nguyentrungcongduong/CNPM_CS3.git",
    jira: "https://congduongnguyentrung.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiMWY0NGFjNzI4ZjYwNDc0Nzk4MDkzZDg5YzgxYjgyZGMiLCJwIjoiaiJ9",
    jiraToastMsg: "Link private vì lý do bảo mật. Vui lòng gửi mail verify để được cấp quyền xem Jira nhé!",
    year: "2026",
    role: "Full Stack Developer",
    teamSize: 4,
    highlights: [
      "5-role RBAC (Admin/Manager/Coordinator/Kitchen Staff/Store Staff) with dedicated API route namespaces per role",
      "QR code batch-tracking: kitchen generates QR → delivery scan → store staff scans via Expo Camera to auto-update inventory in a single transaction",
      "Real-time push notifications via Laravel Queue (Redis) + Expo Push API — order state changes trigger targeted alerts instantly",
      "Manager analytics: low-stock alerts, expiry tracking, delayed delivery counts, weekly production reports with PostgreSQL aggregations",
      "Domain-driven Laravel architecture with Service layer (DeliveryService, InventoryService, NotificationService, ReportService)",
      "Cross-platform: React + Ant Design admin web, React + Tailwind staff web, and Expo Router TypeScript mobile — single Laravel API",
    ],
  },
  {
    id: "planbookai",
    title: "PlanBookAI",
    description: "AI-powered SaaS for K-12 teachers: auto lesson plans, exam generation, and OCR answer sheet grading via Gemini.",
    longDescription:
      "PlanBookAI is a SaaS web app for K-12 teachers integrating Gemini AI to automatically generate lesson plans (E5/Backward Design curriculum standard), create exams from a question bank, and grade multiple-choice answer sheets via OCR. The system features 4-role access control (Admin, Manager, Staff, Teacher), a prompt template approval workflow, VNPay subscription payment, and multi-level analytics dashboards for student results, revenue, and user growth.",
    tags: ["React", "Spring Boot", "MySQL", "Docker"],
    color: "bg-secondary",
    images: [ecommerce1, ecommerce2],
    link: undefined,
    github: "https://github.com/CongduongNT/JAVA.git",
    jira: "https://nguyentrungcongduong.atlassian.net/jira/software/projects/KAN/summary?atlOrigin=eyJpIjoiNmVlYTYxMTRkNTc5NGE4Y2FkY2ZmMDU0MzcxZGNkNjgiLCJwIjoiaiJ9",
    jiraToastMsg: "Dự án này có đầy đủ Docs được lưu trong Confluence đính kèm trên Jira!",
    year: "2026",
    role: "Full Stack Developer",
    teamSize: 4,
    highlights: [
      "AI Lesson Plan Generator: generates E5/E3/Backward Design plans from prompts or PDF/DOCX uploads with inline editing",
      "Hybrid Exam Generator: pulls from Question Bank, calculates gaps, calls Gemini to fill remaining — supports difficulty_mix per slot",
      "OCR Answer Sheet Grading: teachers upload student answer photos, system auto-grades and generates AI feedback via Gemini",
      "Prompt Template Approval Workflow: Staff drafts → Manager approves → Teacher selects — ensures AI content quality control",
      "Full VNPay integration: URL generation, Return URL + IPN server-to-server handling, auto-activates subscription on success",
      "Multi-level analytics: Teacher (exam stats, Bloom's Taxonomy), Manager/Admin (revenue KPIs, MoM growth, top packages)",
    ],
  },
  {
    id: "veritas-the-daily-deduction",
    title: "Veritas — The Daily Deduction",
    description: "Mystery-solving gamification platform where each user is both a Detective and a Criminal with dual Fame/Prestige systems.",
    longDescription:
      "Veritas is a unique gamification web app where users play two opposing roles: Detective (solve cases, find contradictions in evidence) or Criminal (design cases, trap investigators). The system is built on Next.js + Laravel with a JudgmentService that validates clue–statement contradiction chains with 100% accuracy. Each day features a 'Daily Dossier' with x2 Fame reward, alongside an AI Watson assistant with 2-tier hints and corresponding penalties. The UI is inspired by 1940s noir newspaper aesthetics, featuring retinal scan login animation and TransitionOverlay mode-switching.",
    tags: ["Next.js", "Laravel", "PostgreSQL", "React Query", "Zustand"],
    color: "bg-accent",
    images: [game1, game2],
    link: "https://veritas-iota-mocha.vercel.app/",
    github: "https://github.com/nguyentrungcongduong/Veritas-.git",
    year: "2026",
    role: "Solo Developer",
    highlights: [
      "Dual Identity System: each user has Fame (Detective) and Prestige (Criminal) in parallel, UI theme changes based on dominant stat",
      "JudgmentService: clue–statement chain validated 100% (zero false positives) before awarding successful case resolution",
      "Daily Dossier via Laravel Cache: special daily case grants x2 Fame, triggers +200 Prestige to Criminal author on Detective failure",
      "Watson AI Mentor 2-tier: Tier 1 highlights related nodes (-20% Fame), Tier 2 reveals contradiction type (-40% Fame), usage audited",
      "FameService with difficulty multiplier (x1.0–x5.0), first-solve bonus (x1.5), and gadget penalty system to prevent farming",
      "Cinematic UX: retinal scan login animation, mode-switch TransitionOverlay with CSS noise texture, 1940s newspaper aesthetics",
    ],
  },
  {
    id: "social-media-app",
    title: "Social Media Website",
    description: "Mini social network with posts, likes, comments, follow system & real-time updates.",
    longDescription:
      "Built a mini social-network application that allows users to register accounts, create posts (with images), like and comment, and follow other users. The interface is modern, optimized for user experience, and supports real-time content updates via Inngest background jobs.",
    tags: ["React", "TailwindCSS", "Node.js", "Clerk", "Inngest"],
    color: "bg-primary",
    images: [ecommerce2, ecommerce1],
    link: "https://build-and-deploy-a-full-stack-socia-three.vercel.app/",
    github: "https://github.com/nguyentrungcongduong/Build-and-Deploy-a-Full-Stack-Social-Media-App.git",
    docs: "https://docs.google.com/document/d/1pfYCu52mCAD9pIiJVhSHZtTI_5SKDjrv/edit?usp=sharing&ouid=105379329389586303385&rtpof=true&sd=true",
    year: "2025",
    role: "Full Stack Developer",
    highlights: [
      "Register / log in with email or Google (Clerk Auth)",
      "Create, edit, and delete posts with image uploads",
      "Comment, like (heart), and follow other users",
      "Personal profile page with user info and post history",
      "Real-time content updates via Inngest background functions",
      "Deployed on Vercel — fully responsive desktop & mobile",
    ],
  },
  {
    id: "cod-management-system",
    title: "COD Management System",
    description: "Cash-on-delivery management for Shops, Shippers & Admins with reconciliation & fraud detection.",
    longDescription:
      "A comprehensive COD collection management and reconciliation system helping shops, shippers, and delivery companies manage COD cash flow efficiently. Three-role system: Shop owners track revenue & orders, Shippers manage deliveries & scan QR codes, Admins monitor the full system and detect fraud.",
    tags: ["Java", "PostgreSQL", "React", "TypeScript", "Ant Design"],
    color: "bg-accent",
    images: [task2, task1],
    link: "https://cash-on-delivery-cod-collection-and-psi.vercel.app/login",
    github: "https://github.com/nguyentrungcongduong/Cash-on-Delivery-COD-Collection-and-Reconciliation-System.git",
    year: "2024",
    role: "Full Stack Developer",
    highlights: [
      "3-role system: Shop owners, Shippers, and Admins with dedicated dashboards",
      "Real-time order status updates & QR code scanning for shippers",
      "Automatic reconciliation between shops and delivery personnel",
      "Excel report export & overdue payment alerts",
      "Fraud detection & top performer analytics for admins",
      "Revenue charts and trend analysis with Recharts",
    ],
  },
  {
    id: "ecommerce-nextjs",
    title: "Template Ecommerce Next.js",
    description: "HTML/CSS templates converted to Next.js with Clerk authentication, deployed on Vercel.",
    longDescription:
      "Converted pre-built HTML/CSS e-commerce templates into a modern Next.js application. Applied Clerk authentication for secure user login and session management. Fully deployed on Vercel as a production-ready demo.",
    tags: ["Next.js", "Bootstrap", "Clerk"],
    color: "bg-info",
    images: [weather2, weather1],
    link: "https://nextjs-first-seven-pied.vercel.app/",
    github: "https://github.com/nguyentrungcongduong/nextjs_first.git",
    year: "2025",
    role: "Frontend Developer",
    highlights: [
      "Converted static HTML/CSS templates to Next.js App Router",
      "Clerk authentication integration (email + Google login)",
      "Bootstrap grid system adapted to Next.js component model",
      "Deployed to Vercel with CI/CD pipeline",
    ],
  },
  {
    id: "multiple-choice-exam",
    title: "Multiple-Choice Exam Website",
    description: "Online testing platform with real-time countdown, auto-scoring, rankings, and admin panel.",
    longDescription:
      "Developed an online multiple-choice testing website allowing users to log in, select exams by topic, take timed tests, and view results immediately after submission. Includes score statistics, ranking boards, and a full admin panel for question management.",
    tags: ["Spring Boot", "jQuery", "Thymeleaf", "Firebase"],
    color: "bg-primary",
    images: [game2, game1],
    link: undefined,
    github: "https://github.com/nguyentrungcongduong/web_trac_nghiem.git",
    year: "2024",
    role: "Full Stack Developer",
    highlights: [
      "Firebase Authentication for login & registration",
      "Real-time timed quizzes with countdown clock",
      "Automatic scoring & instant result display after submission",
      "Score statistics and ranking leaderboard for all users",
      "Admin panel: add, edit, and delete exam questions",
      "Responsive design for mobile and desktop",
    ],
  },
  {
    id: "no-regret-exit",
    title: "No-Regret Exit",
    description: "Micro-product helping job leavers record their decision reason — sent back 30 days later for reflection.",
    longDescription:
      "No-Regret Exit is a micro-product built to validate a behavioral hypothesis: people pay not to succeed more, but to be less harsh on themselves after a difficult decision. Users write their resignation reasons while clear-headed; the system sends it back after 30 days for reflection. Built with minimalist tech (HTML/CSS/JS, Google Forms, Google Sheets, Gmail) — one-time purchase, no subscription.",
    tags: ["HTML", "CSS", "JavaScript", "Google Forms", "Google Sheets"],
    color: "bg-secondary",
    images: [portfolio2, portfolio1],
    link: "https://no-regret-exit.vercel.app/",
    github: "https://github.com/nguyentrungcongduong/No-Regret-Exit",
    year: "2026",
    role: "Solo Developer & Product Designer",
    highlights: [
      "Built the entire product solo — from behavioral psychology concept to landing page, payment flow, and delivery system",
      "No-backend payment flow: Momo bank transfer with email-encoded content, confirmation sent manually within 12–24h",
      "Google Form as payment confirmation step, Google Sheets as lightweight user-tracking database",
      "Auto copy-to-clipboard from email input to minimize transfer content errors",
      "Minimal UI focused on emotional conversion — no distractions, emotional messaging over feature lists",
      "Validated product hypothesis: 'users pay to be less cruel to themselves' — shipped with zero frameworks",
    ],
  },
  {
    id: "hotel-booking-website-php",
    title: "NoNa Hotel — Booking Website",
    description: "Full-stack hotel booking site with PHP/MySQL, responsive UI, and admin panel for reservation management.",
    longDescription:
      "NoNa Hotel is a hotel booking website built with pure PHP and MySQL, featuring a complete user-facing interface and admin panel. The frontend uses Bootstrap 5 with Swiper.js for smooth image carousels and coverflow testimonials. Authentication is clearly separated between Admin (session-based with dedicated table) and User (modal login/register). The admin panel provides a real-time statistics dashboard for bookings, available rooms, staying guests, and daily revenue.",
    tags: ["PHP", "MySQL", "Bootstrap 5", "JavaScript"],
    color: "bg-accent",
    images: [weather1, portfolio1],
    link: undefined,
    github: "https://github.com/nguyentrungcongduong/-Hotel-Booking-Website-PHP",
    year: "2025",
    role: "Solo Developer",
    highlights: [
      "Two-tier authentication: Admin login via MySQLi prepared statements (SQL injection prevention), User login via session modal",
      "Admin dashboard with 4 KPI cards (New Bookings, Rooms Available, Guests Staying, Revenue Today) + Recent Activity feed",
      "Room listing with sidebar filters: check-in/out dates, facilities checkboxes, adults/children count",
      "Swiper.js carousel with autoplay (3500ms), keyboard & mousewheel nav, and coverflow testimonials (1/2/3 slides per breakpoint)",
      "Component-based PHP: header/footer split via require(), admin panel with essentials.php & db_config.php",
      "Fully responsive with sticky navbar, Bootstrap 5 grid, Google Fonts (Playfair Display + Poppins), Bootstrap Icons",
    ],
  },
  {
    id: "lt-mobile",
    title: "Mobile Programming (LT_Mobile)",
    description: "Android application development - team size 4 (Lead).",
    longDescription: "Mobile programming course project. Led a team of 4 to develop a native mobile application.",
    tags: ["Java", "Firebase"],
    color: "bg-secondary",
    images: [ecommerce1, ecommerce2],
    github: "https://github.com/nguyentrungcongduong/LT_Mobile.git",
    jira: "https://congduongnguyentrung.atlassian.net/jira/software/projects/LM/boards/37?atlOrigin=eyJpIjoiMTQ4ZjkxZDVmZTIyNDAzZGI1NTRkMjY2MDc3NmVjMzAiLCJwIjoiaiJ9",
    jiraToastMsg: "Link private vì lý do bảo mật. Vui lòng gửi mail verify để được cấp quyền xem Jira nhé!",
    year: "2024",
    role: "Team Lead",
    teamSize: 4,
    highlights: ["Native Android Development", "Team leadership and task delegation", "Jira sprint tracking"],
  },
];
