export type Difficulty = 'easy' | 'medium' | 'hard';
export type Operator = '+' | '-' | '*' | '/';
export type GameMode = 'term' | 'logic';
export type Grade = '3' | '4' | '5';
export type BlankType = 'num1' | 'num2' | 'operator' | 'result';

export interface Question {
  num1: number;
  num2: number;
  operator: Operator;
  correctAnswer: number | string;
  options: (number | string)[];
  mode: GameMode;
  resultValue: number;
  questionText?: string;
  blankType?: BlankType;
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

const generateDistractorsForValue = (correctValue: number, minVal: number = 0): number[] => {
  const distractors = new Set<number>();
  
  while (distractors.size < 3) {
    const variation = getRandomInt(-5, 5);
    let distractor = correctValue + variation;
    
    if (Math.random() > 0.7) {
      distractor = correctValue + 10;
    } else if (Math.random() > 0.7) {
      distractor = correctValue - 10;
    }

    if (distractor !== correctValue && distractor >= minVal) {
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
};

const getRandomWithDigits = (digits: number, avoidTrivial: boolean = false): number => {
  if (digits <= 1) {
    return avoidTrivial ? getRandomInt(2, 9) : getRandomInt(1, 9);
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return getRandomInt(min, max);
};

const ADD_SUB_DIGITS: Record<Grade, Record<Difficulty, number>> = {
  '3': { easy: 2, medium: 3, hard: 4 },
  '4': { easy: 2, medium: 3, hard: 4 },
  '5': { easy: 3, medium: 4, hard: 5 },
};

const MULT_DIGITS: Record<Grade, Record<Difficulty, number>> = {
  '3': { easy: 1, medium: 1, hard: 1 },
  '4': { easy: 1, medium: 1, hard: 1 },
  '5': { easy: 2, medium: 2, hard: 2 },
};

// Database with Gender for logically coherent grammar
const NAMES = [
  { name: 'Ana', gender: 'F' },
  { name: 'Maria', gender: 'F' },
  { name: 'Bia', gender: 'F' },
  { name: 'Carol', gender: 'F' },
  { name: 'Júlia', gender: 'F' },
  { name: 'João', gender: 'M' },
  { name: 'Pedro', gender: 'M' },
  { name: 'Lucas', gender: 'M' },
  { name: 'Mateus', gender: 'M' },
  { name: 'Felipe', gender: 'M' }
] as const;

const ITEMS = [
  { text: 'maçãs', gender: 'F' },
  { text: 'laranjas', gender: 'F' },
  { text: 'figurinhas', gender: 'F' },
  { text: 'bolinhas', gender: 'F' },
  { text: 'canetas', gender: 'F' },
  { text: 'carrinhos', gender: 'M' },
  { text: 'lápis', gender: 'M' },
  { text: 'balões', gender: 'M' },
  { text: 'livros', gender: 'M' },
  { text: 'cards', gender: 'M' }
] as const;

const generateLogicQuestion = (difficulty: Difficulty, grade: Grade): Partial<Question> => {
  const isTextual = Math.random() > 0.5;

  if (isTextual) {
    const char = NAMES[getRandomInt(0, NAMES.length - 1)];
    const item = ITEMS[getRandomInt(0, ITEMS.length - 1)];
    
    const pronoun = char.gender === 'F' ? 'Ela' : 'Ele';
    const pronounCont = char.gender === 'F' ? 'ela' : 'ele';
    const article = item.gender === 'F' ? 'quantas' : 'quantos';
    const articleCapital = item.gender === 'F' ? 'Quantas' : 'Quantos';

    if (difficulty === 'easy') {
      // Scale numbers by grade
      const maxNum = grade === '3' ? 15 : grade === '4' ? 30 : 50;
      const n1 = getRandomInt(5, maxNum);
      const n2 = getRandomInt(1, 10);
      
      if (Math.random() > 0.5) {
        // Addition
        return {
          questionText: `${char.name} tinha ${n1} ${item.text} e ganhou mais ${n2}. ${pronoun} tem ${article} agora?`,
          correctAnswer: n1 + n2,
          options: shuffleArray([n1 + n2, n1 + n2 + 1, n1 + n2 - 1, n1 + n2 + 2])
        };
      } else {
        // Subtraction
        const subN2 = Math.min(n2, n1);
        return {
          questionText: `${char.name} tinha ${n1} ${item.text} e deu ${subN2} para seu amigo. ${articleCapital} sobraram com ${pronounCont}?`,
          correctAnswer: n1 - subN2,
          options: shuffleArray([n1 - subN2, n1 - subN2 + 1, n1 - subN2 - 1, n1 - subN2 + 2])
        };
      }
    } else if (difficulty === 'medium') {
      if (Math.random() > 0.5) {
        // Simple multiplication text problems
        const n1 = grade === '3' ? getRandomInt(2, 5) : getRandomInt(3, 8);
        const n2 = grade === '3' ? getRandomInt(2, 5) : getRandomInt(4, 9);
        return {
          questionText: `Em uma caixa há ${n1} pacotes com ${n2} ${item.text} em cada um. ${articleCapital} ${item.text} há no total?`,
          correctAnswer: n1 * n2,
          options: shuffleArray([n1 * n2, (n1 + 1) * n2, n1 * (n2 + 1), n1 * n2 - 2])
        };
      } else {
        // Two-step problems
        const n1 = grade === '3' ? getRandomInt(10, 20) : grade === '4' ? getRandomInt(20, 50) : getRandomInt(50, 100);
        const n2 = grade === '3' ? getRandomInt(5, 10) : grade === '4' ? getRandomInt(10, 25) : getRandomInt(25, 50);
        const n3 = grade === '3' ? getRandomInt(2, 6) : grade === '4' ? getRandomInt(5, 15) : getRandomInt(10, 30);
        return {
          questionText: `${char.name} tinha ${n1} reais. Ganhou ${n2} e gastou ${n3}. Com quanto ${pronounCont} ficou?`,
          correctAnswer: n1 + n2 - n3,
          options: shuffleArray([n1 + n2 - n3, n1 + n2, n1 - n3, n1 + n2 - n3 + 5])
        };
      }
    } else {
      // Hard: Relational numerical logic problems (Heights, Ages, Weights)
      const selectedChars = shuffleArray([...NAMES]).slice(0, 3);
      const c1 = selectedChars[0];
      const c2 = selectedChars[1];
      const c3 = selectedChars[2];

      const typeChoice = getRandomInt(1, 3);
      if (typeChoice === 1) {
        // Alturas (Heights)
        const heights = grade === '3' 
          ? [140, 135, 130] 
          : grade === '4' 
            ? [155, 150, 145] 
            : [165, 158, 152];
        const h1 = heights[0];
        const h2 = heights[1];
        const h3 = heights[2];

        if (Math.random() > 0.5) {
          return {
            questionText: `${c1.name} tem ${h1}cm de altura, ${c2.name} tem ${h2}cm e ${c3.name} tem ${h3}cm. Quem é a pessoa mais alta?`,
            correctAnswer: c1.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        } else {
          return {
            questionText: `${c1.name} tem ${h1}cm de altura, ${c2.name} tem ${h2}cm e ${c3.name} tem ${h3}cm. Quem é a pessoa mais baixa?`,
            correctAnswer: c3.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        }
      } else if (typeChoice === 2) {
        // Idades (Ages)
        const ages = grade === '3' 
          ? [9, 8, 7] 
          : grade === '4' 
            ? [11, 10, 9] 
            : [12, 11, 10];
        const a1 = ages[0];
        const a2 = ages[1];
        const a3 = ages[2];

        if (Math.random() > 0.5) {
          return {
            questionText: `${c1.name} tem ${a1} anos, ${c2.name} tem ${a2} anos e ${c3.name} tem ${a3} anos. Quem é a pessoa mais velha?`,
            correctAnswer: c1.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        } else {
          return {
            questionText: `${c1.name} tem ${a1} anos, ${c2.name} tem ${a2} anos e ${c3.name} tem ${a3} anos. Quem é a pessoa mais nova?`,
            correctAnswer: c3.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        }
      } else {
        // Pesos (Weights)
        const weights = grade === '3' 
          ? [30, 27, 24] 
          : grade === '4' 
            ? [38, 34, 30] 
            : [48, 42, 38];
        const w1 = weights[0];
        const w2 = weights[1];
        const w3 = weights[2];

        if (Math.random() > 0.5) {
          return {
            questionText: `${c1.name} pesa ${w1}kg, ${c2.name} pesa ${w2}kg e ${c3.name} pesa ${w3}kg. Quem é a pessoa mais pesada?`,
            correctAnswer: c1.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        } else {
          return {
            questionText: `${c1.name} pesa ${w1}kg, ${c2.name} pesa ${w2}kg e ${c3.name} pesa ${w3}kg. Quem é a pessoa mais leve?`,
            correctAnswer: c3.name,
            options: shuffleArray([c1.name, c2.name, c3.name, 'Nenhuma'])
          };
        }
      }
    }
  } else {
    // Sequências numéricas
    let sequence: number[] = [];
    let nextValue = 0;
    
    if (difficulty === 'easy') {
      const start = getRandomInt(1, 10);
      const step = grade === '3' ? getRandomInt(2, 3) : getRandomInt(2, 5);
      const isAdd = Math.random() > 0.5;
      for (let i = 0; i < 4; i++) {
        sequence.push(isAdd ? start + i * step : (grade === '3' ? 20 : 50) - i * step);
      }
      nextValue = isAdd ? start + 4 * step : (grade === '3' ? 20 : 50) - 4 * step;
    } else if (difficulty === 'medium') {
      if (Math.random() > 0.5 && grade !== '3') {
        // Multiplicação por 2 ou 3
        const start = getRandomInt(1, 3);
        const factor = getRandomInt(2, 3);
        for (let i = 0; i < 4; i++) {
          sequence.push(start * Math.pow(factor, i));
        }
        nextValue = start * Math.pow(factor, 4);
      } else {
        // Alternada (+2, +4, +2...) ou simples saltos de 5/10 no 3º ano
        if (grade === '3') {
          const start = getRandomInt(5, 20);
          const step = 5;
          for (let i = 0; i < 4; i++) {
            sequence.push(start + i * step);
          }
          nextValue = start + 4 * step;
        } else {
          let current = getRandomInt(1, 10);
          const s1 = 2;
          const s2 = 4;
          for (let i = 0; i < 4; i++) {
            sequence.push(current);
            current += (i % 2 === 0) ? s1 : s2;
          }
          nextValue = current;
        }
      }
    } else {
      // Hard: Fibonacci ou saltos crescentes
      if (Math.random() > 0.5 && grade !== '3') {
        sequence = [1, 1, 2, 3, 5];
        nextValue = 8;
      } else {
        // Saltos crescentes (+1, +2, +3, +4...)
        let current = getRandomInt(1, 5);
        const stepStart = grade === '3' ? 1 : 2;
        for (let i = 1; i <= 5; i++) {
          sequence.push(current);
          current += (i + stepStart);
        }
        nextValue = current;
      }
    }
    
    return {
      questionText: `Complete a sequência numérica: ${sequence.join(', ')}, ?`,
      correctAnswer: nextValue,
      options: shuffleArray([nextValue, nextValue + 1, nextValue - 1, nextValue + 2])
    };
  }
};

export const generateQuestion = (mode: GameMode, difficulty: Difficulty, grade: Grade): Question => {
  if (mode === 'logic') {
    const logicData = generateLogicQuestion(difficulty, grade);
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

  // --- MODO TERMO DESCONHECIDO (term) ---
  let num1 = 0;
  let num2 = 0;
  let operator: Operator = '+';
  let numericalResult = 0;

  let isValid = false;

  while (!isValid) {
    const randOp = Math.random();
    const isFifthGrade = grade === '5';
    
    // Distribute operator probabilities
    if (randOp < 0.25 || (randOp < 0.3 && !isFifthGrade)) {
      operator = '+';
    } else if (randOp < 0.50 || (randOp < 0.6 && !isFifthGrade)) {
      operator = '-';
    } else if (randOp < 0.75 || (randOp < 0.85 && !isFifthGrade)) {
      operator = '*';
    } else {
      operator = '/';
    }

    if (operator === '+' || operator === '-') {
      const digits = ADD_SUB_DIGITS[grade][difficulty];
      num1 = getRandomWithDigits(digits);
      num2 = getRandomWithDigits(digits);
    } else if (operator === '*') {
      const digits = MULT_DIGITS[grade][difficulty];
      num1 = getRandomWithDigits(digits, true);
      num2 = getRandomWithDigits(digits, true);
    } else {
      // Division (/)
      if (grade === '3' || grade === '4') {
        const res = getRandomInt(2, 9);
        num2 = getRandomInt(2, 9);
        num1 = res * num2;
      } else {
        // 5th grade division: divisor 1-digit with result 2-digit, or divisor 2-digit with result 1-digit
        if (Math.random() > 0.5) {
          const res = getRandomInt(10, 99);
          num2 = getRandomInt(2, 9);
          num1 = res * num2;
        } else {
          const res = getRandomInt(2, 9);
          num2 = getRandomInt(10, 99);
          num1 = res * num2;
        }
      }
    }

    // Prevents negative results for subtraction
    if (operator === '-') {
      if (num1 < num2) {
        const temp = num1;
        num1 = num2;
        num2 = temp;
      }
    }

    numericalResult = calculate(num1, num2, operator);
    isValid = true;
  }

  // Choose which term of the equation to hide: num1, num2, operator, or result
  // Note: operator hide is more interesting if the numbers are small and the operands fit cleanly.
  // We hide result 40% of time, num1 20%, num2 20%, operator 20%
  const rand = Math.random();
  let blankType: BlankType = 'result';
  if (rand < 0.4) {
    blankType = 'result';
  } else if (rand < 0.6) {
    blankType = 'num1';
  } else if (rand < 0.8) {
    blankType = 'num2';
  } else {
    blankType = 'operator';
  }

  // Validate operator uniqueness if we blank out the operator
  if (blankType === 'operator') {
    const allOps: Operator[] = ['+', '-', '*', '/'];
    let validOpsCount = 0;
    for (const op of allOps) {
      if (op === '/' && num2 === 0) continue;
      if (calculate(num1, num2, op) === numericalResult) {
        validOpsCount++;
      }
    }
    // If multiple operators yield the same result (e.g. 2 + 2 = 4 and 2 * 2 = 4), default to hiding the result instead
    if (validOpsCount > 1) {
      blankType = 'result';
    }
  }

  if (blankType === 'result') {
    const distractors = generateDistractorsForValue(numericalResult);
    const options = shuffleArray([numericalResult, ...distractors]);
    return {
      num1,
      num2,
      operator,
      correctAnswer: numericalResult,
      options,
      mode: 'term',
      resultValue: numericalResult,
      blankType
    };
  } else if (blankType === 'num1') {
    const distractors = generateDistractorsForValue(num1, 1);
    const options = shuffleArray([num1, ...distractors]);
    return {
      num1,
      num2,
      operator,
      correctAnswer: num1,
      options,
      mode: 'term',
      resultValue: numericalResult,
      blankType
    };
  } else if (blankType === 'num2') {
    const distractors = generateDistractorsForValue(num2, 1);
    const options = shuffleArray([num2, ...distractors]);
    return {
      num1,
      num2,
      operator,
      correctAnswer: num2,
      options,
      mode: 'term',
      resultValue: numericalResult,
      blankType
    };
  } else {
    // operator blank
    const options = ['+', '-', '*', '/'];
    return {
      num1,
      num2,
      operator,
      correctAnswer: operator,
      options,
      mode: 'term',
      resultValue: numericalResult,
      blankType
    };
  }
};
