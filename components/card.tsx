'use client'

import { motion } from "framer-motion";

export default function Card({
  id,
  date,
  title,
  subtitle,
  image }: {
    id: number;
    date: string;
    title: string;
    subtitle: string;
    image: string
  }
) {
  return (
    <motion.a
      href={`/blogs/${id}`}
      className="max-w-72 w-full mx-auto border border-border p-3 bg-card/35 flex flex-col gap-2 rounded-xs overflow-hidden"
      whileHover="hover"
      initial="initial"
    >
      <span className="dates">{date}</span>
      <div className="relative w-full h-28">
        <motion.img
          src={image}
          alt={title}
          className="rounded-md w-full h-full object-cover absolute inset-0"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col justify-start p-2"
          variants={{
            initial: { opacity: 1 },
            hover: { opacity: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="font-bold capitalize tracking-wider line-clamp-2">{title}</h1>
          <p className="text-sm opacity-90 break-words line-clamp-2">{subtitle}</p>
        </motion.div>
      </div>
    </motion.a>
  )
}
