import { PageContainer, SectionContainer } from "@/components/responsive-wrappers";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Arcade | Kirtan Patel",
  description: "A small collection of side projects and mini-games.",
};

const GAMES = [
  {
    slug: "dev-wordle",
    title: "Dev Wordle",
    description: "Guess the 5-letter tech word.",
    image: "/dev-wordle-icon.jpg",
  },
  {
    slug: "snake",
    title: "Snake",
    description: "A classic retro snake game.",
    image: "/snake-icon.jpg",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Unbeatable Minimax AI engine.",
    image: "/tic-tac-toe-icon.jpg",
  },
];

export default function GamesPage() {
  return (
    <PageContainer>
      <SectionContainer className="p-4 sm:p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="font-bold text-xl sm:text-2xl text-foreground">
            Arcade
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg">
            A small collection of side projects and mini-games built for fun. Pick one to play.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES.map((game) => {
            return (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group flex flex-col p-5 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-border transition-colors space-y-4"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform relative bg-secondary shrink-0">
                  <Image src={game.image} alt={game.title} fill className="object-cover" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-sm text-foreground">
                    {game.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
