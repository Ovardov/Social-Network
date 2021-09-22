// Libraries
import React, { FC } from 'react';
// Components
import CloseButton from '../Buttons/CloseButton';
// Utils
import { Colors } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

export type Image = {
  aspectRatio: '16-9' | '4-3' | '1-1',
  imageSrc: string,
  imageAlt: string,
  removeImageHandler?: () => void,
}

const Image: FC<Image> = ({ aspectRatio, imageSrc, imageAlt, removeImageHandler, }) => {
  const aspectRatioClassName = aspectRatio
    ? `aspect-ratio-${aspectRatio}`
    : 'aspect-ratio-16-9';

  return (
    <div
      className={`${styles['image-container']} ${styles[aspectRatioClassName]}`}
    >
      {removeImageHandler &&
        <CloseButton
          color={Colors.PRIMARY}
          position='top-left'
          onClose={removeImageHandler} />
      }

      <img className={styles.image} src={imageSrc} alt={imageAlt} loading='lazy' />
    </div>
  );
};

export default Image;
