import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';
import { Trophy, RefreshCcw, HeartOff, Sparkles } from 'lucide-react';

export const VictoryScreen: React.FC = () => {
  const { score, quitGame, gameResult } = useGame();
  const isWin = gameResult === 'win';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center w-full max-w-xl p-8 md:p-12 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl border-8 ${
        isWin ? 'border-math-yellow' : 'border-math-red'
      } text-center select-none`}
    >
      {/* Icon Area */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
        className="mb-6 relative"
      >
        {isWin ? (
          <>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Trophy size={110} className="text-math-yellow drop-shadow-xl relative z-10" />
            </motion.div>
            <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-30 rounded-full"></div>
            <motion.div
              className="absolute -top-4 -right-4 text-yellow-500"
              animate={{ scale: [1, 1.3, 1], rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={28} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <HeartOff size={110} className="text-math-red drop-shadow-xl relative z-10" />
            </motion.div>
            <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 rounded-full"></div>
          </>
        )}
      </motion.div>

      {/* Title */}
      <h1 className={`text-4xl md:text-5xl font-display font-black mb-3 uppercase tracking-tight ${
        isWin ? 'text-amber-600' : 'text-math-red'
      }`}>
        {isWin ? 'Você Venceu!' : 'Fim de Jogo!'}
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-slate-500 mb-8 font-medium leading-relaxed max-w-sm">
        {isWin 
          ? 'Incrível! Você dominou todas as operações e provou ser fera na matemática! 🚀' 
          : 'Suas vidas acabaram, mas que tal tentar de novo? A prática leva à perfeição! 💪'
        }
      </p>

      {/* Score block */}
      <div className="flex flex-col items-center bg-slate-50 w-full rounded-3xl py-6 mb-8 border-2 border-slate-100/60 shadow-inner">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
          {isWin ? 'Pontuação da Vitória' : 'Pontuação Final'}
        </span>
        <span className={`text-6xl font-display font-black leading-none ${
          isWin ? 'text-math-blue' : 'text-slate-700'
        }`}>
          {score}
        </span>
      </div>

      {/* Call to action */}
      <Button 
        variant={isWin ? "success" : "primary"} 
        size="xl" 
        className="w-full flex items-center justify-center gap-3 active:scale-95"
        onClick={quitGame}
      >
        <RefreshCcw size={24} />
        <span>{isWin ? 'Jogar Novamente' : 'Tentar Outra Vez'}</span>
      </Button>
    </motion.div>
  );
};
