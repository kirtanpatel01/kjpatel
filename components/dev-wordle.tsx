"use client";

import { motion } from "motion/react";
import React, { useState, useCallback, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const TECH_WORDS = [
  "REACT", "ASYNC", "FETCH", "BUILD", "STATE", "PROPS", "HOOKS", "REDUX",
  "LINUX", "CACHE", "QUERY", "ROUTE", "TOKEN", "PIXEL", "DEBUG", "STACK",
  "SWIFT", "NGINX", "OAUTH", "CLOUD", "HTTPS", "TYPES", "REGEX", "ARRAY",
  "FLOAT", "BYTES", "PROXY", "MACRO", "SHELL", "THEME", "SCOPE", "TRAIT",
  "MERGE", "PATCH", "AWAIT", "GRAPH", "REDIS", "MONGO", "MYSQL", "KAFKA",
  "ERROR", "INDEX", "CLASS", "CONST", "YIELD", "SUPER", "THROW", "LOGIC",
  "VALID", "FALSE", "MEDIA", "AUDIO", "VIDEO", "MOUNT", "CHUNK", "IMAGE",
  "MODEL", "PANEL", "TABLE", "MOUSE", "CLICK", "FOCUS", "HOVER", "LOCAL",
  "TRACK", "TRACE", "STORE", "SLICE", "NODES", "LINKS", "FONTS", "ICONS"
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

type GameStatus = "playing" | "won" | "lost";

export function DevWordle({ large = false }: { large?: boolean } = {}) {
  const [solution, setSolution] = useState(() => 
    TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)]
  );
  
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setSolution(TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    containerRef.current?.focus();
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (gameStatus !== "playing") return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (e.key === "Enter") {
        if (currentGuess.length === WORD_LENGTH) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          
          if (currentGuess === solution) {
            setGameStatus("won");
          } else if (newGuesses.length >= MAX_GUESSES) {
            setGameStatus("lost");
          }
          setCurrentGuess("");
        }
      } else if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentGuess.length < WORD_LENGTH) {
          setCurrentGuess((prev) => (prev + e.key).toUpperCase());
        }
      }
    },
    [currentGuess, gameStatus, guesses, solution]
  );

  const getRowStates = (guess: string) => {
    const states: ("correct" | "present" | "absent")[] = Array(WORD_LENGTH).fill("absent");
    const solutionChars = solution.split("");
    const guessChars = guess.split("");

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessChars[i] === solutionChars[i]) {
        states[i] = "correct";
        solutionChars[i] = "";
        guessChars[i] = "";
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessChars[i] !== "" && solutionChars.includes(guessChars[i])) {
        states[i] = "present";
        solutionChars[solutionChars.indexOf(guessChars[i])] = "";
      }
    }
    return states;
  };

  const isPlaying = gameStatus === "playing" && guesses.length > 0;

  return (
    <motion.div
      ref={containerRef}
      drag={!large}
      dragMomentum={false}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => containerRef.current?.focus()}
      onMouseLeave={() => containerRef.current?.blur()}
      className={cn(
        "relative overflow-hidden bg-background/80 backdrop-blur-xs select-none border transition-colors focus:outline-none mx-auto",
        isPlaying ? "border-border/50" : "border-transparent",
        large ? "p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md shadow-sm border-border/20 cursor-default" : "p-2 rounded-lg w-[160px] cursor-grab active:cursor-grabbing"
      )}
    >
      <div className={cn("flex items-center justify-between text-muted-foreground", large ? "pb-6 px-1" : "pb-1.5 px-0.5 text-[11px]")}>
        <span className={cn("font-semibold tracking-wider text-foreground", large ? "text-lg sm:text-xl" : "text-[10px]")}>
          Dev Wordle
        </span>
        <div className="flex items-center gap-1.5">
          {gameStatus === "won" && <span className={cn("text-emerald-500 font-semibold", large ? "text-base" : "text-[10px]")}>Won!</span>}
          {gameStatus === "lost" && <span className={cn("text-destructive font-semibold", large ? "text-base" : "text-[10px]")}>{solution}</span>}
          <button
            type="button"
            onClick={resetGame}
            aria-label="Reset game"
            className={cn("relative flex items-center justify-center p-0.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95", large ? "" : "after:absolute after:-inset-1.5 after:content-['']")}
          >
            <RotateCcw className={cn(large ? "w-5 h-5 ml-2" : "w-3.5 h-3.5")} />
          </button>
        </div>
      </div>

      <div className={cn("flex flex-col items-center", large ? "gap-2 mb-4" : "gap-1 mb-1")}>
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const isPastRow = rowIndex < guesses.length;
          const guess = isPastRow ? guesses[rowIndex] : isCurrentRow ? currentGuess : "";
          const states = isPastRow ? getRowStates(guess) : [];

          return (
            <div key={rowIndex} className={cn("flex w-full justify-center", large ? "gap-2" : "gap-1")}>
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const char = guess[colIndex] || "";
                const state = states[colIndex];
                
                return (
                  <div
                    key={colIndex}
                    className={cn(
                      "flex items-center justify-center font-bold uppercase transition-colors",
                      large ? "w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl rounded-md" : "w-6 h-6 text-xs rounded-[2px]",
                      !isPastRow && "border border-border/40 text-foreground bg-transparent",
                      state === "correct" && "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
                      state === "present" && "bg-amber-500/10 text-amber-500 border border-amber-500/20",
                      state === "absent" && "bg-muted/40 text-muted-foreground border border-border/20",
                      isCurrentRow && char && "border-primary/50 text-foreground"
                    )}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      
      <div className={cn("text-center mt-1", large ? "text-xs sm:text-sm text-muted-foreground/80 mt-6" : "text-[9px] text-muted-foreground/50 mb-0.5")}>
        {gameStatus === "playing" ? "Type to play" : "Press reset to play again"}
      </div>
    </motion.div>
  );
}

export default DevWordle;
