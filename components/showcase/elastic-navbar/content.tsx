import React from "react";
import CodeShowcase from "@/components/code-showcase";
import { elasticNavbarCode, elasticNavbarFiles } from "@/components/showcase/elastic-navbar/data";
import ElasticNavbar from "@/components/showcase/elastic-navbar/code";

export function ElasticNavbarContent() {
  const [stiffness, setStiffness] = React.useState(250);
  const [damping, setDamping] = React.useState(35);
  const [mass, setMass] = React.useState(2);

  const resetValues = () => {
    setStiffness(250);
    setDamping(35);
    setMass(2);
  };

  // Dynamic code update for navbar.tsx snippet
  const dynamicCodeMapping = {
    ...elasticNavbarCode,
    "components/navbar.tsx": {
      ...elasticNavbarCode["components/navbar.tsx"],
      code: elasticNavbarCode["components/navbar.tsx"].code.replace(
        /stiffness: \d+,/g, `stiffness: ${stiffness},`
      ).replace(
        /damping: \d+,/g, `damping: ${damping},`
      ).replace(
        /mass: (\d+\.?\d*)/g, `mass: ${mass}`
      )
    }
  };

  return (
    <div className="flex flex-col gap-16 max-w-5xl mx-auto pb-40">
      {/* --- Spring Tweak Laboratory --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start py-12 border-y border-dashed w-full">
        <div className="flex flex-col gap-6">
          <h2 className="font-medium uppercase tracking-widest text-muted-foreground/60 text-sm">Spring Physics Guide</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Unlike standard ease curves, <strong>Spring Animations</strong> use physical properties to calculate movement. 
              This makes the UI feel "elastic" and reactive to natural movement.
            </p>
            <ul className="space-y-4 pt-2">
              <li className="flex flex-col gap-1 text-sm">
                <span className="text-foreground font-medium underline decoration-dashed decoration-1 underline-offset-4 decoration-primary/30">Stiffness:</span>
                <p>How fast the spring snaps back. Higher values mean more tension and a faster response. Lower values feel "lazy."</p>
              </li>
              <li className="flex flex-col gap-1 text-sm">
                <span className="text-foreground font-medium underline decoration-dashed decoration-1 underline-offset-4 decoration-primary/30">Damping:</span>
                <p>The friction. This controls how much the highlight bounces. Lower damping makes it oscillate longer (the classic "elastic" look).</p>
              </li>
              <li className="flex flex-col gap-1 text-sm">
                <span className="text-foreground font-medium underline decoration-dashed decoration-1 underline-offset-4 decoration-primary/30">Mass:</span>
                <p>The object&apos;s weight. Increasing mass makes it feel heavier, requiring more momentum to start and stop.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 border border-dashed rounded-3xl bg-accent/5 flex flex-col gap-10">
          <div className="flex items-center justify-between border-b border-dashed pb-4 mb-2">
             <span className="font-medium uppercase tracking-tighter text-muted-foreground text-xs opacity-50">Tweak Parameters</span>
             <button 
               onClick={resetValues}
               className="text-[10px] uppercase font-mono tracking-widest px-2 py-1 border border-dashed rounded hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
             >
               Reset to Default
             </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-foreground tracking-tight border-b border-dashed border-primary/20">Stiffness</label>
              <span className="font-mono text-xs text-muted-foreground px-2 py-1 bg-background border border-dashed rounded-md">{stiffness}</span>
            </div>
            <input 
              type="range" min="1" max="1000" step="10" 
              value={stiffness} onChange={(e) => setStiffness(Number(e.target.value))}
              className="w-full h-2 bg-transparent border border-dashed rounded appearance-none cursor-pointer accent-foreground" 
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-foreground tracking-tight border-b border-dashed border-primary/20">Damping</label>
              <span className="font-mono text-xs text-muted-foreground px-2 py-1 bg-background border border-dashed rounded-md">{damping}</span>
            </div>
            <input 
              type="range" min="1" max="100" step="1" 
              value={damping} onChange={(e) => setDamping(Number(e.target.value))}
              className="w-full h-2 bg-transparent border border-dashed rounded appearance-none cursor-pointer accent-foreground" 
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-foreground tracking-tight border-b border-dashed border-primary/20">Mass</label>
              <span className="font-mono text-xs text-muted-foreground px-2 py-1 bg-background border border-dashed rounded-md">{mass}</span>
            </div>
            <input 
              type="range" min="0.1" max="10" step="0.1" 
              value={mass} onChange={(e) => setMass(Number(e.target.value))}
              className="w-full h-2 bg-transparent border border-dashed rounded appearance-none cursor-pointer accent-foreground" 
            />
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        <CodeShowcase
          fileData={elasticNavbarFiles}
          codeMapping={dynamicCodeMapping}
          previewComponent={<ElasticNavbar stiffness={stiffness} damping={damping} mass={mass} />}
          defaultFilePath="components/navbar.tsx"
          defaultFileNode={{ name: "navbar.tsx", type: "file" }}
        />
      </div>
    </div>
  );
}
