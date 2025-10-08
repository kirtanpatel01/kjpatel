import Image from 'next/image'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';

function Hero() {
  type SocialLink = {
    name: string;
    src: string;
    link: string;
  }

  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
      link: "https://www.linkedin.com/in/kirtanpatel01"
    },
    {
      name: "X/Twitter",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg",
      link: "https://x.com/_k_j_patel_"
    },
    {
      name: "Github",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      link: "https://github.com/kirtanpatel01"
    },
  ]

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-16'>
      <Image src="/kjpatel.jpeg" alt='kjpatel' width={280} height={280} className='size-64 md:size-72 rounded-full shadow shadow-sky-400/25 inset-shadow-sm inset-shadow-sky-400/25' />
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <div className='space-y-4'>
            <h1 className='text-3xl sm:text-4xl font-black text-sky-500 dark:text-sky-600'>Kirtan Patel</h1>
            <span className='text-lg font-semibold text-secondary'>Full Stack Web Developer</span>
          </div>
          <ul className='hidden sm:flex items-center gap-4 bg-cyan-400/5 dark:bg-slate-600/75 border border-cyan-500 dark:border-slate-800 px-2 sm:px-4 sm:py-2 rounded-md'>
            {socialLinks.map((link) => (
              <li key={link.name} className='mt-1 sm:mt-2'>
                <Link href={link.link} target='_blank'>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image src={link.src} alt={link.name} width={25} height={25} className=' cursor-pointer' />
                    </TooltipTrigger>
                    <TooltipContent>{link.name}</TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm max-w-xl text-justify [hyphens:auto] [word-break:break-word] [text-justify:inter-word]">
          I enjoy creating thoughtful solutions. I&apos;ve worked with Next.js, Supabase, Tailwind to build modern, responsive websites that balance performance with design. I focus on transforming ideas into clean, scalable solutions that users enjoy. I&apos;m always learning from debugging tricky issues to exploring new frameworks and technologies that can make my work even better.
        </p>

      </div>
    </div>
  )
}

export default Hero