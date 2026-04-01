import React from 'react'

function CodeText({ children }: { children: React.ReactNode }) {
  return (
    <span className='inline-flex items-center mx-1 text-sm font-medium bg-muted px-1 py-0 rounded-sm shadow shadow-primary/40'>{children}</span>
  )
}

export default CodeText