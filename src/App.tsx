import * as React from 'react';

import Calculator from './components/Calculator';
import classes from './css/classes';

const App: React.SFC = () => {
  return (
    <div className={classes.container}>
      <Calculator />
    </div>
  );
};

export default App;
