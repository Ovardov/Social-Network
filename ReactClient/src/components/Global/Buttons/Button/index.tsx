// Libraries
import React, { FC } from 'react';
// Components
import Loader from '../../Loader';
// Styles
import globalButtonStyles from '../buttons.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  isLoading?: boolean
  text: string
  color: 'primary' | 'secondary'
  onClickHandler?: () => void
}

const Button: FC<Props> = ({ type, disabled, isLoading, text, color, onClickHandler, }) => {
  const buttonOnClickHandler = onClickHandler
    ? { onClick: onClickHandler, }
    : null;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${globalButtonStyles.button} ${
        globalButtonStyles[`color-${color}`]
      }`}
      {...buttonOnClickHandler}
    >
      {isLoading && (
        <Loader
          type='local'
          // Set loader color, that is opposite the button color
          color={color === 'primary' ? 'background' : 'primary'}
        />
      )}
      <span className={isLoading ? globalButtonStyles['hidden-text'] : ''}>
        {text}
      </span>
    </button>
  );
};

export default Button;
