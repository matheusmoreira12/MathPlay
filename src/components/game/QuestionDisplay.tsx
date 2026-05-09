import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

export const QuestionDisplay: React.FC = () => {
  const { currentQuestion, feedback, gameMode } = useGame();

  if (!currentQuestion) return null;

  // Replace * and / with friendlier symbols
  const formatOperator = (op: string) => {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
  };

  const getFeedbackColor = () => {
    if (feedback === 'correct') return 'bg-math-green text-white';
    if (feedback === 'wrong') return 'bg-math-red text-white';
    return 'bg-slate-100 text-slate-400';
  };

  return (
    <div className="flex items-center justify-center h-48 mb-8 w-full max-w-2xl bg-white rounded-[3rem] shadow-xl border-4 border-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentQuestion.num1}-${currentQuestion.operator}-${currentQuestion.num2}-${gameMode}`}
          initial={{ y: 20, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="flex items-center justify-center gap-4 md:gap-8 text-6xl md:text-8xl font-display font-black text-slate-800"
        >
          {gameMode === 'logic' ? (
            <div className={`${(currentQuestion.questionText?.length || 0) > 20 ? 'text-2xl md:text-4xl px-4' : 'text-5xl md:text-7xl'} leading-tight text-center font-black text-slate-800 flex flex-col items-center gap-4`}>
              <span>{currentQuestion.questionText?.replace('?', '')}</span>
              <span className={`min-w-[5rem] md:min-w-[8rem] px-4 h-16 md:h-24 rounded-3xl flex items-center justify-center transition-colors shadow-inner ${getFeedbackColor()}`}>
                {feedback === 'correct' ? currentQuestion.correctAnswer : '?'}
              </span>
            </div>
          ) : gameMode === 'result' ? (
            <>
              <span className="text-math-blue">{currentQuestion.num1}</span>
              <span className="text-slate-300">{formatOperator(currentQuestion.operator)}</span>
              <span className="text-math-purple">{currentQuestion.num2}</span>
              <span className="text-slate-300">=</span>
              <span className={`w-24 md:w-32 h-20 md:h-28 rounded-2xl flex items-center justify-center transition-colors ${getFeedbackColor()}`}>
                {feedback === 'correct' ? currentQuestion.resultValue : '?'}
              </span>
            </>
          ) : (
            <>
              <span className="text-math-blue">{currentQuestion.num1}</span>
              <span className={`w-24 md:w-32 h-20 md:h-28 rounded-2xl flex items-center justify-center transition-colors ${getFeedbackColor()}`}>
                {feedback === 'correct' ? formatOperator(currentQuestion.correctAnswer as string) : '?'}
              </span>
              <span className="text-math-purple">{currentQuestion.num2}</span>
              <span className="text-slate-300">=</span>
              <span className="text-slate-700">{currentQuestion.resultValue}</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
