import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { generateQuestion } from '../lib/math';
import type { Difficulty, Question, GameMode } from '../lib/math';

type GameState = 'idle' | 'playing' | 'finished';
type FeedbackState = 'correct' | 'wrong' | null;

interface GameContextType {
  gameState: GameState;
  gameMode: GameMode;
  difficulty: Difficulty;
  score: number;
  streak: number;
  currentQuestion: Question | null;
  feedback: FeedbackState;
  startGame: (mode: GameMode, diff: Difficulty) => void;
  submitAnswer: (answer: number | string) => void;
  quitGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [gameMode, setGameMode] = useState<GameMode>('result');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startGame = (mode: GameMode, diff: Difficulty) => {
    setGameMode(mode);
    setDifficulty(diff);
    setScore(0);
    setStreak(0);
    setCurrentQuestion(generateQuestion(mode, diff));
    setGameState('playing');
    setFeedback(null);
  };

  const submitAnswer = (answer: number | string) => {
    if (!currentQuestion || isProcessing) return;

    setIsProcessing(true);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      let points = 10;
      if (newStreak >= 5) points += 10;
      else if (newStreak >= 3) points += 5;
      
      setScore(prev => prev + points);
    } else {
      setFeedback('wrong');
      setStreak(0);
      setScore(prev => Math.max(0, prev - 5));
    }

    // Wait a bit to show feedback, then next question
    setTimeout(() => {
      setCurrentQuestion(generateQuestion(gameMode, difficulty));
      setFeedback(null);
      setIsProcessing(false);
    }, 1500);
  };

  const quitGame = () => {
    setGameState('idle');
    setCurrentQuestion(null);
    setFeedback(null);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      gameMode,
      difficulty,
      score,
      streak,
      currentQuestion,
      feedback,
      startGame,
      submitAnswer,
      quitGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
