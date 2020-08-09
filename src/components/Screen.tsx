import * as React from 'react';

import classes from '../css/classes';

interface ScreenProps {
  output: string;
}

const Screen: React.SFC<ScreenProps> = ({ output }) => {
  return (
    <div className={classes.screen}>
      <p className={classes.screenOutput}>{output ? output : '0'}</p>
    </div>
  );
};

export default Screen;
