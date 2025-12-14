import Link from "next/link"
import { ModeToggle } from "./mode-theme"

function Header() {
  return (
    <header className="sticky top-0 w-full z-10 font-mono max-w-6xl mx-auto ">
      <div className="flex justify-between items-center px-3.5 py-3 bg-slate-50 dark:bg-black border-b border-border ring-zinc-950">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" className="fill-black dark:fill-foreground" />
            <path
              d="M8.34 29.392L6.744 10.8L13.408 10.38L12.512 18.836L19.008 10.38L21.5 12.284L15.592 18.472L22.508 28.972L16.572 29.392L12.792 21.412L12.176 22.056L11.42 29.112L8.34 29.392ZM26.3906 29.672C25.8119 29.672 25.2146 29.588 24.5986 29.42C24.0013 29.252 23.4133 29.0187 22.8346 28.72L23.3386 27.208C23.6933 27.32 24.0293 27.4133 24.3466 27.488C24.6639 27.5627 24.9719 27.6 25.2706 27.6C26.0359 27.6 26.5586 27.348 26.8386 26.844C27.1373 26.34 27.2866 25.752 27.2866 25.08C27.2866 25.0427 27.2773 24.9587 27.2586 24.828C27.2586 24.6973 27.2399 24.408 27.2026 23.96C27.1653 23.512 27.0999 22.784 27.0066 21.776C26.9319 20.768 26.8199 19.3867 26.6706 17.632C26.5213 15.8587 26.3253 13.5813 26.0826 10.8L32.7466 10.38L31.1786 25.052C31.0479 26.2653 30.7493 27.208 30.2826 27.88C29.8346 28.552 29.2653 29.0187 28.5746 29.28C27.9026 29.5413 27.1746 29.672 26.3906 29.672Z" className="fill-white dark:fill-background" />
          </svg>
          <Link href="/" className="font-semibold sm:text-xl flex items-center gap-1 tracking-widest ring-zinc-300">
            kjpatel
          </Link>
        </div>

        <div className="flex gap-6">
          {/* <nav className="hidden sm:flex items-center gap-8">
            <Link href="/blogs" className="font-semibold text-lg">Blog</Link>
          </nav> */}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header