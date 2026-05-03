export type Difficulty = 'easy' | 'medium' | 'hard';
export type Operator = '+' | '-' | '*' | '/';
export type GameMode = 'result' | 'operator';

export interface Question {
  num1: number;
  num2: number;
  operator: Operator;
  correctAnswer: number | string;
  options: (number | string)[];
  mode: GameMode;
  resultValue: number;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateDistractors = (correctAnswer: number): number[] => {
  const distractors = new Set<number>();
  
  while (distractors.size < 3) {
    const variation = getRandomInt(-5, 5);
    let distractor = correctAnswer + variation;
    
    // Some logic for common mistakes
    if (Math.random() > 0.7) {
      distractor = correctAnswer + 10;
    } else if (Math.random() > 0.7) {
      distractor = correctAnswer - 10;
    }

    if (distractor !== correctAnswer && distractor >= 0) {
      distractors.add(distractor);
    }
  }

  return Array.from(distractors);
};

const calculate = (n1: number, n2: number, op: Operator): number => {
  switch (op) {
    case '+': return n1 + n2;
    case '-': return n1 - n2;
    case '*': return n1 * n2;
    case '/': return n1 / n2;
  }
}

export const generateQuestion = (mode: GameMode, difficulty: Difficulty): Question => {
  let num1 = 0;
  let num2 = 0;
  let operator: Operator = '+';
  let numericalResult = 0;

  let isValid = false;

  while (!isValid) {
    if (difficulty === 'easy') {
      operator = Math.random() > 0.5 ? '+' : '-';
      num1 = getRandomInt(1, 10);
      num2 = getRandomInt(1, 10);
    } else if (difficulty === 'medium') {
      const ops: Operator[] = ['+', '-', '*'];
      operator = ops[getRandomInt(0, 2)];
      num1 = getRandomInt(1, 20);
      num2 = getRandomInt(1, 20);
      if (operator === '*') {
        num1 = getRandomInt(2, 10);
        num2 = getRandomInt(2, 10);
      }
    } else {
      const ops: Operator[] = ['+', '-', '*', '/'];
      operator = ops[getRandomInt(0, 3)];
      num1 = getRandomInt(10, 100);
      num2 = getRandomInt(10, 100);
      if (operator === '*') {
        num1 = getRandomInt(2, 12);
        num2 = getRandomInt(2, 12);
      } else if (operator === '/') {
        // Ensure exact division
        const result = getRandomInt(2, 12);
        num2 = getRandomInt(2, 12);
        num1 = result * num2; 
      }
    }

    // Ensure no negative results for subtraction
    if (operator === '-') {
      if (num1 < num2) {
        const temp = num1;
        num1 = num2;
        num2 = temp;
      }
    }

    numericalResult = calculate(num1, num2, operator);

    if (mode === 'operator') {
      // Rule: There must be ONLY ONE operator that yields this exact result for these two numbers
      const allOps: Operator[] = ['+', '-', '*', '/'];
      let validOpsCount = 0;
      
      for (const op of allOps) {
        // avoid division by zero just in case (though n2 is always >= 1 here)
        if (op === '/' && num2 === 0) continue; 
        if (calculate(num1, num2, op) === numericalResult) {
          validOpsCount++;
        }
      }

      if (validOpsCount === 1) {
        isValid = true;
      }
    } else {
      isValid = true;
    }
  }

  if (mode === 'result') {
    const distractors = generateDistractors(numericalResult);
    const options = shuffleArray([numericalResult, ...distractors]);
    return {
      num1,
      num2,
      operator,
      correctAnswer: numericalResult,
      options,
      mode,
      resultValue: numericalResult
    };
  } else {
    // Mode is operator
    // The options are always the 4 operators
    const options = ['+', '-', '*', '/'];
    return {
      num1,
      num2,
      operator,
      correctAnswer: operator,
      options,
      mode,
      resultValue: numericalResult
    };
  }
};
