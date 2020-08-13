import React, { useState, useEffect } from 'react';

import Screen from './Screen';
import Numpad from './Numpad';
import classes from '../css/classes';

const Calculator: React.SFC = () => {
  const initialState: Array<string> = [];
  const [stack, setStack] = useState(initialState);
  console.log(stack);

  useEffect(() => {
    window.addEventListener('keydown', handleKeypress);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
    };
  });

  const handleKeypress = (e: any) => {
    if (e.key !== 'Backspace' || stack.length === 0) return;
    const top = stack[stack.length - 1];
    const newStack = [...stack];

    if (top.length === 1) {
      newStack.pop();
      setStack(newStack);
    } else {
      console.log(newStack);
      const choppedTop = top.slice(0, top.length - 1);
      newStack[newStack.length - 1] = choppedTop;
      setStack(newStack);
    }
  };

  const reset = () => {
    const newStack: Array<string> = [];
    setStack(newStack);
  };

  const evaluate = () => {
    const stackCopy: Array<string> = [...stack];
    // remove last operator to improve chance of success
    const top = stackCopy[stackCopy.length - 1];
    if (isNaN(+top) && top !== '(' && top !== ')') stackCopy.pop();

    try {
      const result = eval(stackCopy.join(''));
      const resultStack: Array<string> = [result.toString()];
      setStack(resultStack);
    } catch (e) {
      setStack(['Invalid operation']);
      setTimeout(reset, 650);
    }
  };

  const handleChar = (value: string) => {
    if (stack[stack.length - 1] == 'Invalid operation') return;
    const stackCopy = [...stack];
    stackCopy.push(value);
    setStack(stackCopy);
  };

  const formatOutput = () => {
    let output = [];
    for (let i = 0; i < stack.length; i++) {
      let top: string = output[output.length - 1];
      let current = stack[i];
      let topIsNum = !isNaN(+top);
      let currentIsNum = !isNaN(+current);

      if (i === 0) {
        output.push(stack[i]);
      } else if (topIsNum && currentIsNum) {
        output[output.length - 1] = top + current;
      } else {
        output.push(current);
      }
    }
    return output.join(' ');
  };

  return (
    <div className={classes.calculator}>
      <Screen output={formatOutput()} />
      <Numpad handleChar={handleChar} reset={reset} evaluate={evaluate} />
    </div>
  );
};

export default Calculator;
