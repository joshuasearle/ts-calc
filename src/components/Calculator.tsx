import * as React from 'react';

import Screen from './Screen';
import Numpad from './Numpad';
import classes from '../css/classes';

const Calculator: React.SFC = () => {
  return (
    <div className={classes.calculator}>
      <Screen output='random text' />
      <Numpad />
    </div>
  );
};

export default Calculator;
