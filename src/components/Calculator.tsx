import React, { useState, useEffect } from 'react';

import Screen from './Screen';
import Numpad from './Numpad';
import classes from '../css/classes';

const Calculator: React.SFC = () => {
  const initialState: Array<string> = [];
  const [stack, setStack] = useState(initialState);

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
      let result = eval(stackCopy.join('')).toString();
      const digitCount = result.toString().length;
      const decimalPlaces = (result % 1).toString().length;
      if (digitCount > 10 && digitCount - decimalPlaces <= 10) {
        result = result.slice(0, 5);
      } else if (digitCount > 10) {
        result = (+result).toExponential().toString();
      }
      const resultStack: Array<string> = result.split('');
      setStack(resultStack);
    } catch (e) {
      setStack(['Invalid']);
      setTimeout(reset, 800);
    }
  };

  const handleChar = (value: string) => {
    if (stack[stack.length - 1] == 'Invalid') return;
    if (stack.length >= 10) return;
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
    return output.join('');
  };

  return (
    <div className={classes.calculator}>
      <Screen output={formatOutput()} />
      <Numpad handleChar={handleChar} reset={reset} evaluate={evaluate} />
    </div>
  );
};

export default Calculator;
