"use client";

import { motion } from "motion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_SIZE = 15;
const CELL_SIZE = 9; // 9px per cell * 15 = 135px + border = ~137px. Fits nicely in 144px inner space.

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const INITIAL_DIRECTION: Direction = "UP";
const SPEED = 120; // ms per tick

const generateInitialSnake = (size: number): Point[] => {
  const min = Math.floor(size * 0.25);
  const max = Math.floor(size * 0.75);
  const range = max - min;
  
  const headX = Math.floor(Math.random() * range) + min;
  const headY = Math.floor(Math.random() * range) + min;

  return [
    { x: headX, y: headY },
    { x: headX, y: headY + 1 },
    { x: headX, y: headY + 2 },
  ];
};

export function Snake({ large = false }: { large?: boolean } = {}) {
  const gridSize = large ? 35 : GRID_SIZE;
  const cellSize = CELL_SIZE; // Always keep the snake tiny!

  const [snake, setSnake] = useState<Point[]>(() => generateInitialSnake(gridSize));
  const [food, setFood] = useState<Point>({ x: 3, y: 3 });
  const [status, setStatus] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState(0);

  const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      // eslint-disable-next-line no-loop-func
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, [gridSize]);

  const resetGame = () => {
    const newSnake = generateInitialSnake(gridSize);
    setSnake(newSnake);
    nextDirectionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setFood(generateFood(newSnake));
    setStatus("idle");
    containerRef.current?.focus();
  };

  const startGame = useCallback(() => {
    if (status === "idle" || status === "gameover") {
      const newSnake = generateInitialSnake(gridSize);
      setSnake(newSnake);
      nextDirectionRef.current = INITIAL_DIRECTION;
      setScore(0);
      setFood(generateFood(newSnake));
      setStatus("playing");
    } else if (status === "paused") {
      setStatus("playing");
    }
  }, [status, generateFood, gridSize]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D", "8", "4", "2", "6"].includes(e.key) &&
        status === "playing"
      ) {
        e.preventDefault();
      }

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (e.key === " ") {
        if (status === "gameover" || status === "idle") {
          const newSnake = generateInitialSnake(gridSize);
          setSnake(newSnake);
          nextDirectionRef.current = INITIAL_DIRECTION;
          setScore(0);
          setFood(generateFood(newSnake));
          setStatus("playing");
        } else if (status === "playing") {
          setStatus("paused");
        } else if (status === "paused") {
          setStatus("playing");
        }
        return;
      }

      const currentDir = nextDirectionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
        case "8":
          if (currentDir !== "DOWN") nextDirectionRef.current = "UP";
          if (status !== "playing") startGame();
          break;
        case "ArrowDown":
        case "s":
        case "S":
        case "2":
          if (currentDir !== "UP") nextDirectionRef.current = "DOWN";
          if (status !== "playing") startGame();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
        case "4":
          if (currentDir !== "RIGHT") nextDirectionRef.current = "LEFT";
          if (status !== "playing") startGame();
          break;
        case "ArrowRight":
        case "d":
        case "D":
        case "6":
          if (currentDir !== "LEFT") nextDirectionRef.current = "RIGHT";
          if (status !== "playing") startGame();
          break;
      }
    },
    [status, startGame, generateFood, gridSize]
  );

  useEffect(() => {
    if (status !== "playing") return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const dir = nextDirectionRef.current;

        const newHead = { ...head };
        if (dir === "UP") newHead.y -= 1;
        if (dir === "DOWN") newHead.y += 1;
        if (dir === "LEFT") newHead.x -= 1;
        if (dir === "RIGHT") newHead.x += 1;

        if (
          newHead.x < 0 ||
          newHead.x >= gridSize ||
          newHead.y < 0 ||
          newHead.y >= gridSize
        ) {
          setStatus("gameover");
          return prevSnake;
        }

        if (
          prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setStatus("gameover");
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, SPEED);
    return () => clearInterval(interval);
  }, [status, food, generateFood, gridSize]);

  const isPlaying = status === "playing";

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
        "relative select-none outline-none mx-auto",
        large ? "w-fit" : "overflow-hidden p-2 rounded-lg bg-background/80 backdrop-blur-xs border transition-colors w-[160px] cursor-grab active:cursor-grabbing",
        !large && isPlaying ? "border-border/50" : (!large ? "border-transparent" : "")
      )}
    >
      {!large && (
        <div className="flex items-center justify-between text-muted-foreground pb-1.5 px-0.5 text-[11px]">
          <span className="font-semibold tracking-wider text-foreground text-[10px]">
            Snake
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-foreground/80 font-semibold text-[10px]">
              {score}
            </span>
            <button
              type="button"
              onClick={resetGame}
              aria-label="Reset game"
              className="relative flex items-center justify-center p-0.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95 after:absolute after:-inset-1.5 after:content-['']"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div
        className={cn("relative bg-muted/10 border mx-auto overflow-hidden shadow-inner", large ? "rounded-xl border-border/20" : "border-border/40 rounded-[2px]")}
        style={{ width: gridSize * cellSize, height: gridSize * cellSize }}
      >
        <div
          className={cn("absolute bg-destructive shadow-sm", large ? "rounded-[2px]" : "rounded-[2px]")}
          style={{
            width: cellSize - 1,
            height: cellSize - 1,
            left: food.x * cellSize + 0.5,
            top: food.y * cellSize + 0.5,
          }}
        />

        {snake.map((segment, idx) => {
          const isHead = idx === 0;
          return (
            <div
              key={`${segment.x}-${segment.y}-${idx}`}
              className={cn(
                "absolute rounded-[2px]",
                isHead ? "bg-emerald-500 z-10" : "bg-emerald-500/70"
              )}
              style={{
                width: cellSize - 1,
                height: cellSize - 1,
                left: segment.x * cellSize + 0.5,
                top: segment.y * cellSize + 0.5,
              }}
            />
          );
        })}

        {status === "idle" && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className={cn("font-medium text-foreground", large ? "text-sm" : "text-[10px]")}>
              Press Space
            </span>
          </div>
        )}

        {status === "paused" && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className={cn("font-bold text-foreground", large ? "text-lg" : "text-[10px]")}>
              Paused
            </span>
          </div>
        )}

        {status === "gameover" && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-20 space-y-1 sm:space-y-2">
            <span className={cn("font-bold text-destructive", large ? "text-xl" : "text-[10px]")}>
              Game Over
            </span>
            {large && (
              <span className="text-sm font-medium text-muted-foreground">
                Score: {score} &bull; Press Space
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className={cn("flex justify-between items-center ", large ? "text-xs text-muted-foreground/60 mt-3 px-1" : "text-[9px] text-muted-foreground/50 mt-1 mb-0.5")}>
        <span>{(status === "playing" || status === "paused") ? "Space to Pause/Play" : "Use WASD or Arrows"}</span>
        {large && (status === "playing" || status === "paused") && (
          <span className="font-bold text-foreground/80 text-sm">Score: {score}</span>
        )}
      </div>
    </motion.div>
  );
}

export default Snake;
