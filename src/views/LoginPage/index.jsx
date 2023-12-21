import { Link, Navigate } from 'react-router-dom';
import Styles from './styles.module.css';
import CredentialInput from '../../components/CredentialInput';
import { EmailRounded, LockSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useGetSignedInMinisterQuery, useMinisterLoginMutation } from '../../data/ministers';
import { useAdminLoginMutation, useGetSignedInAdminQuery } from '../../data/admin';
import BlueButton from '../../components/BlueButton';
import SmallLoader from '../../components/SmallLoader';
import Loader from '../../components/Loader/Loader';
import toastr from 'toastr';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentEntity, setCurrentEntity] = useState('minister');

  const {
    isLoading: isAuthenticatingMinister,
    isSuccess: isMinisterAuthenticated,
  } = useGetSignedInMinisterQuery();

  const {
    isLoading: isAuthenticatingAdmin,
    isSuccess: isAdminAuthenticated,
  } = useGetSignedInAdminQuery();

  const [
    signMinisterIn,
    {
      isLoading: isSigningInMinister,
      isError: isMinisterLoginError,
      error: ministerLoginError,
    },
  ] = useMinisterLoginMutation();

  const [
    signAdminIn,
    {
      isLoading: isSigningInAdmin,
      isError: isAdminLoginError,
      error: adminLoginError,
    },
  ] = useAdminLoginMutation();

  const ministerLogin = () => {
    signMinisterIn({
      minister: {
        email,
        password,
      }
    });
  };

  const adminLogin = () => {
    signAdminIn({
      admin: {
        email,
        password,
      }
    });
  };

  const login = (e) => {
    e.preventDefault();
    if (currentEntity === 'minister') {
      ministerLogin();
    } else {
      adminLogin();
    }
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [currentEntity]);

  useEffect(() => {
    if (isMinisterLoginError) {
      toastr.info(ministerLoginError?.data);
    }
    if (isAdminLoginError) {
      toastr.info(adminLoginError?.data);
    }
  }, [
    isMinisterLoginError,
    ministerLoginError,
    isAdminLoginError,
    adminLoginError,
  ]);

  if (isAuthenticatingMinister || isAuthenticatingAdmin) return (
    <div className="loader">
      <Loader />
    </div>
  );

  if (isMinisterAuthenticated || isAdminAuthenticated) return (
    <Navigate to="/" />
  );

  return (
    <main className={Styles['login-page']}>
      <form className={Styles['login-form']} onSubmit={login} autoComplete="off">
        <div className={Styles['form-header']}>
          <h1>LOGIN</h1>
          <div>
            {
              isSigningInMinister || isSigningInAdmin && (
                <SmallLoader />
              )
            }
          </div>
        </div>
        <div className={Styles.buttons}>
          <BlueButton
            text="AUTHOR"
            onClick={() => setCurrentEntity('minister')}
            style={{
              backgroundColor: currentEntity === 'minister' ? 'var(--white)' : '',
              color: currentEntity === 'minister' ? 'var(--blue-1)' : '',
            }}
          />
          <BlueButton
            text="ADMIN"
            onClick={() => setCurrentEntity('admin')}
            style={{
              backgroundColor: currentEntity === 'admin' ? 'var(--white)' : '',
              color: currentEntity === 'admin' ? 'var(--blue-1)' : '',
            }}
          />
        </div>
        <CredentialInput
          icon={<EmailRounded />}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
        />
        <CredentialInput
          type="password"
          icon={<LockSharp />}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />
        <BlueButton
          type="submit"
          onClick={() => {}}
          text="LOG IN"
          disabled={isSigningInMinister || isSigningInAdmin}
        />
        <Link to="/reset">FORGOT YOUR PASSWORD?</Link>
      </form>
    </main>
  )
}

export default LoginPage
