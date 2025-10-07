'use client'

import { motion } from "framer-motion";
import { Eye, Heart, Send } from "lucide-react";
import { useState } from "react";

function CardFooter() {
  const [hovered, setHovered] = useState<"views" | "likes" | null>(null);
  return (
    <div className="w-full flex items-center gap-4 rounded-xs">
      {/* Views and Likes Box*/}
      {/* Views */}
      <motion.div
        onHoverStart={() => setHovered("views")}
        onHoverEnd={() => setHovered(null)}
        animate={{
          width: hovered === "likes" ? 50 : 140,
        }}
        transition={{ duration: 0.3 }}
        className="rounded-xs bg-sky-200/15 text-sky-600 flex justify-center items-center overflow-hidden p-2 grow"
      >
        <Eye className="shrink-0" />
        <motion.span
          animate={{
            opacity: hovered === "likes" ? 0 : 1,
            width: hovered === "likes" ? 0 : "auto",
          }}
          transition={{ duration: 0.2 }}
          className="ml-1 whitespace-nowrap cursor-default"
        >
          100 Views
        </motion.span>
      </motion.div>

      {/* Likes */}
      <motion.div
        onHoverStart={() => setHovered("likes")}
        onHoverEnd={() => setHovered(null)}
        animate={{
          width: hovered === "likes" ? 140 : 50,
        }}
        transition={{ duration: 0.3 }}
        className="rounded-xs bg-pink-300/15 text-pink-600 flex justify-center items-center overflow-hidden p-2 grow"
      >
        <Heart className="shrink-0" />
        <motion.span
          animate={{
            opacity: hovered === "likes" ? 1 : 0,
            width: hovered === "likes" ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-xs ml-1 whitespace-nowrap cursor-default"
        >
          100 Likes
        </motion.span>
      </motion.div>

      {/* Share Button */}
      <button className="bg-primary/80 hover:bg-primary size-10 flex justify-center items-center cursor-pointer transition-all duration-300 flex-none rounded-xs">
        <motion.div
          whileHover={{
            y: [0, -2, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Send />
        </motion.div>
      </button>
    </div>

  )
}

export default CardFooter