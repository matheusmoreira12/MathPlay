export type Difficulty = 'easy' | 'medium' | 'hard';
export type Operator = '+' | '-' | '*' | '/';
export type GameMode = 'result' | 'operator' | 'logic';

export interface Question {
  num1: number;
  num2: number;
  operator: Operator;
  correctAnswer: number | string;
  options: (number | string)[];
  mode: GameMode;
  resultValue: number;
  questionText?: string;
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

const generateLogicQuestion = (difficulty: Difficulty): Partial<Question> => {
  const isTextual = Math.random() > 0.5;

  if (isTextual) {
    if (difficulty === 'easy') {
      const names = ['Ana', 'Maria', 'João', 'Pedro', 'Lucas', 'Bia'];
      const name = names[getRandomInt(0, names.length - 1)];
      const items = ['maçãs', 'laranjas', 'figurinhas', 'bolinhas'];
      const item = items[getRandomInt(0, items.length - 1)];
      const n1 = getRandomInt(5, 15);
      const n2 = getRandomInt(1, 5);
      
      if (Math.random() > 0.5) {
        // Soma
        return {
          questionText: `${name} tinha ${n1} ${item} e ganhou mais ${n2}. Quantas ela tem agora?`,
          correctAnswer: n1 + n2,
          options: shuffleArray([n1 + n2, n1 + n2 + 1, n1 + n2 - 1, n1 + n2 + 2])
        };
      } else {
        // Subtração
        return {
          questionText: `${name} tinha ${n1} ${item} e deu ${n2} para seu amigo. Quantas sobraram?`,
          correctAnswer: n1 - n2,
          options: shuffleArray([n1 - n2, n1 - n2 + 1, n1 - n2 - 1, n1 - n2 + 2])
        };
      }
    } else if (difficulty === 'medium') {
      if (Math.random() > 0.5) {
        // Multiplicação simples
        const n1 = getRandomInt(2, 5);
        const n2 = getRandomInt(3, 6);
        return {
          questionText: `Em uma caixa há ${n1} pacotes com ${n2} figurinhas em cada um. Quantas figurinhas há no total?`,
          correctAnswer: n1 * n2,
          options: shuffleArray([n1 * n2, (n1 + 1) * n2, n1 * (n2 + 1), n1 * n2 - 2])
        };
      } else {
        // Dois passos
        const n1 = getRandomInt(10, 20);
        const n2 = getRandomInt(5, 10);
        const n3 = getRandomInt(2, 4);
        return {
          questionText: `Carlos tinha ${n1} reais. Ganhou ${n2} e gastou ${n3}. Com quanto ele ficou?`,
          correctAnswer: n1 + n2 - n3,
          options: shuffleArray([n1 + n2 - n3, n1 + n2, n1 - n3, n1 + n2 - n3 + 5])
        };
      }
    } else {
      // Hard: Lógica estrutural (ordem)
      const people = shuffleArray(['Ana', 'Pedro', 'Lucas', 'Bia']);
      // Ex: Ana chegou antes de Pedro. Pedro chegou antes de Lucas. Quem chegou primeiro?
      const p1 = people[0];
      const p2 = people[1];
      const p3 = people[2];
      
      if (Math.random() > 0.5) {
        return {
          questionText: `${p1} chegou antes de ${p2}, e ${p2} chegou antes de ${p3}. Quem foi o primeiro a chegar?`,
          correctAnswer: p1,
          options: shuffleArray([p1, p2, p3, people[3]])
        };
      } else {
        return {
          questionText: `${p1} é mais alto que ${p2}, e ${p2} é mais alto que ${p3}. Quem é o mais baixo?`,
          correctAnswer: p3,
          options: shuffleArray([p1, p2, p3, people[3]])
        };
      }
    }
  } else {
    // Sequências numéricas
    let sequence: number[] = [];
    let nextValue = 0;
    
    if (difficulty === 'easy') {
      const start = getRandomInt(1, 10);
      const step = getRandomInt(2, 5);
      const isAdd = Math.random() > 0.5;
      for (let i = 0; i < 4; i++) {
        sequence.push(isAdd ? start + i * step : 50 - i * step);
      }
      nextValue = isAdd ? start + 4 * step : 50 - 4 * step;
    } else if (difficulty === 'medium') {
      if (Math.random() > 0.5) {
        // Multiplicação
        const start = getRandomInt(1, 3);
        const factor = 2;
        for (let i = 0; i < 4; i++) {
          sequence.push(start * Math.pow(factor, i));
        }
        nextValue = start * Math.pow(factor, 4);
      } else {
        // Alternada (+2, +4, +2, +4...)
        let current = getRandomInt(1, 10);
        const s1 = 2;
        const s2 = 4;
        for (let i = 0; i < 4; i++) {
          sequence.push(current);
          current += (i % 2 === 0) ? s1 : s2;
        }
        nextValue = current;
      }
    } else {
      // Hard: Fibonacci ou saltos crescentes
      if (Math.random() > 0.5) {
        sequence = [1, 1, 2, 3, 5];
        nextValue = 8;
      } else {
        // Saltos crescentes (+1, +2, +3, +4...)
        let current = getRandomInt(1, 5);
        for (let i = 1; i <= 5; i++) {
          sequence.push(current);
          current += i;
        }
        nextValue = current;
      }
    }
    
    return {
      questionText: sequence.join(', ') + ', ?',
      correctAnswer: nextValue,
      options: shuffleArray([nextValue, nextValue + 1, nextValue - 1, nextValue + 2])
    };
  }
};

export const generateQuestion = (mode: GameMode, difficulty: Difficulty): Question => {
  if (mode === 'logic') {
    const logicData = generateLogicQuestion(difficulty);
    return {
      num1: 0,
      num2: 0,
      operator: '+',
      correctAnswer: logicData.correctAnswer!,
      options: logicData.options!,
      mode: 'logic',
      resultValue: typeof logicData.correctAnswer === 'number' ? logicData.correctAnswer : 0,
      questionText: logicData.questionText
    };
  }

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
