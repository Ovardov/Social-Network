// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Components
import Loader from '../../Loader'
// Styles
import globalButtonStyles from '../buttons.module.scss'

const Button = ({ type, disabled, isLoading, text, color, onClickHandler }) => {
  const buttonOnClickHandler = onClickHandler
    ? { onClick: onClickHandler }
    : null

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
          type="local"
          // Set loader color, that is opposite the button color
          color={color === 'primary' ? 'background' : 'primary'}
        />
      )}
      <span className={isLoading ? globalButtonStyles['hidden-text'] : ''}>
        {text}
      </span>
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  onClickHandler: PropTypes.func,
}

export default Button
