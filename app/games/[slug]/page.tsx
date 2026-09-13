import { notFound } from "next/navigation";
import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TicTacToe from "@/components/tic-tac-toe";
import DevWordle from "@/components/dev-wordle";
import Snake from "@/components/snake";
import { Metadata } from "next";

const GAMES_DATA = {
  "tic-tac-toe": {
    title: "Tic-Tac-Toe",
    description: "Unbeatable Minimax AI engine. Can you force a draw?",
    component: TicTacToe,
    rules: [
      "Click any empty square to place an X.",
      "Match 3 in a row vertically, horizontally, or diagonally to win.",
      "The AI uses the Minimax algorithm and is mathematically unbeatable on Hard mode.",
    ]
  },
  "dev-wordle": {
    title: "Dev Wordle",
    description: "Guess the 5-letter tech word.",
    component: DevWordle,
    rules: [
      "Guess the tech-related word in 6 tries.",
      "Type a valid 5-letter word and press Enter.",
      "Green means the letter is correct and in the right spot.",
      "Yellow means the letter is in the word but in the wrong spot.",
      "Gray means the letter is not in the word."
    ]
  },
  "snake": {
    title: "Snake",
    description: "A classic retro snake game.",
    component: Snake,
    rules: [
      "Use WASD, Arrow Keys, or Numpad (8-Up, 4-Left, 2-Down, 6-Right) to move the snake.",
      "Press Space to pause or play.",
      "Eat the red food to grow and earn points.",
      "Don't hit the walls or your own tail.",
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = GAMES_DATA[slug as keyof typeof GAMES_DATA];
  
  if (!game) {
    return { title: "Game Not Found" };
  }

  return {
    title: `${game.title} | Kirtan Patel`,
    description: game.description,
  };
}

export function generateStaticParams() {
  return Object.keys(GAMES_DATA).map((slug) => ({
    slug,
  }));
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = GAMES_DATA[slug as keyof typeof GAMES_DATA];

  if (!game) {
    notFound();
  }

  const GameComponent = game.component;

  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 space-y-8">
        <Link 
          href="/games"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Arcade
        </Link>

        <div className="space-y-4">
          <h1 className="font-bold text-3xl text-foreground">
            {game.title}
          </h1>
          <p className="text-muted-foreground">
            {game.description}
          </p>
        </div>

        <div className={`border-y border-dashed border-border/60 flex items-center justify-center bg-muted/5 rounded-2xl ${slug === 'snake' ? 'py-4' : 'py-12'}`}>
          <GameComponent large />
        </div>

        <div className="space-y-4 max-w-2xl">
          <h2 className="text-xl font-semibold text-foreground">How to Play</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
            {game.rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
