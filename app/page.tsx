import Header from "@/components/header";
import Hero from "@/components/hero";
import { Construction } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Hero />
      <main className="min-h-screen flex justify-center items-center">
        Working on it... <Construction />
      </main>
    </div>
  );
}
