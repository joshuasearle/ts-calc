import * as React from 'react';

import Screen from './Screen';
import Numpad from './Numpad';

const Calculator: React.SFC = () => {
  return (
    <div>
      <Screen />
      <Numpad />
    </div>
  );
};

export default Calculator;
