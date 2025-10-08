import React from 'react'

function Divider({ title }: { title: string }) {
  return (
    <div className='flex items-center gap-4 my-8 sm:my-16 max-w-4xl mx-auto'>
      <div className='h-px w-full bg-border'></div>
      <span className='font-semibold'>{title}</span>
      <div className='h-px w-full bg-border'></div>
    </div>
  )
}

export default Divider