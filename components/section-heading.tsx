import { cn } from '@/lib/utils'
import React from 'react'

function SectionHeading({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn("text-sm font-mono tracking-widest text-muted-foreground mb-4", className)}>
      {children}
    </h2>
  )
}

export default SectionHeading