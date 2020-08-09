import * as React from 'react';

import Screen from '../components/Screen';
import Numpad from '../components/Numpad';

const Calculator: React.SFC = () => {
  return (
    <div>
      <Screen />
      <Numpad />
    </div>
  );
};

export default Calculator;
