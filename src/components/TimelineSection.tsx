import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/context/LanguageContext";

const timelineEntries = [
  {
    company: "CloudGO",
    role: "PHP Developer Intern",
    period: "06/2026 – 07/2026",
    description:
      "Thực tập tại CloudGO, làm việc với PHP CRM framework, xây dựng và bảo trì các module CRM, tuân thủ GitLab workflow và quy trình phát triển chuyên nghiệp.",
    emoji: "🏢",
    colorClass: "bg-primary",
    colorStyle: "hsl(var(--primary))",
  },
  {
    company: "GoPlay Tech",
    role: "Backend Developer (Remote)",
    period: "01/2026 – Hiện tại",
    description:
      "Phát triển các module ERP/CRM, thiết kế và xây dựng RESTful API, tham gia sprint planning và quy trình Agile trong môi trường làm việc từ xa.",
    emoji: "💼",
    colorClass: "bg-secondary",
    colorStyle: "hsl(var(--secondary))",
  },
  {
    company: "Enterprise Internship",
    role: "C# Backend Intern",
    period: "03/2025 – 05/2025",
    description:
      "Xây dựng microservices với C# .NET, áp dụng clean architecture, DDD (Domain-Driven Design) và CQRS pattern để tạo ra hệ thống backend có khả năng mở rộng cao.",
    emoji: "⚙️",
    colorClass: "bg-accent",
    colorStyle: "hsl(var(--accent))",
  },
  {
    company: "Java Internship",
    role: "Backend Java Intern",
    period: "09/2023 – 11/2023",
    description:
      "Phát triển RESTful API với Spring Boot, làm việc với MySQL, áp dụng Git workflow và học hỏi quy trình phát triển phần mềm trong môi trường doanh nghiệp.",
    emoji: "☕",
    colorClass: "bg-info",
    colorStyle: "hsl(var(--info))",
  },
  {
    company: "UTH",
    role: "Đại học Giao thông vận tải TP.HCM",
    period: "2022 – 2026",
    description:
      "Cử nhân Công nghệ thông tin, GPA 3.25/4.0. Luận văn tốt nghiệp về ứng dụng AI/RAG trong hệ thống thông tin. Tham gia nhiều câu lạc bộ kỹ thuật và cuộc thi lập trình.",
    emoji: "🎓",
    colorClass: "bg-destructive",
    colorStyle: "hsl(var(--destructive))",
  },
];

interface TimelineEntryProps {
  entry: (typeof timelineEntries)[number];
  index: number;
}

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  const variants = {
    hidden: {
      opacity: 0,
      x: isEven ? -60 : 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="relative flex items-start md:items-center w-full">
      {/* ── Mobile Layout (stack left) ── */}
      <div className="flex w-full md:hidden">
        {/* Left line + dot */}
        <div className="flex flex-col items-center mr-4">
          <div
            className="w-5 h-5 rounded-full border-[3px] border-foreground flex-shrink-0 z-10"
            style={{ background: entry.colorStyle }}
          />
          {index < timelineEntries.length - 1 && (
            <div className="w-[3px] flex-1 mt-1" style={{ background: "hsl(var(--foreground))" }} />
          )}
        </div>
        {/* Card */}
        <motion.div
          className="flex-1 mb-8 border-[3px] border-foreground bg-card p-4"
          style={{ boxShadow: "4px 4px 0 #000" }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
        >
          <CardContent entry={entry} />
        </motion.div>
      </div>

      {/* ── Desktop Layout (alternating) ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] w-full items-start gap-0">
        {/* Left side */}
        {isEven ? (
          <motion.div
            className="border-[3px] border-foreground bg-card p-5 mb-8 mr-4"
            style={{ boxShadow: "4px 4px 0 #000" }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
          >
            <CardContent entry={entry} />
          </motion.div>
        ) : (
          <div />
        )}

        {/* Center dot */}
        <div className="flex flex-col items-center">
          <div
            className="w-5 h-5 rounded-full border-[3px] border-foreground flex-shrink-0 z-10 mt-5"
            style={{ background: entry.colorStyle }}
          />
        </div>

        {/* Right side */}
        {!isEven ? (
          <motion.div
            className="border-[3px] border-foreground bg-card p-5 mb-8 ml-4"
            style={{ boxShadow: "4px 4px 0 #000" }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
          >
            <CardContent entry={entry} />
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function CardContent({ entry }: { entry: (typeof timelineEntries)[number] }) {
  return (
    <>
      {/* Badge row */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{entry.emoji}</span>
        <span
          className="text-xs font-extrabold uppercase tracking-widest px-2 py-0.5 border-[2px] border-foreground"
          style={{ background: entry.colorStyle }}
        >
          {entry.period}
        </span>
      </div>

      {/* Company */}
      <h3 className="text-lg font-extrabold text-foreground leading-tight">
        {entry.company}
      </h3>

      {/* Role */}
      <p className="text-sm font-bold text-muted-foreground mb-2">{entry.role}</p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {entry.description}
      </p>
    </>
  );
}

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true });
  const { t } = useLang();

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-20 px-4 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="inline-block mb-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-[2px] border-foreground"
            style={{ background: "hsl(var(--secondary))" }}
          >
            Experience
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          {t.timeline.title} 🚀
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          {t.timeline.subtitle}
        </p>
      </motion.div>

      {/* Timeline container */}
      <div className="relative">
        {/* Vertical line — desktop (center) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2"
          style={{ background: "hsl(var(--foreground))" }}
        />

        {/* Vertical line — mobile (left) */}
        <div
          className="md:hidden absolute left-[9px] top-0 bottom-0 w-[3px]"
          style={{ background: "hsl(var(--foreground))" }}
        />

        {/* Entries */}
        <div className="relative z-10">
          {timelineEntries.map((entry, index) => (
            <TimelineEntry key={entry.company + entry.period} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
