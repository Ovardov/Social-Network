// Libraries
import React, { useState, useMemo, FC as FC_ } from 'react';
// Components
import Modal from '../../Global/Modal';
import Image from '../../Global/Image';
// Utils
import { ComponentTypes } from '../../../utils/enums';
// Models
import Image_ from '../../../models/Image';
// Styles
import styles from './index.module.scss';

interface Props {
  images: Image_[];
  userFullName: string
  componentType: ComponentTypes
}

const Gallery: FC_<Props> = ({ images, componentType, userFullName, }) => {
  const [openedImage, setOpenedImage] = useState(null);
  
  const renderedImages = useMemo(() => {
    return images?.map((image: Image_) => {
      const { imageUrl, } = image;

      return (
        <li key={imageUrl} onClick={() => setOpenedImage(image)} className={styles['list-item']}>
          <Image aspectRatio='1-1' imageSrc={imageUrl} imageAlt={`${userFullName}'s image`} />
        </li>
      );

    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      <ul className={`${styles.list} ${componentType === ComponentTypes.LOCAL ? styles.local : styles.page}`}>
        {images?.length > 0 && renderedImages}
      </ul>

      {openedImage && (
        <Modal hasHeader={false} onClose={() => setOpenedImage(null)}>
          <Image aspectRatio='16-9' imageSrc={openedImage?.imageUrl} imageAlt={`${userFullName}'s image`} />
        </Modal>
      )}
    </>
  );
};

export default Gallery;
