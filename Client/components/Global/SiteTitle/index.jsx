import Link from 'next/link'
import styles from './site-title.module.scss'

const SiteTitle = () => {
  return (
    <h1 className={styles['site-title']}>
      <Link href="/"><a className={styles.link}>SN</a></Link>
    </h1>
  )
}

export default SiteTitle
