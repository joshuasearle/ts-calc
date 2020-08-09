import * as React from 'react';
import classes from '../css/classes';

export enum ButtonTypes {
  Number = 'numberButton',
  Operator = 'operatorButton',
  Other = 'otherButton',
}

export interface ButtonProps {
  onClick: any;
  buttonType: ButtonTypes;
}

const Button: React.SFC<ButtonProps> = ({ children, onClick, buttonType }) => {
  const classList: Array<string> = [classes.button, classes[buttonType]];

  return (
    <button className={classList.join(' ')} onClick={() => onClick(children)}>
      {children}
    </button>
  );
};

export default Button;
