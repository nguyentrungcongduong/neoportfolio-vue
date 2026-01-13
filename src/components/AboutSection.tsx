import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import { Code, Palette, Zap, Coffee } from "lucide-react";

const AboutSection = () => {
  const skills = [
    { name: "React", variant: "primary" as const },
    { name: "TypeScript", variant: "info" as const },
    { name: "Tailwind CSS", variant: "accent" as const },
    { name: "Next.js", variant: "secondary" as const },
    { name: "Node.js", variant: "primary" as const },
    { name: "Figma", variant: "secondary" as const },
    { name: "Git", variant: "info" as const },
    { name: "REST API", variant: "accent" as const },
  ];

  const stats = [
    { icon: Code, label: "Projects", value: "50+", color: "bg-primary" },
    { icon: Coffee, label: "Cups of Coffee", value: "999+", color: "bg-secondary" },
    { icon: Palette, label: "Designs", value: "100+", color: "bg-accent" },
    { icon: Zap, label: "Years Exp", value: "5+", color: "bg-info" },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            About <span className="bg-accent px-2 inline-block transform rotate-1">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate developer who loves creating beautiful and functional web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <NeoCard className="space-y-4">
            <h3 className="text-2xl font-bold">Who I Am</h3>
            <p className="text-lg leading-relaxed">
              I'm a <span className="bg-primary px-1">frontend developer</span> with a passion for 
              creating engaging user experiences. With over 5 years of experience, I specialize 
              in building modern web applications using React and TypeScript.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, 
              contributing to open-source projects, or enjoying a good cup of coffee ☕
            </p>
          </NeoCard>

          <NeoCard variant="primary" className="space-y-4">
            <h3 className="text-2xl font-bold">My Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <NeoBadge key={skill.name} variant={skill.variant}>
                  {skill.name}
                </NeoBadge>
              ))}
            </div>
          </NeoCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <NeoCard key={stat.label} className={`${stat.color} text-center`}>
              <stat.icon size={32} className="mx-auto mb-2" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium uppercase">{stat.label}</div>
            </NeoCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
