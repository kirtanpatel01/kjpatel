"use client";

import confetti from "canvas-confetti";
import { motion } from "motion/react";
import React, { useState, useRef, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Player = "X" | "O";
type BoardState = (Player | null)[];

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const CELL_LABELS = [
  "Top left",
  "Top center",
  "Top right",
  "Middle left",
  "Center",
  "Middle right",
  "Bottom left",
  "Bottom center",
  "Bottom right",
];

function checkWinner(board: BoardState): {
  winner: Player | "draw" | null;
  line?: number[];
} {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "draw" };
  }
  return { winner: null };
}

function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
): number {
  const result = checkWinner(board);
  if (result.winner === "O") return 10 - depth;
  if (result.winner === "X") return depth - 10;
  if (result.winner === "draw") return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function getBestMove(board: BoardState): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

type Difficulty = "easy" | "medium" | "hard";
const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

function getAvailableMoves(board: BoardState): number[] {
  const moves: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) moves.push(i);
  }
  return moves;
}

function getRandomMove(board: BoardState): number {
  const available = getAvailableMoves(board);
  if (available.length === 0) return -1;
  return available[Math.floor(Math.random() * available.length)];
}

function getMoveByDifficulty(board: BoardState, difficulty: Difficulty): number {
  const available = getAvailableMoves(board);
  if (available.length === 0) return -1;

  if (difficulty === "easy") {
    // Easy: 80% random mistakes, 20% optimal
    return Math.random() < 0.8 ? getRandomMove(board) : getBestMove(board);
  }

  if (difficulty === "medium") {
    // Medium:
    // 1. Take immediate win if available
    for (const move of available) {
      board[move] = "O";
      const isWin = checkWinner(board).winner === "O";
      board[move] = null;
      if (isWin) return move;
    }

    // 2. Block player's immediate win (65% chance, 35% blunder)
    for (const move of available) {
      board[move] = "X";
      const isPlayerWin = checkWinner(board).winner === "X";
      board[move] = null;
      if (isPlayerWin) {
        if (Math.random() < 0.65) return move;
      }
    }

    // 3. Otherwise 50% optimal, 50% random
    return Math.random() < 0.5 ? getBestMove(board) : getRandomMove(board);
  }

  // Hard: 100% optimal unbeatable minimax
  return getBestMove(board);
}

export function TicTacToe() {
  const [board, setBoard] = useState<BoardState>(() => Array(9).fill(null));
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isThinking, setIsThinking] = useState(false);
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cycleDifficulty = () => {
    setDifficulty((prev) => {
      const currentIndex = DIFFICULTY_ORDER.indexOf(prev);
      const nextIndex = (currentIndex + 1) % DIFFICULTY_ORDER.length;
      return DIFFICULTY_ORDER[nextIndex];
    });
    resetGame();
  };

  const triggerLocalConfetti = useCallback(() => {
    if (!canvasRef.current) return;
    try {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      myConfetti({
        particleCount: 28,
        spread: 55,
        startVelocity: 12,
        ticks: 90,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#ea580c", "#38bdf8", "#2dd4bf", "#fb7185", "#a1a1aa"],
      });
    } catch {
      // Ignore fallback silently
    }
  }, []);

  const handlePlayerMove = (index: number) => {
    if (board[index] !== null || isThinking || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      if (result.line) setWinningLine(result.line);
      if (result.winner === "X") {
        triggerLocalConfetti();
      }
      return;
    }

    // Computer's turn
    setIsThinking(true);
    setTimeout(() => {
      const compMove = getMoveByDifficulty(newBoard, difficulty);
      if (compMove !== -1) {
        newBoard[compMove] = "O";
        setBoard(newBoard);

        const compResult = checkWinner(newBoard);
        if (compResult.winner) {
          setWinner(compResult.winner);
          if (compResult.line) setWinningLine(compResult.line);
        }
      }
      setIsThinking(false);
    }, 400);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsThinking(false);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="relative overflow-hidden p-2 rounded-lg bg-background/80 backdrop-blur-xs select-none w-[160px] cursor-grab active:cursor-grabbing"
    >
      {/* Clipped confetti canvas inside container */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 w-full h-full"
      />

      {/* Top Header directly on top of the board */}
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pb-1.5 px-0.5">
        <button
          type="button"
          onClick={cycleDifficulty}
          aria-label={`Difficulty: ${difficulty}. Click to change.`}
          title="Click to toggle difficulty (easy → medium → hard)"
          className="h-5 px-1.5 text-[10px] font-mono font-medium rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all cursor-pointer active:scale-95 capitalize select-none"
        >
          {difficulty}
        </button>
        <div className="flex items-center gap-1.5">
          {winner === "X" && (
            <span className="text-emerald-500 font-semibold text-[10px]">
              Won!
            </span>
          )}
          {winner === "O" && (
            <span className="text-destructive font-semibold text-[10px]">
              AI Won
            </span>
          )}
          {winner === "draw" && (
            <span className="text-muted-foreground font-medium text-[10px]">
              Draw
            </span>
          )}
          {!winner && isThinking && (
            <span className="text-muted-foreground/80 animate-pulse text-[10px]">
              Thinking...
            </span>
          )}
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

      {/* Grid Board: Only 6 internal grid lines (2 vertical, 2 horizontal), NO outer border */}
      <div
        role="grid"
        aria-label="Tic-Tac-Toe Game Board"
        className="grid grid-cols-3 aspect-square w-full"
      >
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);
          const hasRightBorder = idx % 3 !== 2;
          const hasBottomBorder = idx < 6;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handlePlayerMove(idx)}
              disabled={cell !== null || isThinking || winner !== null}
              aria-label={`${CELL_LABELS[idx]}: ${cell ? cell : "empty"}`}
              className={cn(
                "aspect-square flex items-center justify-center text-sm font-mono font-bold transition-colors outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-ring",
                hasRightBorder && "border-r border-border/60",
                hasBottomBorder && "border-b border-border/60",
                cell === null &&
                  !isThinking &&
                  !winner &&
                  "hover:bg-muted/40 active:scale-95 text-transparent",
                isWinningCell &&
                  cell === "X" &&
                  "text-emerald-500 font-extrabold",
                isWinningCell &&
                  cell === "O" &&
                  "text-destructive font-extrabold",
                !isWinningCell && cell === "X" && "text-foreground",
                !isWinningCell && cell === "O" && "text-muted-foreground/80",
                (isThinking || winner !== null) &&
                  cell === null &&
                  "cursor-default opacity-50",
              )}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TicTacToe;
