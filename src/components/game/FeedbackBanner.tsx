import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { CheckCircle2, XCircle } from 'lucide-react';

export const FeedbackBanner: React.FC = () => {
  const { feedback, currentQuestion } = useGame();

  const formatAnswer = (ans: string | number) => {
    if (ans === '*') return '×';
    if (ans === '/') return '÷';
    return ans;
  };

  return (
    <div className="h-24 w-full flex items-center justify-center mt-6">
      <AnimatePresence mode="wait">
        {feedback === 'correct' && (
          <motion.div
            key="correct"
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            className="flex items-center gap-3 bg-math-green text-white px-8 py-4 rounded-full shadow-lg font-bold text-2xl"
          >
            <CheckCircle2 size={32} />
            <span>Excelente!</span>
          </motion.div>
        )}

        {feedback === 'wrong' && currentQuestion && (
          <motion.div
            key="wrong"
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center bg-math-red text-white px-8 py-3 rounded-3xl shadow-lg font-bold text-center"
          >
            <div className="flex items-center gap-2 text-xl">
              <XCircle size={24} />
              <span>Ops, a resposta era {formatAnswer(currentQuestion.correctAnswer)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
