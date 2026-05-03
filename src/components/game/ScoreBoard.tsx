import React from 'react';
import { useGame } from '../../context/GameContext';
import { Flame, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ScoreBoard: React.FC = () => {
  const { score, streak, quitGame, difficulty } = useGame();

  const diffLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };

  return (
    <div className="flex items-center justify-between w-full max-w-2xl px-6 py-4 bg-white/60 backdrop-blur-md rounded-3xl mb-8 shadow-sm border-2 border-white/80">
      <div className="flex items-center gap-4">
        <button 
          onClick={quitGame}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nível</span>
          <span className="text-sm font-bold text-slate-700">{diffLabels[difficulty]}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {streak >= 3 && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex items-center gap-1 text-math-yellow bg-yellow-100 px-3 py-1.5 rounded-full font-bold"
          >
            <Flame size={20} className="fill-math-yellow" />
            <span>{streak}x</span>
          </motion.div>
        )}
        
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pontos</span>
          <span className="text-3xl font-display font-black text-math-blue leading-none">{score}</span>
        </div>
      </div>
    </div>
  );
};
