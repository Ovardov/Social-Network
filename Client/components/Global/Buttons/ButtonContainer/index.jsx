import styles from './button-container.module.scss'

const ButtonContainer = ({ columns, children }) => {
  return (
    <div className={styles.container} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {children}
    </div>
  )
}

export default ButtonContainer
