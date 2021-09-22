// Libraries
import React, { useCallback, Component, FC} from 'react';
// Images
import PersonIcon from '../../../../public/images/person-icon.svg';
import LockIcon from '../../../../public/images/lock-icon.svg';
import InsertPhotoIcon from '../../../../public/images/insert-photo-small-icon.svg';
// Styles
import styles from './multi-step-slider.module.scss';

interface Props {
  step: number
}

const renderSlides = (slideIconComponents: Component[], step: number) => {
  return slideIconComponents.map((IconComponent: Component, index: number) => {
    const iconPosition = index + 1;

    return (
      <li
        key={index}
        className={`${styles.slide} ${
          step === iconPosition ? styles.active : ''
        } ${step > iconPosition ? styles.filled : ''}`}
      >
        <IconComponent className={styles.icon} />
      </li>
    );
  });
};

const MultiStepSlider: FC<Props> = ({ step, }) => {
  // Define Icon components
  const slideIconComponents = [PersonIcon, LockIcon, InsertPhotoIcon];

  // Memoize render funcion
  const renderAllSlides = useCallback(() => {
    return renderSlides(slideIconComponents, step);
  }, [slideIconComponents, step]);

  return (
    <ul className={styles.slider}>
      <div className={styles['progress-track']} />
      <div className={`${styles['progress-bar']} ${styles[`step-${step}`]}`} />

      {renderAllSlides()}
    </ul>
  );
};

export default MultiStepSlider;
