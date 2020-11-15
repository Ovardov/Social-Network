import { useState } from 'react'
import Link from 'next/link'
import { Field, Form, Formik } from 'formik'
import PublicHome from '../../components/PublicHome'
import FormField from '../../components/Global/FormField'
import PasswordField from '../../components/Global/FormField/PasswordField'
import Button from '../../components/Global/Buttons/Button'
import ButtonContainer from '../../components/Global/Buttons/ButtonContainer'
import PhotoUpload from '../../components/Global/PhotoUpload'
import { loginValidationSchema } from '../../formValidators/login'
import styles from './register.module.scss'

const RegisterPage = () => {
  const [step, setStep] = useState(1)

  return (
    <PublicHome>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome back</h1>
      </header>

      <div className={styles['register-container']}>
        <Formik initialValues={{ firstName: '', lastName: '', email: '', password: '', repeatPassword: '' }} validationSchema={loginValidationSchema}>
          <Form className={styles.form}>
            {step === 1 && (
              <>
                <FormField type="text" name="firstName" label="First Name" placeholder="Aleksandar" />
                <FormField type="text" name="lastName" label="Last Name" placeholder="Ovardov" />
                <FormField type="text" name="username" label="Username" placeholder="Ovardov" />
              </>
            )}

            {step === 2 && (
              <>
                <FormField type="email" name="email" label="Email" placeholder="ovardov7@gmail.com" />
                <PasswordField name="password" label="Password" />
                <PasswordField name="repeatPassword" label="Repeat Password" />
              </>
            )}

            {step === 3 && (
              <>
                <Field component={PhotoUpload} />
              </>
            )}

            <ButtonContainer columns={step === 1 ? 1 : 2} widthType="full-width" position="end">
              {step > 1 && <Button type="button" text="Back" color="secondary" onClickHandler={() => setStep(step - 1)} />}
              {step < 3 && <Button type="button" text="Next" color="secondary" onClickHandler={() => setStep(step + 1)} />}

              {step === 3 && <Button type="submit" text="Register" color="primary" />}
            </ButtonContainer>
          </Form>
        </Formik>
      </div>

      <p className={styles['additional-link-text']}>Already have an account? <Link href='/register'><a className={styles.link}>Log in</a></Link></p>
    </PublicHome>
  )
}

export default RegisterPage
