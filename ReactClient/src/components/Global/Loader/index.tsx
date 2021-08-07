// Libraries
import React, { FC } from 'react';
// Utils
import { Colors } from '../../../utils/enums';
// Styles
import styles from './index.module.scss';

interface Props {
  type: 'local' | 'global'
  color: Colors
}

const Loader: FC<Props> = ({ type, color, }) => {
  return (
    <span className={`${styles.container}  ${styles[`type-${type}`]}`}>
      <span className={`${styles.loader} ${styles[`color-${color}`]}`}></span>
    </span>
  );
};

export default Loader;
