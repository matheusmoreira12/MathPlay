import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { StartMenu } from './components/game/StartMenu';
import { GameScreen } from './components/game/GameScreen';
import { AnimatePresence } from 'framer-motion';

const GameOrchestrator: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="w-full h-screen overflow-hidden bg-math-bg flex items-center justify-center relative select-none">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 w-full h-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'idle' ? (
            <StartMenu key="start-menu" />
          ) : (
            <GameScreen key="game-screen" />
          )}
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
