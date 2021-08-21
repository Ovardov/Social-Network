import React, { useState, FC as FC_ } from 'react';
// Components
import ButtonContainers from '../../Global/Buttons/ButtonsContainer';
import Button from '../../Global/Buttons/Button';
import Icon from '../../Global/Icon';
// Utils
import { Colors, PostActionModes, Sizes } from '../../../utils/enums';
// Icons
import AddCircleIcon from '../../../../public/images/add-circle-icon.svg';
import EditIcon from '../../../../public/images/edit-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  categoryName: string
  categoryTitle: string
  data: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AboutInfoCard: FC_<Props> = ({ categoryName, categoryTitle, data, onSubmit, }) => {
  const [actionMode, setActionMode] = useState<PostActionModes>(PostActionModes.READ);
  const [localData, setLocalData] = useState(data);

  return (
    <article className={styles['info-card']}>
      {/* <h4 className={styles.category}>Work</h4> */}
      {!data && actionMode === PostActionModes.READ && (
        <button className={styles.button} onClick={() => setActionMode(PostActionModes.CREATE)}>
          <Icon Component={AddCircleIcon} alt='Add Icon' size={Sizes.MD} color={Colors.PRIMARY} hasHoverEffect />
          Add a {categoryName.toLowerCase()}
        </button>
      )}

      {data && actionMode === PostActionModes.READ && (
        <>
          <header className={styles.content}>
            <h4 className={styles['category-name']}>{categoryTitle}</h4>

            <p className={styles['category-info']}>{data}</p>
          </header>

          <Icon
            Component={EditIcon}
            alt='Edit Icon'
            size={Sizes.SM}
            color={Colors.PRIMARY}
            hasHoverEffect
            onClickHandler={() => setActionMode(PostActionModes.EDIT)}
          />
        </>
      )}

      {(actionMode === PostActionModes.CREATE || actionMode === PostActionModes.EDIT) && (
        <form onSubmit={onSubmit}>
          <input
            className={styles.input}
            name='info'
            id='user-info'
            value={localData}
            onChange={e => setLocalData(e.target.value)}
          />

          <ButtonContainers columns={2} widthType='full-width'>
            <Button
              type='button'
              text='Cancel'
              color={Colors.SECONDARY}
              onClickHandler={() => setActionMode(PostActionModes.READ)}
            />

            <Button
              type='submit'
              text='Save'
              color={Colors.PRIMARY}
            />
          </ButtonContainers>
        </form>
      )}
    </article>
  );
};

export default AboutInfoCard;
