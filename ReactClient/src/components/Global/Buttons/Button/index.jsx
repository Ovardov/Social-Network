// Libraries
import React from 'react'
import PropTypes from 'prop-types'
// Styles
import globalButtonStyles from '../buttons.module.scss'

const Button = ({ type, text, color, onClickHandler, icon }) => {
  const buttonOnClickHandler = onClickHandler ? { onClick : onClickHandler } : null;

  return (
    <button type={type} className={`${globalButtonStyles.button} ${globalButtonStyles[`color-${color}`]}`}  {...buttonOnClickHandler}>
      {text}

      {icon && <span className={globalButtonStyles.icon}></span>}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  onClickHandler: PropTypes.func,
  icon: PropTypes.string
}

export default Button
