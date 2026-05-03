import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBoard } from './ScoreBoard';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerGrid } from './AnswerGrid';
import { FeedbackBanner } from './FeedbackBanner';
import { LevelUpOverlay } from './LevelUpOverlay';

export const GameScreen: React.FC = () => {
  return (
    <>
      <LevelUpOverlay />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center w-full max-w-4xl h-full p-4 md:p-8"
      >
        <ScoreBoard />
        <QuestionDisplay />
        <AnswerGrid />
        <FeedbackBanner />
      </motion.div>
    </>
  );
};
