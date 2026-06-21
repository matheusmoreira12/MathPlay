import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { generateQuestion } from '../lib/math';
import type { Difficulty, Question, GameMode, Grade } from '../lib/math';

type GameState = 'idle' | 'playing' | 'finished';
type FeedbackState = 'correct' | 'wrong' | null;
type GameResult = 'win' | 'lose' | null;

interface GameContextType {
  gameState: GameState;
  gameMode: GameMode;
  difficulty: Difficulty;
  grade: Grade;
  score: number;
  streak: number;
  lives: number;
  timeLeft: number;
  isPaused: boolean;
  gameResult: GameResult;
  currentQuestion: Question | null;
  feedback: FeedbackState;
  isLevelingUp: boolean;
  selectGrade: (grade: Grade) => void;
  startGame: (mode: GameMode) => void;
  submitAnswer: (answer: number | string) => void;
  togglePause: () => void;
  quitGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const getTimeLimitForDifficulty = (diff: Difficulty, grade: Grade): number => {
  if (grade === '3' || grade === '4') {
    if (diff === 'easy') return 50;
    if (diff === 'medium') return 40;
    return 30;
  }
  // Grade 5
  if (diff === 'easy') return 30;
  if (diff === 'medium') return 20;
  return 15;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [gameMode, setGameMode] = useState<GameMode>('term');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [grade, setGrade] = useState<Grade>('4');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isPaused, setIsPaused] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  // Countdown timer reactive effect
  useEffect(() => {
    if (gameState !== 'playing' || isPaused || feedback !== null || isLevelingUp || isProcessing) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isPaused, feedback, isLevelingUp, isProcessing, currentQuestion]);

  const selectGrade = (selectedGrade: Grade) => {
    setGrade(selectedGrade);
  };

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setDifficulty('easy');
    setScore(0);
    setStreak(0);
    setLives(3);
    setTimeLeft(getTimeLimitForDifficulty('easy', grade));
    setIsPaused(false);
    setGameResult(null);
    setCurrentQuestion(generateQuestion(mode, 'easy', grade));
    setGameState('playing');
    setFeedback(null);
    setIsLevelingUp(false);
    setIsProcessing(false);
  };

  const handleTimeout = () => {
    if (!currentQuestion || isProcessing) return;
    setIsProcessing(true);
    setFeedback('wrong');
    setStreak(0);
    setScore(prev => Math.max(0, prev - 10));
    
    setLives(prevLives => {
      const nextLives = prevLives - 1;
      if (nextLives <= 0) {
        setGameResult('lose');
        setTimeout(() => {
          setGameState('finished');
          setFeedback(null);
          setIsProcessing(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setCurrentQuestion(generateQuestion(gameMode, difficulty, grade));
          setFeedback(null);
          setTimeLeft(getTimeLimitForDifficulty(difficulty, grade));
          setIsProcessing(false);
        }, 2000);
      }
      return nextLives;
    });
  };

  const submitAnswer = (answer: number | string) => {
    if (!currentQuestion || isProcessing || isPaused) return;

    setIsProcessing(true);
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Point calculation: standard 10, bonus on streak
      let points = 10;
      if (newStreak >= 7) points += 10;
      else if (newStreak >= 3) points += 5;
      
      const newScore = score + points;
      let nextDifficulty = difficulty;
      let shouldLevelUp = false;
      let isGameWon = false;

      // Score-based progression thresholds
      if (difficulty === 'easy' && newScore >= 100) {
        nextDifficulty = 'medium';
        shouldLevelUp = true;
      } else if (difficulty === 'medium' && newScore >= 250) {
        nextDifficulty = 'hard';
        shouldLevelUp = true;
      } else if (difficulty === 'hard' && newScore >= 500) {
        isGameWon = true;
      }

      if (isGameWon) {
        setScore(newScore + 100); // 100 points victory bonus
        setGameResult('win');
        setTimeout(() => {
          setGameState('finished');
          setFeedback(null);
          setIsProcessing(false);
        }, 2000);
        return;
      }

      if (shouldLevelUp) {
        setDifficulty(nextDifficulty);
        setStreak(0);
        setIsLevelingUp(true);
        // Level up score bonus
        const finalScore = newScore + (nextDifficulty === 'medium' ? 50 : 100);
        setScore(finalScore);

        setTimeout(() => {
          setCurrentQuestion(generateQuestion(gameMode, nextDifficulty, grade));
          setFeedback(null);
          setTimeLeft(getTimeLimitForDifficulty(nextDifficulty, grade));
          setTimeout(() => {
            setIsLevelingUp(false);
            setIsProcessing(false);
          }, 2000); // level up banner duration
        }, 1500);
      } else {
        setScore(newScore);
        setTimeout(() => {
          setCurrentQuestion(generateQuestion(gameMode, difficulty, grade));
          setFeedback(null);
          setTimeLeft(getTimeLimitForDifficulty(difficulty, grade));
          setIsProcessing(false);
        }, 1500);
      }
    } else {
      setFeedback('wrong');
      setStreak(0);
      setScore(prev => Math.max(0, prev - 10));

      setLives(prevLives => {
        const nextLives = prevLives - 1;
        if (nextLives <= 0) {
          setGameResult('lose');
          setTimeout(() => {
            setGameState('finished');
            setFeedback(null);
            setIsProcessing(false);
          }, 2000);
        } else {
          setTimeout(() => {
            setCurrentQuestion(generateQuestion(gameMode, difficulty, grade));
            setFeedback(null);
            setTimeLeft(getTimeLimitForDifficulty(difficulty, grade));
            setIsProcessing(false);
          }, 1500);
        }
        return nextLives;
      });
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const quitGame = () => {
    setGameState('idle');
    setCurrentQuestion(null);
    setFeedback(null);
    setIsLevelingUp(false);
    setIsPaused(false);
    setGameResult(null);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      gameMode,
      difficulty,
      grade,
      score,
      streak,
      lives,
      timeLeft,
      isPaused,
      gameResult,
      currentQuestion,
      feedback,
      isLevelingUp,
      selectGrade,
      startGame,
      submitAnswer,
      togglePause,
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
