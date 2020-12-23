// Libraries
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const HomePage = () => {
  return (
    <div className={styles.test}>
      <Link to="/login">test</Link>
    </div>
  )
}

export default HomePage
