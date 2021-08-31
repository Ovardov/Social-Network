// Libraries
import React, { FC, useEffect, useRef, useState } from 'react';
// Components
import Icon from '../Icon';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
// Images
import SearchIcon from '../../../../public/images/search-icon.svg';
import CloseIcon from '../../../../public/images/close-icon.svg';
import ArrowRightIcon from '../../../../public/images/arrow-right-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  onChange?: (searchValue: string) => void
  onSubmit?: (searchValue: string) => void
}

const SearchBox: FC<Props> = ({ onChange, onSubmit, }) => {
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

    if (onChange) {
      onChange(newSearchValue);
    }
  };

  const onResetSearchValue = () => {
    setSearchValue('');
    onChange('');
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(searchValue);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <p
        ref={fieldRef}
        className={`${styles['field-container']} ${isFocused ? styles.touched : ''}`}
      >
        <Icon
          size={Sizes.SM}
          Component={SearchIcon}
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
          <>
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

            {onSubmit && (
              <button
                className={styles['submit-button']}
                type='submit'
              >
                <Icon
                  size={Sizes.SM}
                  Component={ArrowRightIcon}
                  alt='Arrow Right Icon'
                  color={Colors.PRIMARY}
                />
              </button>
            )}
          </>
        )}
      </p>
    </form>
  );
};

export default SearchBox;
