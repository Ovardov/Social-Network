// Libraries
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
// Components
import Avatar from '../../Global/Avatar';
import ButtonsContainer from '../../Global/Buttons/ButtonsContainer';
import Button from '../../Global/Buttons/Button';
import TextAreaField from '../../Global/InputField/TextareaField';
import FileField from '../../Global/FormFields/FileField';
import Image from '../../Global/Image';
import Modal from '../../Global/Modal';
// Redux
import { addPostAction, removePostAction, updatePostAction } from '../../../redux/actions/Posts';
// Services
import { createPost, deletePost, updatePost } from '../../../services/postService';
// Form Validators
import { postValidationSchema } from '../../../formValidators/post';
// Utils
import { Colors, ActionModes, Sizes } from '../../../utils/enums';
// Models
import Post_, { PostFormData as PostFormData_ } from '../../../models/Post';
import { AppState as AppState_ } from '../../../redux';
import { UserState as UserState_ } from '../../../redux/actions/User';
// Styles
import styles from './index.module.scss';

interface Props {
  post?: Post_,
  mode: ActionModes
  modalTitle: string,
  onModalClose: () => void
}

const PostAction: FC<Props> = ({ mode, post, modalTitle, onModalClose, }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector<AppState_, UserState_>(state => state.user);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = async (data: PostFormData_, { resetForm, }: any) => {
    try {
      setIsLoading(true);

      if (mode === ActionModes.CREATE) {
        const newPost = await createPost(data) as Post_;
        dispatch(addPostAction(newPost));
      } else if (mode === ActionModes.EDIT) {
        const updatedPost = await updatePost(data, post?.id) as Post_;
        
        dispatch(updatePostAction(updatedPost));
      }

      resetForm({});
      setIsLoading(false);

      onModalClose();
    } catch (err) {
      setIsLoading(false);

      // To Do -> Custom error builder
    }
  };

  const onDeletePost = async () => {
    try {
      setIsLoading(true);

      const { id, } = post;
      await deletePost(id) as Post_;

      dispatch(removePostAction(id));
      setIsLoading(false);

      onModalClose();
    } catch (e) {
      setIsLoading(false);
      // ToDo -> Global error handling
    }
  };

  if (mode === ActionModes.DELETE) {
    return (
      <Modal
        title={modalTitle}
        onClose={onModalClose}
        hasHeader
      >
        <p>Are you sure you want to delete this post?</p>

        <ButtonsContainer
          columns={2}
          widthType='full-width'
        >
          <Button
            type='button'
            isLoading={isLoading}
            text='No'
            color={Colors.SECONDARY}
            onClickHandler={onModalClose}
          />

          <Button
            type='button'
            isLoading={isLoading}
            text='Yes'
            color={Colors.PRIMARY}
            onClickHandler={onDeletePost}
          />
        </ButtonsContainer>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={onModalClose}
      title={modalTitle}
      hasHeader
    >
      <div className={styles.container}>
        <Avatar
          type='image-with-info'
          size={Sizes.MD}
          user={user}
        />

        <Formik
          initialValues={{ content: post?.content || '', image: null, }}
          validationSchema={postValidationSchema}
          validateOnMount={true}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={onSubmit}
        >
          {({ values, errors, isValid, setFieldValue, }) => (
            <Form className={styles.form}>
              <div className={styles['form-content']}>
                {/* Content Field */}
                <Field
                  name='content'
                  placeholder='Share what you are thinking here...'
                  rows={3}
                  component={TextAreaField}
                />

                {/* Show uploaded image */}
                {(values?.image) && !errors?.image && (
                  <Image
                    removeImageHandler={() => setFieldValue('image', null)}
                    aspectRatio='16-9'
                    imageSrc={URL.createObjectURL(values?.image)}
                    imageAlt={values?.content}
                  />
                )}
              </div>

              <div className={styles['form-action']}>
                {/* Input type file */}
                <Field name='image' component={FileField} />

                {/* Submit button */}
                <ButtonsContainer
                  columns={1}
                  position='end'
                  widthType='fit-content'
                >
                  <Button
                    type='submit'
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                    text='Submit'
                    color={Colors.PRIMARY}
                  />
                </ButtonsContainer>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default PostAction;
