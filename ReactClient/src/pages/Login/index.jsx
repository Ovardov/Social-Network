// Libraries
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
// Components
import PublicHome from '../../components/PublicHome'
import InputField from '../../components/Global/InputField'
import PasswordField from '../../components/Global/InputField/PasswordField'
import SocialButton from '../../components/Global/Buttons/SocialButton'
import LoginButton from '../../components/Global/Buttons/LoginButton'
import ButtonContainer from '../../components/Global/Buttons/ButtonContainer'
// Hooks
import { useAuth } from '../../hooks/useAuth'
// Services
import { login } from '../../services/authService'
// Form Validators
import { loginValidationSchema } from '../../formValidators/auth'
// Utils
import { authFacebookUrl, authGoogleUrl } from '../../utils/config'
// Images
import facebookIcon from '../../../public/images/facebook-icon.svg'
import googleIcon from '../../../public/images/google-icon.svg'
// Styles
import styles from './index.module.scss'

const LoginPage = () => {
  const [error, setError] = useState(false)
  const { setIsLogged } = useAuth()
  const history = useHistory()

  // Login handler
  const onSubmitHandler = async (data) => {
    try {
      const finalData = {
        emailOrUsername: data.email,
        password: data.password,
      }

      await login(finalData)
      setIsLogged(true)

      history.push('/')
    } catch (err) {
      setError(err.message)
      console.error('Error while submit login form', err)
    }
  }

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['login-container']}>
        {/* Error Box */}
        {error && (
          <p className={styles['error-container']}>
            <span className={styles['error-icon']}></span>
            {error}
          </p>
        )}

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

            <LoginButton />
          </Form>
        </Formik>

        {/* Social login buttons */}
        <div className={styles['social-container']}>
          <p className={styles['social-description']}>Easy login with</p>

          <ButtonContainer columns={2} widthType="full-width">
            <SocialButton
              href={authGoogleUrl}
              text="Google"
              icon={googleIcon}
            />
            <SocialButton
              href={authFacebookUrl}
              text="Facebook"
              icon={facebookIcon}
            />
          </ButtonContainer>
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
