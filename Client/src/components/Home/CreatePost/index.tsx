// Libraries
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Utils
import { ActionModes, Sizes } from '../../../utils/enums';
// Components
import Avatar from '../../Global/Avatar';
import PostAction from '../PostAction';
// Models
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_ } from '../../../redux/actions/User';
// Styles
import styles from './index.module.scss';

const CreatePost = () => {
  const [isInCreateMode, setIsInCreateMode] = useState(false);

  const user = useSelector<AppState_, UserState_>(state => state.user);


  if (isInCreateMode) {
    return (
      <PostAction
        modalTitle='Create Post'
        onModalClose={() => setIsInCreateMode(false)}
        mode={ActionModes.CREATE}
      />
    );
  }

  return (
    <div className={styles.container}>
      <Avatar
        type='image'
        size={Sizes.MD}
        user={user}
      />

      <button
        className={styles.button}
        onClick={() => setIsInCreateMode(true)}
      >
        Start a post
      </button>
    </div>
  );
};

export default CreatePost;
