import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import styles from './public-home.module.scss'

const PublicHome = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <section className={styles.container}>
      <article className={styles.info}>
        <div className={styles['image-container']}>
          <Image layout="fill" loading="lazy" src="/images/home-page.svg" alt="Friends" />
        </div>
      </article>

      <article className={styles.data}>
        <ul className={styles.links}>
          <li><Link href='/login'><a className={`${styles.link} ${pathname === '/login' ? styles.selected : ''}`}>Log in</a></Link></li>
          <li><Link href='/register'><a className={`${styles.link} ${pathname === '/register' ? styles.selected : ''}`}>Sign up</a></Link></li>
        </ul>

        {children}
      </article>
    </section>
  )
}

export default PublicHome
