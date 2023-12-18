import { Navigate } from 'react-router-dom';
import Styles from './styles.module.css';
import { useConfirmMinisterQuery, useGetSignedInMinisterQuery } from '../../data/ministers';
import BlueButton from '../../components/BlueButton';
import Loader from '../../components/Loader/Loader';

function ConfirmAccountPage() {
  const token = new URLSearchParams(window.location.search).get('token');

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmError,
  } = useConfirmMinisterQuery(token);

  const {
    data: authorizedMinister,
    isLoading: isAuthorizedMinisterLoading,
  } = useGetSignedInMinisterQuery();

  if (isConfirming || isAuthorizedMinisterLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );
  if (authorizedMinister) return <Navigate to="/" />
  if (isConfirmError) return <Navigate to="/login" />
  if (isConfirmed) {
    return (
      <main className={Styles['confirm-account-page']}>
        <h1>ACCOUNT CONFIRMED</h1>
        <p>
          Your email address has been successfully confirmed!
          You are now logged in. Reload to continue.
        </p>
        <BlueButton onClick={() => window.location.reload()} text="RELOAD PAGE" />
      </main>
    )
  }
}

export default ConfirmAccountPage
