// Libraries
import React, { FC } from 'react';
import { Colors } from '../../../../utils/enums';
// Components
import Loader from '../../Loader';
// Styles
import globalButtonStyles from '../buttons.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  text: string
  color: Colors
  onClickHandler?: () => void
}

const Button: FC<Props> = ({ form, type, disabled, isLoading, text, color, onClickHandler, }) => {
  const buttonOnClickHandler = onClickHandler
    ? { onClick: onClickHandler, }
    : null;

  return (
    <button
      form={form}
      type={type}
      disabled={disabled || isLoading}
      className={`${globalButtonStyles.button} ${globalButtonStyles[`color-${color}`]
        }`}
      {...buttonOnClickHandler}
    >
      {isLoading && (
        <Loader
          type='local'
          // Set loader color, that is opposite the button color
          color={color === Colors.PRIMARY ? Colors.BACKGROUND : Colors.PRIMARY}
        />
      )}
      <span className={isLoading ? globalButtonStyles['hidden-text'] : ''}>
        {text}
      </span>
    </button>
  );
};

export default Button;
