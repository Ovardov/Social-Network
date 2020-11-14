import Image from 'next/image'
import Link from 'next/link'
import styles from './public-home.module.scss'

const PublicHome = ({ children }) => {
  return (
    <section className={styles.container}>
      <article className={styles.info}>
        <div className={styles['image-container']}>
          <Image layout="fill" loading="lazy" src="/images/home-page.svg" alt="Friends" />
        </div>

        <ul className={styles.links}>
          <li><Link href='/login'><a  className={`${styles.link} ${styles.selected}`}>Login</a></Link></li>
          <li><Link href='/register'><a  className={`${styles.link}`}>Register</a></Link></li>
        </ul>
      </article>

      <article className={styles.data}>
        {children}
      </article>
    </section>
  )
}

export default PublicHome
