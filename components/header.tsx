import Link from "next/link"
import { ModeToggle } from "./mode-theme"

function Header() {
  return (
    <header className="sticky top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Typographic Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase">
          KJ_Patel
        </Link>

        {/* Navigation / Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <Link href="#projects" className="hover:text-foreground transition-colors">Work</Link>
            <Link href="#skills" className="hover:text-foreground transition-colors">Skills</Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header