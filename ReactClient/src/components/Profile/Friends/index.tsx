// Libraries
import React, { useMemo, FC as FC_ } from 'react';
import { Link } from 'react-router-dom';
// Components
import Avatar from '../../Global/Avatar';
import Icon from '../../Global/Icon';
// Icons
import MessageIcon from '../../../../public/images/messages-icon.svg';
// Utils
import { Colors, ComponentTypes, Sizes } from '../../../utils/enums';
// Models
import User_ from '../../../models/User';
// Styles
import styles from './index.module.scss';

interface Props {
  friends: User_[];
  componentType: ComponentTypes
}

const Friends: FC_<Props> = ({ friends, componentType, }) => {
  // ToDo -> Added real data
  const home = 'NY';

  const isComponentTypePage = componentType === ComponentTypes.PAGE;

  const renderedFriends = useMemo(() => {
    return friends?.map((friend: User_) => {
      const { username, fullName, profilePicture, } = friend;

      return (
        <Link key={friend.username} to={`/profile/${username}`}>
          <div className={styles['list-item']}>
            <div className={styles['image-container']}>
              <Avatar type='image' size={Sizes.LG} name={fullName} imageSrc={profilePicture?.imageUrl} />

              {isComponentTypePage && (
                <div className={styles['message-container']}>
                  <Icon Component={MessageIcon} alt='Message Icon' color={Colors.BACKGROUND} size={Sizes.SM} />
                </div>
              )}
            </div>

            {isComponentTypePage && (
              <div className={styles.info}>
                <h4 className={`${styles.name} ${home ? '' : styles.scale}`}>{fullName}</h4>

                {home && <p className={styles['additional-info']}>Lives in {home}</p>}
              </div>
            )}
          </div>
        </Link>
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends]);

  return (
    <div className={`${styles.list} ${componentType === ComponentTypes.LOCAL ? styles.local : ''}`}>
      {friends?.length > 0 && renderedFriends}
    </div>
  );
};

export default Friends;
