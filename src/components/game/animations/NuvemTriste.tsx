import React from 'react';
import { motion } from 'framer-motion';

export const NuvemTriste: React.FC = () => {
  const drops = Array.from({ length: 5 });

  return (
    <div className="relative w-32 h-32 flex flex-col items-center justify-center pointer-events-none">
      {/* Cloud Shape */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-28 h-20 drop-shadow-md z-10"
        initial={{ x: -10, opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: [0, -8, 8, -6, 6, -3, 3, 0],
          y: [0, -2, 2, 0]
        }}
        transition={{ 
          duration: 0.7, 
          ease: "easeInOut"
        }}
      >
        {/* Soft Grey/Blue Cloud */}
        <path
          d="M 20 60 
             A 15 15 0 0 1 22 30 
             A 20 20 0 0 1 60 22 
             A 18 18 0 0 1 88 40 
             A 15 15 0 0 1 80 65 
             Z"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="3"
        />
        
        {/* Sad Rosy cheeks */}
        <circle cx="34" cy="48" r="4" fill="#F87171" opacity="0.4" />
        <circle cx="68" cy="48" r="4" fill="#F87171" opacity="0.4" />

        {/* Sad/Worried Eyes */}
        <circle cx="40" cy="42" r="3.5" fill="#475569" />
        <circle cx="62" cy="42" r="3.5" fill="#475569" />
        
        {/* Worried Eyebrows */}
        <path d="M 35 36 Q 40 34 45 37" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <path d="M 57 37 Q 62 34 67 36" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        {/* Sad Mouth */}
        <path
          d="M 46 54 Q 51 48 56 54"
          fill="none"
          stroke="#475569"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Raindrops falling */}
      <div className="absolute w-20 h-10 bottom-0 flex justify-around px-2 z-0">
        {drops.map((_, i) => {
          const delay = i * 0.15;
          return (
            <motion.svg
              key={i}
              viewBox="0 0 10 15"
              className="w-2.5 h-4 text-sky-400 fill-current"
              initial={{ y: -15, opacity: 0, scale: 0.6 }}
              animate={{ 
                y: [0, 25], 
                opacity: [0, 1, 0],
                scale: [0.6, 1, 0.4]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                delay: delay,
                ease: "easeIn"
              }}
            >
              <path d="M5 0 C5 0 0 8 0 11 C0 13.5 2.2 15 5 15 C7.8 15 10 13.5 10 11 C10 8 5 0 5 0 Z" />
            </motion.svg>
          );
        })}
      </div>
    </div>
  );
};
export default NuvemTriste;
