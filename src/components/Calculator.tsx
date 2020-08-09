import React, { useState, ReactText } from 'react';

import Screen from './Screen';
import Numpad from './Numpad';
import classes from '../css/classes';

const Calculator: React.SFC = () => {
  const initialState: Array<string | number> = [];
  const [stack, setStack] = useState(initialState);
  console.log(stack);

  const reset = () => {
    const newStack: Array<string> = [];
    setStack(newStack);
  };

  const evaluate = () => {
    try {
      const result = eval(stack.join(' '));
      const resultStack: Array<string> = [result.toString()];
      setStack(resultStack);
    } catch (e) {
      reset();
    }
  };

  const handleChar = (value: string) => {
    const stackCopy = [...stack];
    const n = stackCopy.length;
    const top = stack[n - 1];

    if (!isNaN(+value) && !isNaN(+top)) {
      stackCopy[n - 1] = top + value;
    } else {
      stackCopy.push(value);
    }
    setStack(stackCopy);
  };

  return (
    <div className={classes.calculator}>
      <Screen output={stack.join(' ')} />
      <Numpad handleChar={handleChar} reset={reset} evaluate={evaluate} />
    </div>
  );
};

export default Calculator;
