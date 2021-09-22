import React, { useState, FC as FC_ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import ButtonContainers from '../../Global/Buttons/ButtonsContainer';
import Button from '../../Global/Buttons/Button';
import Icon from '../../Global/Icon';
// Services
import { updateUserInfo } from '../../../services/userService';
// Redux
import { UserState as UserState_, updateUserAction } from '../../../redux/actions/User';
import { AppState as AppState_ } from '../../../redux';
// Utils
import { Colors, ActionModes, Sizes } from '../../../utils/enums';
// Models
import { UserInfo as UserInfo_ } from '../../../models/User';
// Icons
import AddCircleIcon from '../../../../public/images/add-circle-icon.svg';
import EditIcon from '../../../../public/images/edit-icon.svg';
// Styles
import styles from './index.module.scss';

interface Props {
  data: {
    categoryName: string
    categoryAddText: string
    categoryDetails: string
    categoryFieldName: string
    categoryData: string
  }
}

const AboutInfoCard: FC_<Props> = ({ data, }) => {
  const { categoryName, categoryAddText, categoryDetails, categoryFieldName, categoryData, } = data;
  const dispatch = useDispatch();
  const [actionMode, setActionMode] = useState<ActionModes>(ActionModes.READ);
  const [localData, setLocalData] = useState(categoryData);

  const user = useSelector<AppState_, UserState_>(state => state.user);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const newUserInfoData = {
        [categoryFieldName]: localData,
      };

      const res = await updateUserInfo(newUserInfoData) as UserInfo_;

      if (Object.keys(res).includes(categoryFieldName) && Object.values(res).includes(localData)) {
        const action = updateUserAction({ ...user, ...res, });
        dispatch(action);
      }

      setActionMode(ActionModes.READ);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className={styles['info-card']}>
      {/* <h4 className={styles.category}>Work</h4> */}
      {!categoryData && actionMode === ActionModes.READ && (
        <button className={styles.button} onClick={() => setActionMode(ActionModes.CREATE)}>
          <Icon Component={AddCircleIcon} alt='Add Icon' size={Sizes.MD} color={Colors.PRIMARY} hasHoverEffect />
          {categoryAddText}
        </button>
      )}

      {categoryData && actionMode === ActionModes.READ && (
        <>
          <header className={styles.content}>
            <h4 className={styles['category-name']}>{categoryName}</h4>

            <p className={styles['category-info']}>{`${categoryDetails} ${categoryData}`}</p>
          </header>

          <Icon
            Component={EditIcon}
            alt='Edit Icon'
            size={Sizes.SM}
            color={Colors.PRIMARY}
            hasHoverEffect
            onClickHandler={() => setActionMode(ActionModes.EDIT)}
          />
        </>
      )}

      {(actionMode === ActionModes.CREATE || actionMode === ActionModes.EDIT) && (
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
              onClickHandler={() => setActionMode(ActionModes.READ)}
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
