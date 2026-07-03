import { Check, Copy } from "lucide-react";
import Link from "next/link";
import React from "react";
import CodeBlock from "@/components/code-block";
import CodeShowcase from "@/components/code-showcase";
import CodeText from "@/components/code-text";
import { SectionContainer } from "@/components/responsive-wrappers";
import ElasticNavbar from "@/components/showcase/elastic-navbar/code";
import {
  elasticNavbarCode,
  elasticNavbarFiles,
} from "@/components/showcase/elastic-navbar/data";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ElasticNavbarContent() {
  const [stiffness, setStiffness] = React.useState(250);
  const [damping, setDamping] = React.useState(35);
  const [mass, setMass] = React.useState(2);
  const [activePreset, setActivePreset] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const presets = {
    snap: { stiffness: 600, damping: 45, mass: 1, label: "Snap" },
    jello: { stiffness: 200, damping: 8, mass: 1, label: "Jello" },
    heavy: { stiffness: 100, damping: 40, mass: 6, label: "Heavyweight" },
  };

  const springGuide = [
    {
      title: "Stiffness",
      desc: 'How fast the spring snaps back. Higher values mean more tension and a faster response. Lower values feel "lazy."',
      href: "https://motion.dev/docs/react-transitions#stiffness",
    },
    {
      title: "Damping",
      desc: "The friction. This controls how much the highlight bounces. Lower damping makes it oscillate longer.",
      href: "https://motion.dev/docs/react-transitions#damping",
    },
    {
      title: "Mass",
      desc: "The object's weight. Increasing mass makes it feel heavier, requiring more momentum to start and stop.",
      href: "https://motion.dev/docs/react-transitions#mass",
    },
  ];

  const controls = [
    {
      label: "Stiffness",
      value: stiffness,
      setter: setStiffness,
      min: 1,
      max: 1000,
      step: 10,
    },
    {
      label: "Damping",
      value: damping,
      setter: setDamping,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      label: "Mass",
      value: mass,
      setter: setMass,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  ];

  const applyPreset = (preset: keyof typeof presets) => {
    setStiffness(presets[preset].stiffness);
    setDamping(presets[preset].damping);
    setMass(presets[preset].mass);
    setActivePreset(preset);
  };

  const resetValues = () => {
    setStiffness(250);
    setDamping(35);
    setMass(2);
    setActivePreset(null);
  };

  const copyTransition = () => {
    const text = `transition={{ 
  type: "spring", 
  stiffness: ${stiffness}, 
  damping: ${damping}, 
  mass: ${mass} 
}}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic code update for navbar.tsx snippet
  const dynamicCodeMapping = {
    ...elasticNavbarCode,
    "components/navbar.tsx": {
      ...elasticNavbarCode["components/navbar.tsx"],
      code: elasticNavbarCode["components/navbar.tsx"].code
        .replace(/stiffness: \d+,/g, `stiffness: ${stiffness},`)
        .replace(/damping: \d+,/g, `damping: ${damping},`)
        .replace(/mass: (\d+\.?\d*)/g, `mass: ${mass}`),
    },
  };

  const transitionString = `transition={{ 
  type: "spring", 
  stiffness: ${stiffness}, 
  damping: ${damping}, 
  mass: ${mass} 
}}`;

  return (
    <div className="flex flex-col">
      {/* --- Spring Tweak Laboratory --- */}
      <SectionContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
        <div className="flex flex-col gap-4 pr-6">
          <h2 className="font-medium tracking-widest text-xs">
            Spring Animation Guide
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Using{" "}
              <Link
                href={"https://motion.dev/docs/react"}
                target="_blank"
                className="text-primary underline underline-offset-2"
              >
                Motion React
              </Link>{" "}
              we can easily configure spring animation. So spring animation is
              basically a type of animation which gives you bouncy effect.
            </p>
            <p>
              There&apos;re two different way of configuring{" "}
              <Link
                className="text-primary underline underline-offset-2"
                href="https://motion.dev/docs/react-transitions#spring"
                target="_blank"
              >
                Spring
              </Link>{" "}
              animation:
              <ol className="list-decimal list-inside pl-4">
                <li>
                  Time: In this we can use <CodeText>bounce</CodeText> and{" "}
                  <CodeText>duration</CodeText>.
                </li>
                <li>
                  Physics: In this we can use <CodeText>stiffness</CodeText>,{" "}
                  <CodeText>damping</CodeText> and <CodeText>mass</CodeText>.
                </li>
              </ol>
            </p>
            <p>
              In this specific example we&apos;ll go with physics way b&apos;coz
              it gives you more control over the animation.
            </p>
            <ul className="space-y-3 pt-2">
              {springGuide.map((item) => (
                <li key={item.title} className="flex flex-col gap-1 group">
                  <Link
                    href={item.href}
                    target="_blank"
                    className="font-semibold text-primary underline underline-offset-2"
                  >
                    {item.title}:
                  </Link>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
            <p>
              There&apos;re more than this you can check{" "}
              <Link
                href="https://motion.dev/docs/react-transitions#velocity"
                target="_blank"
                className="text-primary underline underline-offset-2"
              >
                here
              </Link>
              . Below is the practical example of spring animation which I
              discussed ealier.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-secondary/20 flex flex-col gap-4 shadow-sm shadow-primary/20 h-fit">
          <div className="flex items-start justify-between border-b pb-4">
            <div className="flex flex-col gap-0.5">
              {/* <h3 className="font-semibold tracking-widest text-foreground">
                Tweak
              </h3> */}
              <p className="text-sm text-muted-foreground">
                Play with the values, <br /> See effect in below preview
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={copyTransition}
                    variant={"ghost"}
                    size={"icon-sm"}
                  >
                    {copied ? <Check className="text-primary" /> : <Copy />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className=" overflow-hidden">
                  <CodeBlock
                    language="tsx"
                    code={transitionString}
                    showLineNumbers={false}
                  />
                </TooltipContent>
              </Tooltip>
              <Button onClick={resetValues} variant={"secondary"}>
                Reset
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-semibold text-sm tracking-widest /50">
              Presets
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(presets) as Array<keyof typeof presets>).map(
                (key) => (
                  <Button
                    key={key}
                    onClick={() => applyPreset(key)}
                    variant={"outline"}
                    className={`text-sm cursor-pointer
                      ${
                        activePreset === key
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    `}
                  >
                    {presets[key].label}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {controls.map((control) => (
              <div key={control.label} className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="font-bold text-foreground">
                    {control.label}
                  </label>
                  <span className=" px-2 py-0.5 bg-background border rounded-md font-bold">
                    {control.value}
                  </span>
                </div>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={control.value}
                  onChange={(e) => {
                    control.setter(Number(e.target.value));
                    setActivePreset(null);
                  }}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="w-full h-full">
        <CodeShowcase
          fileData={elasticNavbarFiles}
          codeMapping={dynamicCodeMapping}
          previewComponent={
            <ElasticNavbar
              stiffness={stiffness}
              damping={damping}
              mass={mass}
            />
          }
          defaultFilePath="components/navbar.tsx"
          defaultFileNode={{ name: "navbar.tsx", type: "file" }}
        />
      </SectionContainer>
    </div>
  );
}
