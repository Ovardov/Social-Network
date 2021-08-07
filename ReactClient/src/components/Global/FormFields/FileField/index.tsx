// Libraries
import React, { FC } from 'react';
import { useFormikContext, FieldProps } from 'formik';
// Components
import Icon from '../../Icon';
import CommonErrorMessage from '../../CommonErrorMessage';
// Utils
import { Colors, Sizes } from '../../../../utils/enums';
// Images
import InsertPhotoIcon from '../../../../../public/images/insert-photo-icon.svg';
// Styles
import styles from './index.module.scss';

const FileField: FC<FieldProps> = ({ form, field, }) => {
  const { setFieldTouched, setFieldValue, } = useFormikContext();
  const errorMessage = form.errors[field.name] as string;

  return (
    <div className={styles.container}>
      <div className={styles.file}>
        <label
          className={styles.label}
          htmlFor={field.name}
          onClick={() => setFieldTouched(field.name, true)}
        >
          <Icon
            Component={InsertPhotoIcon}
            alt='Insert Photo icon'
            size={Sizes.SM}
            color={Colors.TEXT}
            hasHoverEffect={true}
            isSelected={true}
          />
        </label>

        {/* Value prop can't be set because, we are set manually value with function setFieldValue */}
        <input
          id={field.name}
          name={field.name}
          type='file'
          onChange={(e) => setFieldValue(field.name, e.currentTarget.files[0])}
          className={styles.input}
          // Needed if want to upload same file
          onClick={(e) => (e.currentTarget.value = null)}
        />
      </div>

      {errorMessage && <CommonErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default FileField;
