import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    label: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "React/Next.js", level: 85 },
      { name: "Vue.js", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    label: "Backend",
    emoji: "⚙️",
    skills: [
      { name: "Java/Spring Boot", level: 82 },
      { name: "Node.js/Express", level: 78 },
      { name: "PHP/Laravel", level: 75 },
      { name: "Python/FastAPI", level: 70 },
    ],
  },
  {
    label: "Database",
    emoji: "🗄️",
    skills: [
      { name: "MySQL/PostgreSQL", level: 82 },
      { name: "Redis", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "Qdrant (Vector DB)", level: 60 },
    ],
  },
  {
    label: "DevOps",
    emoji: "🚀",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Git/GitHub", level: 88 },
      { name: "AWS EC2", level: 65 },
      { name: "Linux/CLI", level: 72 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

function SkillBar({ name, level, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm text-foreground">{name}</span>
        <span
          className="text-xs font-extrabold px-2 py-0.5 border-[2px] border-foreground"
          style={{ background: "hsl(var(--primary))" }}
        >
          {level}%
        </span>
      </div>
      <div
        className="w-full h-[12px] border-2 border-foreground overflow-hidden"
        style={{ background: "hsl(var(--muted))" }}
      >
        <motion.div
          className="h-full border-r-2 border-foreground"
          style={{ background: "hsl(var(--primary))" }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${level}%` } : { width: "0%" }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
}

interface SkillGroupCardProps {
  label: string;
  emoji: string;
  skills: { name: string; level: number }[];
  index: number;
}

function SkillGroupCard({ label, emoji, skills, index }: SkillGroupCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="border-[3px] border-foreground p-5 bg-card"
      style={{ boxShadow: "4px 4px 0 #000" }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2 border-b-[2px] border-foreground pb-2">
        <span className="text-xl">{emoji}</span>
        {label}
      </h3>
      {skills.map((skill, skillIndex) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={skillIndex}
        />
      ))}
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-block mb-3">
          <span
            className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 border-[2px] border-foreground"
            style={{ background: "hsl(var(--accent))" }}
          >
            Skills
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
          Kỹ năng 💻
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Các công nghệ và công cụ tôi sử dụng để xây dựng sản phẩm — từ
          frontend đến backend, database và DevOps.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillGroups.map((group, index) => (
          <SkillGroupCard
            key={group.label}
            label={group.label}
            emoji={group.emoji}
            skills={group.skills}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
