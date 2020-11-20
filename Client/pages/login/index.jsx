import Link from 'next/link'
import { Form, Formik } from 'formik'
import PublicHome from '../../components/PublicHome'
import FormField from '../../components/Global/FormField'
import PasswordField from '../../components/Global/FormField/PasswordField'
import SocialButton from '../../components/Global/Buttons/SocialButton'
import LoginButton from '../../components/Global/Buttons/LoginButton'
import ButtonContainer from '../../components/Global/Buttons/ButtonContainer'
import { loginValidationSchema } from '../../formValidators/login'
import styles from './login.module.scss'
import { login } from '../../services/authService'

const LoginPage = () => {

  const onSubmitHandler = async(data) => {
    try {
      const finalData = {
        emailOrUsername: data.email,
        password: data.password
      }
      const res = await login(finalData)
    } catch(err) {
      console.error('Error while submit login form', err)
    }
  }

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['login-container']}>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={loginValidationSchema} onSubmit={onSubmitHandler}>
          <Form className={styles.form}>
            <FormField type="email" name="email" label="Email" placeholder="ovardov7@gmail.com" />
            <PasswordField label="Password" name="password" showForgotPasswordLink={true} />
            <LoginButton />
          </Form>
        </Formik>

        <div className={styles['social-container']}>
          <p className={styles['social-description']}>Easy login with</p>

          <ButtonContainer columns={2} widthType="full-width">
            <SocialButton text="Google" icon="/images/google-icon.svg" />
            <SocialButton text="Facebook" icon="images/facebook-icon.svg" />
          </ButtonContainer>
        </div>
      </div>

      <p className={styles['additional-link-text']}>Don't have an account yet? <Link href='/register'><a className={styles.link}>Create an account</a></Link></p>
    </PublicHome>
  )
}

export default LoginPage
