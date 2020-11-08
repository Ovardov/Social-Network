import Link from 'next/link'
import Image from 'next/image'
import styles from './index.module.scss'

const PublicHomePage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles['image-container']}>
          <Image layout="fill" loading="lazy" src='/images/home-page.svg' alt="Friends" />
        </div>

        <article className={styles.info}>
          <h1 className={styles.name}>Social Network</h1>

          <div className={styles.buttons}>
            <Link href="/register"><a className="button">Register</a></Link>
            <Link href="/login"><a className="button">Login</a></Link>
          </div>
        </article>

      </div>
    </section>
  )
}

export default PublicHomePage
