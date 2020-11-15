import PropTypes from 'prop-types'
import styles from './button-container.module.scss'

const ButtonContainer = ({ columns, widthType, position, children }) => {
  return (
    <div className={`${styles.container} ${widthType ? styles[widthType] : ''} ${position ? styles[`positon-${position}`] : ''}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  )
}

ButtonContainer.propTypes = {
  columns: PropTypes.number.isRequired,
  widthType: PropTypes.oneOf(['full-width', 'fit-content']).isRequired,
  position: PropTypes.oneOf(['start', 'end'])
}

export default ButtonContainer