// Libraries
import React, { FC, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
// Components
import Icon from '../Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Images
import SearhIcon from '../../../../public/images/search-icon.svg';
import CloseIcon from '../../../../public/images/close-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  onChange: (searchValue: string) => void
}

const SearchBox: FC<Props> = ({ onChange, }) => {
  const fieldRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If field container exist and is clicked outside of
      if (fieldRef.current !== null && !fieldRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };

    if (isFocused) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isFocused]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);

    onChange(newSearchValue);
  };

  const onResetSearchValue = () => {
    setSearchValue('');
    onChange('');
  };

  return (
    <form>
      <p
        ref={fieldRef}
        className={`${styles['field-container']} ${isFocused ? styles.touched : ''}`}
      >
        <Icon
          size={Sizes.SM}
          Component={SearhIcon}
          alt='Search Icon'
          color={isFocused ? Colors.PRIMARY : Colors.TEXT}
        />

        <input
          placeholder='Search'
          className={styles['input-field']}
          value={searchValue}
          // Mouse in event
          onFocus={() => setIsFocused(true)}
          onChange={onChangeHandler}
        />

        {isFocused && (
          <span
            className={styles['reset-button']}
            onClick={onResetSearchValue}
          >
            <Icon
              size={Sizes.SM}
              Component={CloseIcon}
              alt='Close Icon'
              color={Colors.PRIMARY}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export default SearchBox;
