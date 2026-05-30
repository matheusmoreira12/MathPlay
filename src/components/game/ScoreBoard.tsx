import React from 'react';
import { useGame } from '../../context/GameContext';
import { Flame, X, Pause, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScoreBoard: React.FC = () => {
  const { score, streak, lives, quitGame, difficulty, togglePause, grade } = useGame();

  const diffLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };

  // Calculate Level Progression Percentage
  const getLevelProgress = () => {
    if (difficulty === 'easy') {
      return Math.min(100, (score / 100) * 100);
    }
    if (difficulty === 'medium') {
      return Math.min(100, ((score - 100) / 150) * 100);
    }
    // Hard level progress towards 500 points victory
    return Math.min(100, ((score - 250) / 250) * 100);
  };

  const getNextGoalText = () => {
    if (difficulty === 'easy') return 'Meta: 100 pts';
    if (difficulty === 'medium') return 'Meta: 250 pts';
    return 'Meta: 500 pts';
  };

  return (
    <div className="flex flex-col w-full max-w-2xl px-6 py-4 bg-white/70 backdrop-blur-md rounded-[2.5rem] mb-6 shadow-sm border-2 border-white/80">
      {/* Top panel */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {/* Pause button */}
          <button 
            onClick={togglePause}
            className="p-2.5 text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors shadow-sm active:scale-95"
            title="Pausar Jogo"
          >
            <Pause size={20} className="fill-slate-500" />
          </button>
          
          {/* Quit Button */}
          <button 
            onClick={quitGame}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
            title="Sair do Jogo"
          >
            <X size={20} />
          </button>

          {/* Grade / Level badge */}
          <div className="flex flex-col ml-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Série
            </span>
            <span className="text-sm font-black text-slate-700">
              {grade}º Ano ({diffLabels[difficulty]})
            </span>
          </div>
        </div>

        {/* Lives (Hearts) Indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-2xl shadow-sm">
          <AnimatePresence>
            {Array.from({ length: 3 }).map((_, idx) => {
              const active = idx < lives;
              return (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.8 }}
                  animate={active ? { 
                    scale: 1, 
                    filter: "grayscale(0%)" 
                  } : { 
                    scale: [1, 1.4, 0],
                    filter: "grayscale(100%)",
                    opacity: 0
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-rose-500"
                >
                  <Heart 
                    size={22} 
                    className={active ? "fill-rose-500 stroke-rose-600" : "text-slate-300 fill-slate-300"} 
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4">
          {/* Streak indicator */}
          {streak >= 3 && (
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex items-center gap-1 text-math-yellow bg-yellow-100/80 border border-yellow-200 px-3 py-1.5 rounded-full font-bold shadow-sm"
            >
              <Flame size={18} className="fill-math-yellow text-amber-500" />
              <span className="text-sm text-amber-700">{streak}x</span>
            </motion.div>
          )}
          
          {/* Points indicator */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Pontos
            </span>
            <span className="text-3xl font-display font-black text-math-blue leading-none mt-1">
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Progress to next level bar */}
      <div className="w-full flex items-center gap-3 mt-3 pt-2.5 border-t border-slate-100">
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-math-blue to-math-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getLevelProgress()}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-black text-slate-400 min-w-[75px] text-right">
          {getNextGoalText()}
        </span>
      </div>
    </div>
  );
};
