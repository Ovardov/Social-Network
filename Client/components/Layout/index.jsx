import Header from '../Header'
import { useAuth } from '../../hooks/useAuth.js'
import styles from './layout.module.scss'

const Layout = ({ children }) => {
  const { isLogged } = useAuth()

  return (
    <div className={styles.site}>
      {/* <Header /> */}

      <main className={isLogged ? styles['site-main'] : ''}>{children}</main>
    </div>
  )
}

export default Layout
