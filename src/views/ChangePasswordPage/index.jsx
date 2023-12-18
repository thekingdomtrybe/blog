import Styles from './styles.module.css';
import CredentialInput from '../../components/CredentialInput';
import BlueButton from '../../components/BlueButton';
import { LockSharp } from '@mui/icons-material';
import { useState } from 'react';
import { useGetSignedInMinisterQuery, useUpdateMinisterMutation } from '../../data/ministers';
import Loader from '../../components/Loader/Loader';
import { Navigate } from 'react-router-dom';

function ChangePasswordPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    data: minister,
    isLoading: isMinisterLoading,
    isError: isMinisterError,
  } = useGetSignedInMinisterQuery();

  const [
    changePassword,
    {
      isLoading: isChangingPassword,
      isSuccess: isPasswordChanged,
    },
  ] = useUpdateMinisterMutation();

  if (isMinisterLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );

  if (isMinisterError) return <Navigate to="/" />

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    const data = await changePassword({
      id: minister.id,
      password,
    });
    if (data.error) {
      setErrorMessage(data.error.data.message);
    }
    // data.data.message contains success message
  };

  return (
    <main className={Styles['change-password-page']}>
      <form className={Styles['change-password-form']} onSubmit={submitForm}>
        {
          isChangingPassword && 'Loading...'
        }
        {
          errorMessage && (
            <div className={Styles['error-message']}>
              {errorMessage}
            </div>
          )
        }
        {
          isPasswordChanged && (
            <div className={Styles['success-message']}>
              Password changed successfully
            </div>
          )
        }
        <h1>SET A PASSWORD</h1>
        <CredentialInput
          type="password"
          icon={<LockSharp />}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CredentialInput
          type="password"
          icon={<LockSharp />}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <BlueButton
          text="SAVE CHANGES"
          type="submit"
        />
      </form>
    </main>
  )
}

export default ChangePasswordPage
