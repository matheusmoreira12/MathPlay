import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { StartMenu } from './components/game/StartMenu';
import { GameScreen } from './components/game/GameScreen';
import { VictoryScreen } from './components/game/VictoryScreen';
import { AnimatePresence } from 'framer-motion';

const GameOrchestrator: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="w-full min-h-full bg-math-bg flex items-stretch justify-center relative select-none">
      {/* Decorative background circles - wrapped to prevent scrollbar/overflow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl" />
      </div>

      <div className="z-10 w-full flex flex-col items-center justify-center py-4 px-4 md:py-6">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && <StartMenu key="start-menu" />}
          {gameState === 'playing' && <GameScreen key="game-screen" />}
          {gameState === 'finished' && <VictoryScreen key="victory-screen" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameOrchestrator />
    </GameProvider>
  );
}

export default App;
