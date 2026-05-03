import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';
import { Trophy, RefreshCcw } from 'lucide-react';

export const VictoryScreen: React.FC = () => {
  const { score, quitGame } = useGame();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-xl p-8 md:p-12 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl border-8 border-math-yellow text-center"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="mb-6 relative"
      >
        <Trophy size={120} className="text-math-yellow drop-shadow-xl relative z-10" />
        <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 rounded-full"></div>
      </motion.div>

      <h1 className="text-5xl md:text-6xl font-display font-black text-slate-800 mb-4 uppercase tracking-tight">
        Você Venceu!
      </h1>
      
      <p className="text-xl text-slate-500 mb-8 font-medium">
        Parabéns! Você completou o nível Difícil e zerou o jogo!
      </p>

      <div className="flex flex-col items-center bg-slate-50 w-full rounded-3xl py-6 mb-8 border-2 border-slate-100">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Pontuação Final</span>
        <span className="text-7xl font-display font-black text-math-blue">{score}</span>
      </div>

      <Button 
        variant="primary" 
        size="xl" 
        className="w-full flex items-center justify-center gap-3"
        onClick={quitGame}
      >
        <RefreshCcw size={28} />
        <span>Jogar Novamente</span>
      </Button>
    </motion.div>
  );
};
