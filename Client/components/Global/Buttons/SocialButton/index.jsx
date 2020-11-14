import PropTypes from 'prop-types'
import globalButtonStyles from '../buttons.module.scss'
import styles from './social-button.module.scss'

const SocialButton = ({ icon, text }) => {
  return (
    <button className={`${globalButtonStyles.button} ${styles['social-button']}`}>
      <img className={styles.icon} src={icon} />
      {text}
    </button>
  )
}

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default SocialButton
