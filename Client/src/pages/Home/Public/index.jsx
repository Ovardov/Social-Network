import { Link } from 'react-router-dom'
import homePageImage from '../../../../public/images/home-page.svg'
import styles from './public-home-page.module.scss'

const PublicHomePage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <img className={styles.image} src={homePageImage} alt="Friends" />

        <article className={styles.info}>
          <h1 className={styles.name}>Social Network</h1>

          <div className={styles.buttons}>
            <Link to="/register" className="button">Register</Link>
            <Link to="/login" className="button">Login</Link>
          </div>
        </article>

      </div>
    </section>
  )
}

export default PublicHomePage
