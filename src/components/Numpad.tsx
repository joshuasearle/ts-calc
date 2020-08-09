import * as React from 'react';

import classes from '../css/classes';
import Button, { ButtonTypes } from './Button';

interface NumpadProps {
  handleChar: (value: string) => void;
  reset: () => void;
  evaluate: () => void;
}

const Numpad: React.SFC<NumpadProps> = ({ handleChar, reset, evaluate }) => {
  const buttons = [
    '(',
    ')',
    '%',
    'AC',
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '.',
    '0',
    '=',
    '+',
  ];

  return (
    <div className={classes.numpad}>
      {buttons.map((value) => {
        if (value === 'AC') {
          return (
            <Button
              key={value}
              onClick={reset}
              buttonType={ButtonTypes.Operator}
            >
              {value}
            </Button>
          );
        }

        if (value === '=') {
          return (
            <Button
              key={value}
              onClick={evaluate}
              buttonType={ButtonTypes.Other}
            >
              {value}
            </Button>
          );
        }

        return (
          <Button
            key={value}
            onClick={handleChar}
            buttonType={
              !isNaN(+value) ? ButtonTypes.Number : ButtonTypes.Operator
            }
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
};

export default Numpad;
