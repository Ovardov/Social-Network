// Libraries
import React, {FC} from 'react';
import { Link } from 'react-router-dom';
// Utils
import { Colors } from '../../../../utils/enums';
// Styles
import globalButtonStyles from '../buttons.module.scss';

interface Props {
  href: string
  text: string
  color: Colors
}
const GlobalLink: FC<Props> = ({ href, text, color, }) => {
  return (
    <Link
      className={`${globalButtonStyles.button} ${
        globalButtonStyles[`color-${color}`]
      }`}
      to={href}
    >
      {text}
    </Link>
  );
};

export default GlobalLink;
