// Libraries
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import Icon from '../../Global/Icon';
import Loader from '../../Global/Loader';
import InfoCard from '../../Global/InfoCard';
// Services
import { addInterest, removeInterest } from '../../../services/userService';
// Utils
import { Colors, Sizes } from '../../../utils/enums';
import { ActionModes } from '../../../utils/enums';
import { interestRegex } from '../../../utils/regex';
// Actions
import { addInterestAction, removeInterestAction } from '../../../redux/actions/User';
// Icons
import AddIcon from '../../../../public/images/add-icon.svg';
import DeleteIcon from '../../../../public/images/delete-icon.svg';
// Models
import Interest_ from '../../../models/Interest';
// Styles
import styles from './index.module.scss';

interface Props {
  interests: Interest_[],
}

const AboutInterests: FC<Props> = ({ interests, }) => {
  const dispatch = useDispatch();
  const [actionMode, setActionMode] = useState<ActionModes>(ActionModes.READ);
  const [newInterestName, setNewInterestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interestThatShownActionButtons, setInterestThatShownActionButtons] = useState(null);

  const onInterestSave = async () => {
    try {
      if (!interestRegex.test(newInterestName)) {
        return;
      }
      
      setIsLoading(true);

      const { interest, } = await addInterest({ name: newInterestName, });

      if (interest) {
        dispatch(addInterestAction(interest));
      }

      setActionMode(ActionModes.READ);
      setNewInterestName('');
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const onInterestDelete = async (interestId: string) => {
    try {
      setIsLoading(true);

      const { interest, } = await removeInterest(interestId);

      if (interest) {
        dispatch(removeInterestAction(interest));
      }

      setActionMode(ActionModes.READ);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <InfoCard title='Interests'>
      <ul className={styles.list}>
        {interests?.map(({ id, name, }: Interest_) => (
          <li
            key={name}
            className={styles.interest}
            onMouseEnter={() => setInterestThatShownActionButtons(name)}
            onMouseLeave={() => setInterestThatShownActionButtons(null)}
          >
            {interestThatShownActionButtons === name && (
              <>
                {isLoading ? (
                  <Loader type='local' color={Colors.PRIMARY} />
                ) : (
                  <Icon
                    Component={DeleteIcon}
                    alt='Delete interest icon'
                    size={Sizes.SM}
                    color={Colors.LIKE}
                    onClickHandler={() => onInterestDelete(id)}
                  />
                )}
              </>
            )}

            {interestThatShownActionButtons !== name && <>{name}</>}
          </li>
        ))}


        <li className={`${styles.interest} ${styles.add}`}>
          {isLoading ? (
            <Loader type='local' color={Colors.PRIMARY} />
          ) : (
            <>
              {actionMode === ActionModes.READ && (
                <Icon
                  Component={AddIcon}
                  alt='Add interest icon'
                  size={Sizes.SM}
                  color={Colors.PRIMARY}
                  onClickHandler={() => setActionMode(ActionModes.CREATE)}
                />
              )}

              {actionMode === ActionModes.CREATE && (
                <input
                  className={styles['name-field']}
                  onChange={(e) => setNewInterestName(e.target.value)}
                  value={newInterestName}
                  onBlur={onInterestSave}
                  autoFocus
                />
              )}
            </>
          )}
        </li>
      </ul>
    </InfoCard>
  );
};

export default AboutInterests;
