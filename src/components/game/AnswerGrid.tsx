import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/Button';

export const AnswerGrid: React.FC = () => {
  const { currentQuestion, submitAnswer, feedback } = useGame();

  if (!currentQuestion) return null;

  const formatOption = (opt: string | number) => {
    if (opt === '*') return '×';
    if (opt === '/') return '÷';
    return opt;
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl px-4">
      {currentQuestion.options.map((option, index) => {
        const variants: Array<'primary' | 'secondary' | 'danger' | 'success'> = [
          'primary', 'secondary', 'danger', 'success'
        ];

        // We override the variant when feedback is present
        let finalVariant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' = variants[index % 4];
        if (feedback) {
          if (option === currentQuestion.correctAnswer) {
            finalVariant = 'success';
          } else {
            finalVariant = 'outline';
          }
        }

        return (
          <Button
            key={`${currentQuestion.num1}-${currentQuestion.operator}-${currentQuestion.num2}-opt-${option}`}
            variant={finalVariant}
            size="xl"
            onClick={() => submitAnswer(option)}
            disabled={feedback !== null}
            className={feedback !== null ? 'opacity-80 transition-opacity' : ''}
          >
            {formatOption(option)}
          </Button>
        );
      })}
    </div>
  );
};
