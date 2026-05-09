import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useGame } from '../../context/GameContext';
import type { Difficulty, GameMode } from '../../lib/math';
import { Calculator, ArrowLeft } from 'lucide-react';

export const StartMenu: React.FC = () => {
  const { startGame } = useGame();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleStart = (difficulty: Difficulty) => {
    if (selectedMode) {
      startGame(selectedMode, difficulty);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-4 border-white relative overflow-hidden"
    >
      <div className="flex items-center justify-center w-24 h-24 bg-math-blue text-white rounded-3xl mb-6 shadow-lg shadow-blue-500/30 rotate-[-3deg]">
        <Calculator size={48} />
      </div>
      
      <h1 className="text-5xl font-display font-black text-slate-800 tracking-tight mb-2">MathPlay</h1>
      <p className="text-slate-500 text-lg mb-8 font-medium">Bora aprender brincando!</p>

      <div className="w-full relative h-[340px]">
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            <motion.div 
              key="mode-selection"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex flex-col gap-4 w-full absolute inset-0"
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full h-24 text-2xl flex flex-col items-center justify-center gap-1"
                onClick={() => setSelectedMode('result')}
              >
                <span>Descubra o Resultado</span>
                <span className="text-blue-200 text-sm font-normal tracking-widest">A + B = ?</span>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full h-24 text-2xl flex flex-col items-center justify-center gap-1"
                onClick={() => setSelectedMode('operator')}
              >
                <span>Descubra a Operação</span>
                <span className="text-amber-700 text-sm font-normal tracking-widest">A [ ? ] B = C</span>
              </Button>
              <Button 
                variant="danger" 
                size="lg" 
                className="w-full h-24 text-2xl flex flex-col items-center justify-center gap-1"
                onClick={() => setSelectedMode('logic')}
              >
                <span>Raciocínio Lógico</span>
                <span className="text-red-200 text-sm font-normal tracking-widest">Padrões e Desafios</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="diff-selection"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex flex-col gap-4 w-full absolute inset-0"
            >
              <button 
                className="absolute -top-12 left-0 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 font-bold text-sm"
                onClick={() => setSelectedMode(null)}
              >
                <ArrowLeft size={16} />
                Voltar
              </button>
              <Button 
                variant="success" 
                size="lg" 
                className="w-full flex justify-between"
                onClick={() => handleStart('easy')}
              >
                <span>Fácil</span>
                <span className="text-emerald-200 text-sm ml-2 font-normal">(+, -)</span>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full flex justify-between"
                onClick={() => handleStart('medium')}
              >
                <span>Médio</span>
                <span className="text-amber-700 text-sm ml-2 font-normal">(+, -, ×)</span>
              </Button>
              <Button 
                variant="danger" 
                size="lg" 
                className="w-full flex justify-between"
                onClick={() => handleStart('hard')}
              >
                <span>Difícil</span>
                <span className="text-red-200 text-sm ml-2 font-normal">(+, -, ×, ÷)</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
