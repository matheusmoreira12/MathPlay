import React from 'react';
import { motion } from 'framer-motion';

export const EstrelaDaVitoria: React.FC = () => {
  // Generate random confetti particles
  const particles = Array.from({ length: 16 });
  const colors = ['#3B82F6', '#10B981', '#FBBF24', '#EF4444', '#EC4899', '#8B5CF6'];

  return (
    <div className="relative w-32 h-32 flex items-center justify-center pointer-events-none">
      {/* Star Character */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-24 h-24 drop-shadow-lg z-10"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ 
          scale: [0, 1.2, 1], 
          rotate: [0, 15, -15, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          type: "spring", 
          bounce: 0.6,
          duration: 0.8,
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.4,
            ease: "easeOut"
          }
        }}
      >
        {/* Star path */}
        <path
          d="M50 5 L63 35 L95 38 L70 60 L78 92 L50 75 L22 92 L30 60 L5 38 L37 35 Z"
          fill="#FBBF24"
          stroke="#F59E0B"
          strokeWidth="3"
        />
        {/* Rosy cheeks */}
        <circle cx="32" cy="52" r="5" fill="#F87171" opacity="0.6" />
        <circle cx="68" cy="52" r="5" fill="#F87171" opacity="0.6" />
        {/* Cute Eyes */}
        <circle cx="38" cy="45" r="4" fill="#1F2937" />
        <circle cx="62" cy="45" r="4" fill="#1F2937" />
        <circle cx="36" cy="43" r="1.5" fill="#FFFFFF" />
        <circle cx="60" cy="43" r="1.5" fill="#FFFFFF" />
        {/* Cute Smile */}
        <path
          d="M 44 54 Q 50 62 56 54"
          fill="none"
          stroke="#1F2937"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Confetti Explosion */}
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 2 * Math.PI;
        const radius = 60 + Math.random() * 40;
        const xTarget = Math.cos(angle) * radius;
        const yTarget = Math.sin(angle) * radius;
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x: xTarget, 
              y: yTarget, 
              scale: [0, 1.2, 0], 
              opacity: [1, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.1 
            }}
          />
        );
      })}
    </div>
  );
};
export default EstrelaDaVitoria;
