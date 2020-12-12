// Libraries
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
// Components
import PublicHome from '../../components/PublicHome'
import FormField from '../../components/Global/FormField'
import PasswordField from '../../components/Global/FormField/PasswordField'
import SocialButton from '../../components/Global/Buttons/SocialButton'
import LoginButton from '../../components/Global/Buttons/LoginButton'
import ButtonContainer from '../../components/Global/Buttons/ButtonContainer'
// Hooks
import { useAuth } from '../../hooks/useAuth'
// Services
import { login } from '../../services/authService'
// Form Validators
import { loginValidationSchema } from '../../formValidators/login'
// Utils
import { authFacebookUrl, authGoogleUrl } from '../../utils/config'
// Images
import facebookIcon from '../../../public/images/facebook-icon.svg'
import googleIcon from '../../../public/images/google-icon.svg'
// Styles
import styles from './index.module.scss'

const LoginPage = (props) => {
  const { setIsLogged } = useAuth()

  const onSubmitHandler = async (data) => {
    try {
      const finalData = {
        emailOrUsername: data.email,
        password: data.password,
      }

      await login(finalData)
      setIsLogged(true)

      props.history.push('/')
    } catch (err) {
      console.error('Error while submit login form', err)
    }
  }

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['login-container']}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form className={styles.form}>
            <FormField
              type="email"
              name="email"
              label="Email"
              placeholder="ovardov7@gmail.com"
            />

            <PasswordField
              label="Password"
              name="password"
              showForgotPasswordLink={true}
            />

            <LoginButton />
          </Form>
        </Formik>

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
