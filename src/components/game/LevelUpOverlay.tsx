import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Sparkles, ArrowUpCircle } from 'lucide-react';

export const LevelUpOverlay: React.FC = () => {
  const { isLevelingUp, difficulty } = useGame();

  const diffLabels = {
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil'
  };

  return (
    <AnimatePresence>
      {isLevelingUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-math-blue/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.6 }}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-[3rem] shadow-2xl border-8 border-math-yellow text-center max-w-lg mx-4"
          >
            <div className="relative">
              <ArrowUpCircle size={80} className="text-math-green mb-4 relative z-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles size={100} className="text-math-yellow opacity-50" />
              </motion.div>
            </div>
            
            <h2 className="text-5xl font-display font-black text-slate-800 mb-2 uppercase tracking-tight">
              Subiu de Nível!
            </h2>
            <p className="text-2xl text-slate-500 font-medium mb-6">
              Você agora está jogando no nível
            </p>
            <div className="px-8 py-3 bg-math-yellow text-amber-900 rounded-full text-3xl font-bold uppercase shadow-lg shadow-yellow-500/30">
              {diffLabels[difficulty]}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
