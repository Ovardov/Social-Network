// Libraries
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Field, Form } from 'formik'
// Components
import Avatar from '../../Global/Avatar'
import ButtonsContainer from '../../Global/Buttons/ButtonsContainer'
import Button from '../../Global/Buttons/Button'
import TextAreaField from '../../Global/InputField/TextareaField'
import FileField from '../../Global/FormFields/FileField'
import Image from '../../Global/Image'
// Form Validators
import { createPostValidationSchema } from '../../../formValidators/post'
// Models
import { AppState as AppState_ } from '../../../redux'
import { AuthState as AuthState_ } from '../../../redux/actions/Auth'
// Styles
import styles from './index.module.scss'

interface Props {
  // ToDo -> Remove Any types
  onSubmit: (data: any, { resetForm }: any) => Promise<void>
  isLoading: boolean
}

const CreatePost: FC<Props> = ({ onSubmit, isLoading }) => {
  const { authState: { user } } = useSelector<AppState_, { authState: AuthState_ }>(state => ({ authState: state.authState }));

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{ content: '', image: null }}
        validationSchema={createPostValidationSchema}
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {({ values, errors, isValid, setFieldValue }) => (
          <Form className={styles.form}>
            <Avatar
              size="md"
              imageSrc={
                user.profilePicture ? user.profilePicture.imageUrl : null
              }
              imageAlt={user.fullName}
            />

            <div className={styles['form-content']}>
              <div>
                {/* Content Field */}
                <Field
                  name="content"
                  placeholder="Share what you are thinking here..."
                  rows={2}
                  component={TextAreaField}
                />

                {/* Show uploaded image */}
                {values.image && !errors.image && (
                  <Image
                    removeImageHandler={() => setFieldValue('image', null)}
                    aspectRatio="16-9"
                    imageSrc={URL.createObjectURL(values.image)}
                    imageAlt={values.content}
                  />
                )}
              </div>

              <div className={styles['form-action']}>
                {/* Input type file */}
                <Field name="image" component={FileField} />

                {/* Submit button */}
                <ButtonsContainer
                  columns={1}
                  widthType="fit-content"
                  position="end"
                >
                  <Button
                    type="submit"
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                    text="Submit"
                    color="primary"
                  />
                </ButtonsContainer>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreatePost
