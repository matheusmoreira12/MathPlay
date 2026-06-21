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
    if (feedback === 'correct') return 'bg-math-green text-white border-math-green';
    if (feedback === 'wrong') return 'bg-math-red text-white border-math-red';
    return 'bg-slate-50 text-slate-400 border-4 border-dashed border-slate-300';
  };

  // Get dynamic font sizing class based on question text length
  const getFontSizeClass = (text: string) => {
    const len = text.length;
    if (len > 70) return 'text-xl md:text-2xl px-4 py-1';
    if (len > 40) return 'text-2xl md:text-3xl px-6 py-2';
    return 'text-4xl md:text-5xl px-8 py-3';
  };

  return (
    <div className="flex items-center justify-center min-h-[10rem] h-auto py-4 px-4 md:px-6 mb-4 w-full max-w-2xl bg-white rounded-[3rem] shadow-xl border-4 border-white overflow-hidden transition-all duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentQuestion.num1}-${currentQuestion.operator}-${currentQuestion.num2}-${gameMode}-${currentQuestion.blankType}`}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center"
        >
          {gameMode === 'logic' ? (
            <div className="w-full flex flex-col items-center gap-4 text-center">
              <span className={`font-display font-black text-slate-800 leading-snug ${getFontSizeClass(currentQuestion.questionText || '')}`}>
                {currentQuestion.questionText}
              </span>
              <span className={`min-w-[5rem] md:min-w-[8rem] px-6 h-16 md:h-20 rounded-3xl flex items-center justify-center font-display font-black text-4xl shadow-inner transition-colors ${getFeedbackColor()}`}>
                {feedback === 'correct' ? currentQuestion.correctAnswer : '?'}
              </span>
            </div>
          ) : (
            // Termo Desconhecido Game Mode
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-4xl md:text-6xl font-display font-black text-slate-800 select-none">
              {currentQuestion.blankType === 'num1' && (
                <>
                  <span className={`w-20 md:w-28 h-18 md:h-24 rounded-2xl flex items-center justify-center transition-colors text-3xl md:text-5xl shadow-inner ${getFeedbackColor()}`}>
                    {feedback === 'correct' ? currentQuestion.num1 : '?'}
                  </span>
                  <span className="text-slate-300">{formatOperator(currentQuestion.operator)}</span>
                  <span className="text-math-purple">{currentQuestion.num2}</span>
                  <span className="text-slate-300">=</span>
                  <span className="text-slate-700">{currentQuestion.resultValue}</span>
                </>
              )}

              {currentQuestion.blankType === 'num2' && (
                <>
                  <span className="text-math-blue">{currentQuestion.num1}</span>
                  <span className="text-slate-300">{formatOperator(currentQuestion.operator)}</span>
                  <span className={`w-20 md:w-28 h-18 md:h-24 rounded-2xl flex items-center justify-center transition-colors text-3xl md:text-5xl shadow-inner ${getFeedbackColor()}`}>
                    {feedback === 'correct' ? currentQuestion.num2 : '?'}
                  </span>
                  <span className="text-slate-300">=</span>
                  <span className="text-slate-700">{currentQuestion.resultValue}</span>
                </>
              )}

              {currentQuestion.blankType === 'operator' && (
                <>
                  <span className="text-math-blue">{currentQuestion.num1}</span>
                  <span className={`w-20 md:w-28 h-18 md:h-24 rounded-2xl flex items-center justify-center transition-colors text-3xl md:text-5xl shadow-inner ${getFeedbackColor()}`}>
                    {feedback === 'correct' ? formatOperator(currentQuestion.correctAnswer as string) : '?'}
                  </span>
                  <span className="text-math-purple">{currentQuestion.num2}</span>
                  <span className="text-slate-300">=</span>
                  <span className="text-slate-700">{currentQuestion.resultValue}</span>
                </>
              )}

              {(currentQuestion.blankType === 'result' || !currentQuestion.blankType) && (
                <>
                  <span className="text-math-blue">{currentQuestion.num1}</span>
                  <span className="text-slate-300">{formatOperator(currentQuestion.operator)}</span>
                  <span className="text-math-purple">{currentQuestion.num2}</span>
                  <span className="text-slate-300">=</span>
                  <span className={`w-20 md:w-28 h-18 md:h-24 rounded-2xl flex items-center justify-center transition-colors text-3xl md:text-5xl shadow-inner ${getFeedbackColor()}`}>
                    {feedback === 'correct' ? currentQuestion.correctAnswer : '?'}
                  </span>
                </>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
