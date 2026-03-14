import { cn } from '@/lib/utils'
import React from 'react'

function Container({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <div id={id} className={cn("w-full max-w-4xl mx-auto my-16", className)}>
      {children}
    </div>
  )
}

export default Container