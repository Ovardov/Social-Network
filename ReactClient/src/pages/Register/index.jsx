// Libraries
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
// Components
import PublicHome from '../../components/PublicHome'
import InputField from '../../components/Global/InputField'
import PasswordField from '../../components/Global/InputField/PasswordField'
import Button from '../../components/Global/Buttons/Button'
import ButtonContainer from '../../components/Global/Buttons/ButtonContainer'
import PhotoUpload from '../../components/Global/PhotoUpload'
import ErrorsList from '../../components/Global/ErrorsList'
// Hooks
// Services
import { register } from '../../services/authService'
// Form Validators
import { registerValidationSchema } from '../../formValidators/auth'
// Utils
// Styles
import styles from './index.module.scss'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState([])

  const handleNextStep = async (validateForm) => {
    try {
      // Validate Step
      const errors = await validateForm()

      // Go to next step if current step form is valid
      if (Object.keys(errors).length === 0) {
        setStep(step + 1)
      }
    } catch (err) {
      console.error('Error while validating register form: ', err)
    }
  }

  const handleSubmit = async (data) => {
    try {
      await register(data)
      setIsLogged(true)

      history.push('/')
    } catch (err) {
      setErrors(JSON.parse(err.message).errors)
      console.error('Error while submit login form', err)
    }
  }

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['register-container']}>
        {errors.length > 0 && <ErrorsList errors={errors} />}

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            profilePicture: null
          }}
          validateOnChange={false}
          validateOnBlur={false}
          // Step is start from 1
          validationSchema={registerValidationSchema[step - 1]}
          onSubmit={handleSubmit}
          render={({ validateForm, setFieldValue }) => (
            <Form className={styles.form}>
              {step === 1 && (
                <>
                  <Field
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="Aleksandar"
                    component={InputField}
                  />
                  <Field
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Ovardov"
                    component={InputField}
                  />
                  <Field
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Ovardov"
                    component={InputField}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="ovardov7@gmail.com"
                    component={InputField}
                  />
                  <Field
                    name="password"
                    label="Password"
                    component={PasswordField}
                  />
                  <Field
                    name="repeatPassword"
                    label="Repeat Password"
                    component={PasswordField}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <Field name="profilePicture" setFieldValue={setFieldValue} component={PhotoUpload} />
                </>
              )}

              <ButtonContainer
                columns={step === 1 ? 1 : 2}
                widthType="full-width"
                position="end"
              >
                {step > 1 && (
                  <Button
                    type="button"
                    text="Back"
                    color="secondary"
                    onClickHandler={() => setStep(step - 1)}
                  />
                )}
                {step < 3 && (
                  <Button
                    type="button"
                    text="Next"
                    color="secondary"
                    onClickHandler={() => handleNextStep(validateForm)}
                  />
                )}

                {step === 3 && (
                  <Button type="submit" text="Register" color="primary" />
                )}
              </ButtonContainer>
            </Form>
          )}
        />
      </div>

      <p className={styles['additional-link-text']}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </PublicHome>
  )
}

export default RegisterPage
