import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { EstrelaDaVitoria } from './animations/EstrelaDaVitoria';
import { NuvemTriste } from './animations/NuvemTriste';

export const FeedbackBanner: React.FC = () => {
  const { feedback, currentQuestion } = useGame();

  const formatAnswer = (ans: string | number) => {
    if (ans === '*') return '×';
    if (ans === '/') return '÷';
    return ans;
  };

  return (
    <div className={`transition-all duration-300 ease-in-out ${feedback ? 'h-32 mt-4 mb-2 opacity-100' : 'h-0 mt-0 mb-0 opacity-0'} w-full flex items-center justify-center select-none overflow-hidden`}>
      <AnimatePresence mode="wait">
        {feedback === 'correct' && (
          <motion.div
            key="correct"
            initial={{ y: 30, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.85 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-math-green text-white px-8 py-3 rounded-[2.5rem] shadow-xl border-4 border-white font-bold"
          >
            <EstrelaDaVitoria />
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl font-display font-black tracking-wide leading-tight">Muito Bem!</span>
              <span className="text-sm font-normal text-emerald-100">Você acertou essa! Continue brilhando! ⭐</span>
            </div>
          </motion.div>
        )}

        {feedback === 'wrong' && currentQuestion && (
          <motion.div
            key="wrong"
            initial={{ y: 30, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.85 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-math-red text-white px-8 py-3 rounded-[2.5rem] shadow-xl border-4 border-white font-bold"
          >
            <NuvemTriste />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-2xl font-display font-black tracking-wide leading-tight">Ops, quase!</span>
              <span className="text-lg font-bold text-red-100">
                A resposta certa era: <span className="underline font-black text-2xl">{formatAnswer(currentQuestion.correctAnswer)}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
