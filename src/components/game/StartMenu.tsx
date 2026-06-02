import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { useGame } from '../../context/GameContext';
import type { GameMode, Grade } from '../../lib/math';
import { ArrowLeft, GraduationCap, Brain } from 'lucide-react';

export const StartMenu: React.FC = () => {
  const { startGame, selectGrade, grade } = useGame();
  const [step, setStep] = useState<'grade' | 'mode'>('grade');

  const handleSelectGrade = (selectedGrade: Grade) => {
    selectGrade(selectedGrade);
    setStep('mode');
  };

  const handleSelectMode = (mode: GameMode) => {
    startGame(mode);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-4 border-white relative overflow-hidden"
    >
      <div className="flex items-center justify-center w-20 h-20 bg-math-blue text-white rounded-3xl mb-4 shadow-lg shadow-blue-500/30 rotate-[-3deg]">
        {step === 'grade' ? <GraduationCap size={44} /> : <Brain size={44} />}
      </div>
      
      <h1 className="text-4xl font-display font-black text-slate-800 tracking-tight mb-1">MathPlay</h1>
      <p className="text-slate-500 text-base mb-6 font-medium">Bora aprender brincando!</p>

      <div className="w-full relative min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 'grade' ? (
            <motion.div 
              key="grade-selection"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex flex-col gap-3 w-full"
            >
              <h2 className="text-xl font-bold text-slate-700 text-center mb-2">Selecione o seu Ano Escolar:</h2>
              
              <Button 
                variant="primary" 
                size="md" 
                className="w-full h-18 text-xl flex flex-col items-center justify-center gap-0.5"
                onClick={() => handleSelectGrade('3')}
              >
                <span>3º Ano</span>
                <span className="text-blue-100 text-xs font-normal tracking-wide">Multiplicação e Divisão Inicial</span>
              </Button>
              
              <Button 
                variant="secondary" 
                size="md" 
                className="w-full h-18 text-xl flex flex-col items-center justify-center gap-0.5"
                onClick={() => handleSelectGrade('4')}
              >
                <span>4º Ano</span>
                <span className="text-amber-950/80 text-xs font-normal tracking-wide">Contas Avançadas e Raciocínio</span>
              </Button>
              
              <Button 
                variant="danger" 
                size="md" 
                className="w-full h-18 text-xl flex flex-col items-center justify-center gap-0.5"
                onClick={() => handleSelectGrade('5')}
              >
                <span>5º Ano</span>
                <span className="text-red-100 text-xs font-normal tracking-wide">Desafios Complexos e Expressões</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="mode-selection"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex flex-col gap-4 w-full"
            >
              <button 
                className="absolute -top-10 left-0 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 font-bold text-sm"
                onClick={() => setStep('grade')}
              >
                <ArrowLeft size={16} />
                Voltar para o Ano
              </button>
              
              <h2 className="text-xl font-bold text-slate-700 text-center mb-1">
                Escolha o Modo ({grade}º Ano):
              </h2>
              
              <Button 
                variant="success" 
                size="lg" 
                className="w-full h-24 text-xl flex flex-col items-center justify-center gap-1 text-center px-4"
                onClick={() => handleSelectMode('term')}
              >
                <span>Encontre o Termo Desconhecido</span>
                <span className="text-emerald-100 text-xs font-normal tracking-wide leading-tight">
                  Encontre números e sinais perdidos: ? + A = C, B × ? = D
                </span>
              </Button>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full h-24 text-xl flex flex-col items-center justify-center gap-1 text-center px-4"
                onClick={() => handleSelectMode('logic')}
              >
                <span>Raciocínio Lógico</span>
                <span className="text-blue-100 text-xs font-normal tracking-wide leading-tight">
                  Sequências numéricas, pesos, idades e desafios
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
