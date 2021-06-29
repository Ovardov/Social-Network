// Libraries
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
// Components
import PublicHome from '../../components/PublicHome'
import InputField from '../../components/Global/InputField'
import PasswordField from '../../components/Global/InputField/PasswordField'
import SocialButton from '../../components/Global/Buttons/SocialButton'
import LoginButton from '../../components/Global/Buttons/LoginButton'
import ButtonsContainer from '../../components/Global/Buttons/ButtonsContainer'
import ErrorsList from '../../components/Global/ErrorsList'
// Hooks
import { useAuth } from '../../hooks/useAuth'
// Services
import { login } from '../../services/authService'
// Form Validators
import { loginValidationSchema } from '../../formValidators/auth'
// Utils
import { authFacebookUrl, authGoogleUrl } from '../../utils/config'
// Images
import facebookIcon from '../../../public/images/facebook-icon.png'
import googleIcon from '../../../public/images/google-icon.png'
// Styles
import styles from './index.module.scss'

const LoginPage = () => {
  const { setIsLogged, setUser } = useAuth()
  const history = useHistory()
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  // Login handler
  // ToDo -> Remove Any type
  const onSubmitHandler = async (data: any) => {
    setIsLoading(true)
    setIsDisabled(true)

    try {
      const finalData = {
        email: data.email,
        password: data.password,
      }

      const userData = await login(finalData)
      setUser(userData)
      setIsLogged(true)

      history.push('/')
    } catch (err) {
      // To Do -> Custom error builder
      setErrors(JSON.parse(err.message).errors)

      setIsLoading(false)
      setIsDisabled(false)

      console.error('Error while submit login form', err)
    }
  }

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['login-container']}>
        {/* Errors Box */}
        {errors.length > 0 && <ErrorsList errors={errors} />}

        {/* Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmitHandler}
        >
          <Form className={styles.form}>
            <Field
              type="email"
              name="email"
              label="Email"
              placeholder="ovardov7@gmail.com"
              component={InputField}
            />

            <Field
              label="Password"
              name="password"
              showForgotPasswordLink={true}
              component={PasswordField}
            />

            <LoginButton disabled={isDisabled} isLoading={isLoading} />
          </Form>
        </Formik>

        {/* Social login buttons */}
        <div className={styles['social-container']}>
          <p className={styles['social-description']}>Easy login with</p>

          <ButtonsContainer columns={2} widthType="full-width">
            <SocialButton
              href={authGoogleUrl}
              text="Google"
              iconSrc={googleIcon}
              iconAlt="Google Icon"
              setIsDisabled={setIsDisabled}
              disabled={isDisabled}
            />
            <SocialButton
              href={authFacebookUrl}
              text="Facebook"
              iconSrc={facebookIcon}
              iconAlt="Facebook Icon"
              setIsDisabled={setIsDisabled}
              disabled={isDisabled}
            />
          </ButtonsContainer>
        </div>
      </div>

      {/* Register link */}
      <p className={styles['additional-link-text']}>
        Don't have an account yet?{' '}
        <Link to="/register" className={styles.link}>
          Create an account
        </Link>
      </p>
    </PublicHome>
  )
}

export default LoginPage
