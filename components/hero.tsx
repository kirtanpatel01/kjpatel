"use client";
import React, { useRef, useEffect, useState, JSX } from "react";
import { motion } from "framer-motion";

const GRID_SIZE = 120; // spacing between grid lines

function Sparks() {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      const rect = ref.current!.getBoundingClientRect();
      setDims({ width: rect.width, height: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sparks: JSX.Element[] = [];

  const cols = Math.floor(dims.width / GRID_SIZE);
  const rows = Math.floor(dims.height / GRID_SIZE);

  // Helper to randomize motion parameters
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  // Vertical sparks (move up ↕ down randomly)
  for (let i = 0; i <= cols; i++) {
    const x = i * GRID_SIZE;
    const duration = rand(2, 5); // random speed
    const delay = rand(0, 3); // random start offset
    const direction = Math.random() > 0.5 ? 1 : -1; // random direction start

    sparks.push(
      <motion.div
        key={`v-${i}`}
        className="absolute w-0.5 dark:w-px h-0.5 dark:h-px rounded-full bg-cyan-700 dark:bg-cyan-400 shadow-[0_0_4px_0.5px_rgba(34,211,238,0.9)] animate-pulse"
        style={{ left: x, top: direction === 1 ? 0 : dims.height - 8 }}
        animate={{ y: direction === 1 ? [0, dims.height - 8] : [dims.height - 8, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    );
  }

  // Horizontal sparks (move left ↔ right randomly)
  for (let i = 0; i <= rows; i++) {
    const y = i * GRID_SIZE;
    const duration = rand(2, 5); // random speed
    const delay = rand(0, 3);
    const direction = Math.random() > 0.5 ? 1 : -1;

    sparks.push(
      <motion.div
        key={`h-${i}`}
        className="absolute w-0.5 dark:w-px h-0.5 dark:h-px rounded-full bg-cyan-700 dark:bg-cyan-400 shadow-[0_0_4px_0.5px_rgba(34,211,238,0.9)] animate-pulse"
        style={{ top: y, left: direction === 1 ? 0 : dims.width - 8 }}
        animate={{ x: direction === 1 ? [0, dims.width - 8] : [dims.width - 8, 0] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 z-10 pointer-events-none">
      {sparks}
    </div>
  );
}

export default function Hero() {
  return (
    <div className="min-h-[calc(100vh)] bg-foreground p-4 flex justify-center items-center">
      <div className="relative h-[calc(100vh-2rem)] w-full flex justify-center items-center bg-background border border-[color:var(--border)] rounded-3xl overflow-hidden">

        {/* Grid background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_0.5px,transparent_0.8px),linear-gradient(to_bottom,var(--foreground)_0.5px,transparent_0.8px)] bg-[size:10px_10px] opacity-2 z-0 pointer-events-none"
        ></div>

        {/* Motion sparks */}
        <Sparks />

        {/* Text */}
        <h1 className="relative text-9xl font-black hover:text-teal-400 z-20">
          KJ_PATEL
        </h1>
      </div>
    </div>
  );
}
