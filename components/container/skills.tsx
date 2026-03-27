"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import Container from "../container";
import SectionHeading from "../section-heading";

interface Skill {
  name: string;
  color: string;
  icon?: string;
  image?: string;
}

const skills: Skill[] = [
  { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "#3178c6" },
  { name: "React.js", icon: "devicon-react-original colored", color: "#61dafb" },
  { name: "Next.js", icon: "devicon-nextjs-plain colored", color: "#444444" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored", color: "#06b6d4" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", color: "#339933" },
  { name: "Express.js", icon: "devicon-express-original colored", color: "#444444" },
  { name: "Supabase", icon: "devicon-supabase-plain colored", color: "#3ecf8e" },
  { name: "DrizzleORM", image: "/logos/drizzle.svg", color: "#c5f74f" },
  { name: "NeonDB", image: "/logos/neon.svg", color: "#00e0d9" },
  // { name: "TanStack Start", image: "/logos/tanstack.svg", color: "#ffb000" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", color: "#47a248" },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic Pull Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the "weighted" feel
  const springX = useSpring(x, { damping: 20, stiffness: 150 });
  const springY = useSpring(y, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Subtle pull (divide by a larger number for less intensity)
    x.set((e.clientX - centerX) / 4);
    y.set((e.clientY - centerY) / 4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-40 sm:h-52 border-r border-b border-border p-6 flex flex-col items-center justify-center gap-4 hover:bg-secondary/10 transition-colors duration-300"
    >
      <span className="absolute top-4 left-4 text-[10px] font-mono text-muted-foreground/30">
        {(index + 1).toString().padStart(2, '0')}
      </span>

      <motion.div 
        style={{ x: springX, y: springY }}
        className="relative flex items-center justify-center pointer-events-none"
      >
        {skill.icon ? (
          <i className={`${skill.icon} text-4xl`} />
        ) : skill.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={skill.image} alt={skill.name} className="w-9 h-9" />
        ) : null}
      </motion.div>

      <h3 className="text-sm font-bold tracking-tight text-foreground/70 text-center mt-2">
        {skill.name}
      </h3>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <Container id="skills">
      <SectionHeading>03 / Skills</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-border mt-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </Container>
  );
}
