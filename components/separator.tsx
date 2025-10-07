import React from 'react'

function Separator() {
  return (
    <div className="relative flex h-8 w-full border-x border-border before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--foreground)_0,var(--foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--foreground:var(--border)]/80" />
  )
}

export default Separator