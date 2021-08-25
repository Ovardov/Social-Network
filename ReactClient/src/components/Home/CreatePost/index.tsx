// Libraries
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Utils
import { PostActionModes, Sizes } from '../../../utils/enums';
// Components
import Avatar from '../../Global/Avatar';
import PostAction from '../PostAction';
// Models
import { AppState as AppState_ } from '../../../redux';
import { AuthState as AuthState_ } from '../../../redux/actions/Auth';
// Styles
import styles from './index.module.scss';

const CreatePost = () => {
  const [isInCreateMode, setIsInCreateMode] = useState(false);

  const {
    authState: { user, },
  } = useSelector<AppState_, {
    authState: AuthState_
  }>(state => ({
    authState: state.authState,
  }));

  if (isInCreateMode) {
    return (
      <PostAction
        modalTitle='Create Post'
        onModalClose={() => setIsInCreateMode(false)}
        mode={PostActionModes.CREATE}
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
