import Image from 'next/image'
import { Field } from 'formik'
import styles from './photo-upload.module.scss'

const PhotoUpload = () => {
  return (
    <div className={styles.container}>
      <span className={styles['edit-container']}>
        <span className={styles.avatar}>
          <Image layout="fill" src="/images/profile-placeholder.png" alt="Profile placeholder picture" />
        </span>

        <span className={styles['edit-icon']}>
          <Image className={styles['edit-icon']} layout="fixed" width="24" height="24" src="/images/add-icon.svg" />
        </span>
      </span>
      
      <p className={styles.message}>Only images with a size lower than 3MB are allowed.</p>

      <input className={styles.file} type="file" />
    </div>
  )
}

export default PhotoUpload
