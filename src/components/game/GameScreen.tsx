import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { ScoreBoard } from './ScoreBoard';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerGrid } from './AnswerGrid';
import { FeedbackBanner } from './FeedbackBanner';
import { LevelUpOverlay } from './LevelUpOverlay';
import { CronometroApressado } from './animations/CronometroApressado';
import { Play, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

export const GameScreen: React.FC = () => {
  const { 
    isPaused, 
    togglePause, 
    quitGame, 
    timeLeft, 
    difficulty 
  } = useGame();

  const getTimeLimit = () => {
    if (difficulty === 'easy') return 25;
    if (difficulty === 'medium') return 20;
    return 15;
  };

  const timeLimit = getTimeLimit();
  const timePercentage = (timeLeft / timeLimit) * 100;

  const getTimerColorClass = () => {
    if (timeLeft > 10) return 'bg-math-green';
    if (timeLeft > 5) return 'bg-math-yellow';
    return 'bg-math-red animate-pulse';
  };

  return (
    <>
      <LevelUpOverlay />
      
      {/* Active Game Screen */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-start w-full max-w-4xl h-auto p-2 md:p-4 relative"
      >
        <ScoreBoard />
        
        {/* Timer Bar and Ticking Clock Container */}
        <div className="flex items-center gap-3 w-full max-w-2xl px-4 mb-4 select-none">
          <CronometroApressado timeLeft={timeLeft} />
          
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-3 w-full bg-slate-200/60 rounded-full overflow-hidden border border-white shadow-inner">
              <motion.div 
                className={`h-full rounded-full transition-colors duration-300 ${getTimerColorClass()}`}
                initial={{ width: '100%' }}
                animate={{ width: `${timePercentage}%` }}
                transition={{ duration: 0.25, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-widest px-1">
              <span>Tempo</span>
              <span className={timeLeft <= 5 ? "text-math-red font-black" : ""}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Game Question area (blurred if paused) */}
        <div className={`w-full flex flex-col items-center transition-all duration-300 ${isPaused ? 'blur-md pointer-events-none scale-[0.98]' : ''}`}>
          <QuestionDisplay />
          <AnswerGrid />
          <FeedbackBanner />
        </div>
      </motion.div>

      {/* Pause Screen Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6 select-none"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full max-w-sm p-8 bg-white/95 backdrop-blur-md rounded-[3rem] shadow-2xl border-4 border-white text-center flex flex-col items-center gap-6"
            >
              {/* Funny Sleeping Emoji Face */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-7xl mb-1 relative"
              >
                😴
                <motion.span 
                  className="absolute text-xl font-bold text-blue-500"
                  animate={{ 
                    x: [15, 25, 30], 
                    y: [-10, -25, -35], 
                    opacity: [0, 1, 0], 
                    scale: [0.6, 1, 0.8] 
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  style={{ top: 0, right: -10 }}
                >
                  Z
                </motion.span>
              </motion.div>

              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-display font-black text-slate-800">
                  Jogo Pausado
                </h2>
                <p className="text-slate-500 font-medium">
                  Hora de respirar! A questão está escondida para ninguém espiar! 😉
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full mt-2">
                <Button 
                  variant="success" 
                  size="md" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={togglePause}
                >
                  <Play size={20} className="fill-white" />
                  <span>Continuar Jogando</span>
                </Button>

                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-red-600"
                  onClick={quitGame}
                >
                  <LogOut size={20} />
                  <span>Sair do Jogo</span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
