import { useEffect } from 'react'
import withAuth from '../shared/HOCs/withAuth'
import styles from './index.module.scss'

const HomePage = () => {
  useEffect(() => {
    if (window.location.hash && window.location.hash === '#_=_') {
      // Remove hash from facebook login callback
      window.location.href = window.location.href.split('#')[0]
    }
  }, [])

  return (
    <div className={styles.container}>
      <section>

      </section>

      <section> 

      </section>

      <section>

      </section>
    </div>
  )
}

export default withAuth(HomePage)