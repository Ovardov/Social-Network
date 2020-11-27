import SiteTitle from '../Global/SiteTitle'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles['site-header']}>
      <SiteTitle />
      {/* <Search submit={handleSubmit} changeSet={setSearchName} /> */}

      {/* <div className={styles['user-info']}>
        <Avatar username={username} name={name} profilePicture={profilePicture} />

        <div className={styles.description}>
          <Link to={`/profile/${username}`} className={styles.name}>{name}</Link>
          <Link to={`/profile/${username}`} className={styles['view-profile']}>View your profile</Link>
        </div>
      </div> */}
    </header>
  )
}

export default Header
