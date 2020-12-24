// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import globalButtonStyles from '../buttons.module.scss'

const Button = ({ type, disabled, text, color, onClickHandler }) => {
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
      {text}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  onClickHandler: PropTypes.func,
}

export default Button
