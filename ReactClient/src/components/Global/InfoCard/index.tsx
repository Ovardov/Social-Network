// Libraries
import React, { FC } from 'react';
// Styles
import styles from './index.module.scss';

interface Props {
  title: string
}

const InfoCard: FC<Props> = ({ title, children, }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
