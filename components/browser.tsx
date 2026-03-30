import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react'
import React from 'react'

interface BrowserProps {
  children: React.ReactNode;
  url?: string;
}

function Browser({ children, url = "http://localhost:3000" }: BrowserProps) {
  return (
    <div className='h-full w-full border border-transparent rounded-xl flex flex-col'>
      {/* header */}
      <div className='flex items-center gap-2 px-4 py-2 border-b border-dashed shrink-0'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <div className='flex items-center gap-2'>
          <ChevronLeft size={26} className='p-1.5 hover:bg-secondary text-secondary-foreground cursor-pointer rounded-full' />
          <ChevronRight size={26} className='p-1.5 hover:bg-secondary text-secondary-foreground cursor-pointer rounded-full' />
          <RefreshCcw size={26} className='p-1.5 hover:bg-secondary text-secondary-foreground cursor-pointer rounded-full' />
        </div>
        <div className='max-w-md w-full flex items-center gap-2 rounded-full px-2 py-1 bg-accent/40 cursor-not-allowed'>
          <p className='text-xs text-accent-foreground/60 font-mono truncate'>{url}</p>
        </div>
      </div>
      <div className="h-full flex-1">
        {children}
      </div>
    </div>
  )
}

export default Browser