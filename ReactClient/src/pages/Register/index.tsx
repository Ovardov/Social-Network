// Libraries
import React, { useState, useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
// Components
import PublicHome from '../../components/PublicHome';
import InputField from '../../components/Global/InputField';
import PasswordField from '../../components/Global/InputField/PasswordField';
import Button from '../../components/Global/Buttons/Button';
import ButtonsContainer from '../../components/Global/Buttons/ButtonsContainer';
import PhotoUpload from '../../components/Global/PhotoUpload';
import ErrorsList from '../../components/Global/ErrorsList';
import MultiStepSlider from '../../components/Register/MultistepSlider';
// Hooks
// Services
import { register } from '../../services/authService';
// Form Validators
import { registerValidationSchema } from '../../formValidators/auth';
// Utils
// Styles
import styles from './index.module.scss';

const RegisterPage: React.FC<RouteComponentProps> = ({ history, }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const header = useMemo(() => {
    if (step === 1) {
      return 'Tell us more about you.';
    }

    if (step === 2) {
      return 'Secure your account.';
    }

    if (step === 3) {
      return 'Upload a profile picture.';
    }
  }, [step]);

  // ToDo -> Remove formit
  const handleNextStep = async (validateForm: any) => {
    try {
      // Validate Step
      const errors = await validateForm();

      // Go to next step if current step form is valid
      if (Object.keys(errors).length === 0) {
        setStep(step + 1);
      }
    } catch (err) {
      console.error('Error while validating register form: ', err);
    }
  };

  // ToDo -> Refactor type when remove Formik
  const handleSubmit = async (data: Object) => {
    setIsLoading(true);

    try {
      await register(data);
      setIsLogged(true);

      history.push('/');
    } catch (err) {
      // To Do -> Custom error builder
      setErrors(JSON.parse(err.message).errors);
      setIsLoading(false);
      console.error('Error while submit login form', err);
    }
  };

  return (
    <PublicHome>
      <MultiStepSlider step={step} />

      <section className={styles['register-container']}>
        <header>
          <h1 className={styles['step-info']}>{header}</h1>
        </header>

        <div className={styles['form-container']}>
          {errors.length > 0 && <ErrorsList errors={errors} />}

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              username: '',
              email: '',
              password: '',
              repeatPassword: '',
              profilePicture: null,
            }}
            validateOnChange={false}
            validateOnBlur={false}
            // Step is start from 1
            validationSchema={registerValidationSchema[step - 1]}
            onSubmit={handleSubmit}
            render={({ validateForm, setFieldValue, }) => (
              <Form className={styles.form}>
                {step === 1 && (
                  <>
                    <Field
                      type='text'
                      name='firstName'
                      label='First Name'
                      placeholder='Aleksandar'
                      component={InputField}
                    />
                    <Field
                      type='text'
                      name='lastName'
                      label='Last Name'
                      placeholder='Ovardov'
                      component={InputField}
                    />
                    <Field
                      type='text'
                      name='username'
                      label='Username'
                      placeholder='Ovardov'
                      component={InputField}
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field
                      type='email'
                      name='email'
                      label='Email'
                      placeholder='ovardov7@gmail.com'
                      component={InputField}
                    />
                    <Field
                      name='password'
                      label='Password'
                      component={PasswordField}
                    />
                    <Field
                      name='repeatPassword'
                      label='Repeat Password'
                      component={PasswordField}
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <Field
                      name='profilePicture'
                      setFieldValue={setFieldValue}
                      component={PhotoUpload}
                    />
                  </>
                )}

                <ButtonsContainer
                  columns={step === 1 ? 1 : 2}
                  widthType='full-width'
                  position='end'
                >
                  {step > 1 && (
                    <Button
                      type='button'
                      text='Back'
                      color='secondary'
                      disabled={isLoading}
                      onClickHandler={() => setStep(step - 1)}
                    />
                  )}
                  {step < 3 && (
                    <Button
                      type='button'
                      text='Next'
                      color='primary'
                      disabled={false}
                      onClickHandler={() => handleNextStep(validateForm)}
                    />
                  )}

                  {step === 3 && (
                    <Button
                      type='submit'
                      text='Register'
                      color='primary'
                      disabled={isLoading}
                      isLoading={isLoading}
                    />
                  )}
                </ButtonsContainer>
              </Form>
            )}
          />
        </div>
      </section>

      <p className={styles['additional-link-text']}>
        Already have an account?{' '}
        <Link to='/login' className={styles.link}>
          Log in
        </Link>
      </p>
    </PublicHome>
  );
};

export default RegisterPage;
