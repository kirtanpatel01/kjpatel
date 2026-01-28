"use client";

export default function Skills() {
  const skills = [
    "REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "TAILWIND", "SUPABASE", "MONGODB", "DESIGN ENGINEERING"
  ];
  
  // Duplicating for seamless loop
  const marqueeItems = [...skills, ...skills, ...skills, ...skills];

  return (
    <section id="skills" className="py-24 border-t border-border overflow-hidden">
       <div className="mb-12">
           <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">02 / Expertise</h2>
       </div>

       <div className="relative flex w-full overflow-hidden select-none">
         <div className="animate-marquee whitespace-nowrap py-4">
           {marqueeItems.map((item, i) => (
             <span key={i} className="inline-block mx-8 text-6xl sm:text-8xl font-black text-foreground/10 tracking-tighter uppercase hover:text-foreground hover:scale-105 transition-all duration-300 cursor-default">
               {item}
             </span>
           ))}
         </div>
         <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-4">
           {marqueeItems.map((item, i) => (
             <span key={i} className="inline-block mx-8 text-6xl sm:text-8xl font-black text-foreground/10 tracking-tighter uppercase hover:text-foreground hover:scale-105 transition-all duration-300 cursor-default">
               {item}
             </span>
           ))}
         </div>
       </div>

       {/* Inline Styles for the marquee animation to ensure no config dependencies */}
       <style jsx>{`
         .animate-marquee {
           animation: marquee 120s linear infinite;
         }
         .animate-marquee2 {
           animation: marquee2 120s linear infinite;
         }
         @keyframes marquee {
           0% { transform: translateX(0%); }
           100% { transform: translateX(-100%); }
         }
         @keyframes marquee2 {
           0% { transform: translateX(100%); }
           100% { transform: translateX(0%); }
         }
       `}</style>
    </section>
  );
}