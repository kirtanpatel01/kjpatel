import React from 'react'

function CodeText({ children }: { children: React.ReactNode }) {
  return (
    <span className='inline-flex items-center mx-1 text-sm font-mono font-medium bg-muted px-1 py-0 rounded-sm shadow shadow-primary/50'>{children}</span>
  )
}

export default CodeText