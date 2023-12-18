import Styles from './styles.module.css';
import CredentialInput from '../../components/CredentialInput';
import BlueButton from '../../components/BlueButton';
import { LockSharp } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUpdateMinisterPasswordMutation } from '../../data/ministers';
import { useEffect, useState } from 'react';
import toastr from 'toastr';
import SmallLoader from '../../components/SmallLoader';

function SetPasswordPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [
    updateMinisterPassword,
    {
      isLoading: isSettingPassword,
      isSuccess: isPasswordSet,
    },
  ] = useUpdateMinisterPasswordMutation();

  const updatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastr.error('Passwords do not match');
      return;
    }
    const data = await updateMinisterPassword({
      minister: {
        password,
        password_confirmation: confirmPassword,
        reset_password_token: token,
      },
    });
    if (data.error) {
      toastr.error(data.error.data.message);
    } else {
      toastr.success(data.data.message);
    }
  }

  useEffect(() => {
    if (isPasswordSet) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  });

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={Styles['set-password-page']}>
      <form className={Styles['set-password-form']} onSubmit={updatePassword}>
        {
          isSettingPassword && <SmallLoader />
        }
        <h1>SET A NEW PASSWORD</h1>
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

export default SetPasswordPage
