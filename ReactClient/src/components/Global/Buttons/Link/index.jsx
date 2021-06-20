// Libraries
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// Styles
import globalButtonStyles from '../buttons.module.scss'

const GlobalLink = ({ href, text, color }) => {
  return (
    <Link
      className={`${globalButtonStyles.button} ${
        globalButtonStyles[`color-${color}`]
      }`}
      to={href}
    >
      {text}
    </Link>
  )
}

GlobalLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
}

export default GlobalLink
