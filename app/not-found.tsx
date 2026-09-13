"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import TicTacToe from "@/components/tic-tac-toe";
import DevWordle from "@/components/dev-wordle";
import Snake from "@/components/snake";
import { Button } from "@/components/ui/button";
import { Dices, Home } from "lucide-react";

const GAMES = [
  { name: "Tic-Tac-Toe", component: TicTacToe },
  { name: "Dev Wordle", component: DevWordle },
  { name: "Snake", component: Snake },
];

export default function NotFound() {
  const [gameIndex, setGameIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGameIndex(Math.floor(Math.random() * GAMES.length));
    setMounted(true);
  }, []);

  const cycleGame = () => {
    setGameIndex((prev) => (prev + 1) % GAMES.length);
  };

  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 min-h-[70vh] flex flex-col items-center justify-center space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            404 Not Found
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Looks like you&apos;re lost... but since you&apos;re here, want to play a game?
          </p>
        </div>

        <div className="flex justify-center items-center min-h-[400px]">
          {mounted ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              {(() => {
                const ActiveGame = GAMES[gameIndex].component;
                return <ActiveGame large />;
              })()}
            </div>
          ) : (
            <div className="w-64 h-64 border border-dashed rounded-xl border-border/40" />
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button variant="outline" onClick={cycleGame} disabled={!mounted}>
            <Dices className="w-4 h-4 mr-2" />
            Switch Game
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back Home
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
