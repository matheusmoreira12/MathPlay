import React from 'react';
import { motion } from 'framer-motion';

interface CronometroApressadoProps {
  timeLeft: number;
}

export const CronometroApressado: React.FC<CronometroApressadoProps> = ({ timeLeft }) => {
  const isUrgent = timeLeft <= 5 && timeLeft > 0;

  // Pulse rate based on urgency
  const scaleEffect = isUrgent 
    ? [1, 1.12, 1] 
    : [1, 1.04, 1];
  const scaleDuration = isUrgent ? 0.3 : 1.0;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center pointer-events-none">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-16 h-16 drop-shadow-md"
        animate={isUrgent ? {
          x: [-2, 2, -2, 2, 0],
          y: [-1, 1, -1, 1, 0],
          scale: scaleEffect,
          rotate: [-6, 6, -6, 6, 0]
        } : {
          scale: scaleEffect
        }}
        transition={isUrgent ? {
          repeat: Infinity,
          duration: scaleDuration,
          ease: "easeInOut"
        } : {
          repeat: Infinity,
          duration: scaleDuration,
          ease: "easeInOut"
        }}
      >
        {/* Top alarm bells */}
        <circle cx="25" cy="20" r="10" fill={isUrgent ? "#DC2626" : "#475569"} stroke="#1F2937" strokeWidth="2.5" />
        <circle cx="75" cy="20" r="10" fill={isUrgent ? "#DC2626" : "#475569"} stroke="#1F2937" strokeWidth="2.5" />
        
        {/* Bell connecting lines */}
        <path d="M 32 25 L 42 35" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
        <path d="M 68 25 L 58 35" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
        
        {/* Support legs */}
        <path d="M 25 80 L 15 92" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />
        <path d="M 75 80 L 85 92" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" />

        {/* Main Clock Body */}
        <circle
          cx="50"
          cy="55"
          r="38"
          fill={isUrgent ? "#EF4444" : "#FFFFFF"}
          stroke="#1F2937"
          strokeWidth="3.5"
        />

        {/* Inner white circle for urgent face */}
        {isUrgent && (
          <circle
            cx="50"
            cy="55"
            r="30"
            fill="#FFE4E6"
          />
        )}

        {/* Rosy cheeks */}
        <circle cx="38" cy="62" r="3" fill="#F87171" opacity="0.6" />
        <circle cx="62" cy="62" r="3" fill="#F87171" opacity="0.6" />

        {/* Cartoon Eyes */}
        <circle cx="42" cy="52" r="3.5" fill="#1F2937" />
        <circle cx="58" cy="52" r="3.5" fill="#1F2937" />
        <circle cx="40" cy="50" r="1" fill="#FFFFFF" />
        <circle cx="56" cy="50" r="1" fill="#FFFFFF" />

        {/* Clock Hands */}
        <line
          x1="50"
          y1="55"
          x2="50"
          y2="34"
          stroke="#1F2937"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="55"
          x2="65"
          y2="55"
          stroke="#1F2937"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Ticking/Sweating/Worried face expressions */}
        {isUrgent ? (
          // Nervous open mouth
          <circle cx="50" cy="67" r="4.5" fill="#991B1B" />
        ) : (
          // Happy cute smile
          <path
            d="M 47 64 Q 50 67 53 64"
            fill="none"
            stroke="#1F2937"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </motion.svg>
      
      {/* Time Text Indicator in the center of clock body? 
          Wait, no, let's keep clock body with face and display time next to it. */}
    </div>
  );
};
export default CronometroApressado;
