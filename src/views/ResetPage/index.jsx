import Styles from './styles.module.css';
import CredentialInput from '../../components/CredentialInput';
import { EmailSharp } from '@mui/icons-material';
import BlueButton from '../../components/BlueButton';
import { useState } from 'react';
import { useResetMinisterPasswordMutation } from '../../data/ministers';
import toastr from 'toastr';
import SmallLoader from '../../components/SmallLoader';

function ResetPage() {
  const [email, setEmail] = useState('');

  const [
    resetPassword,
    {
      isLoading: isResettingPassword,
    },
  ] = useResetMinisterPasswordMutation();

  const submitForm = async (e) => {
    e.preventDefault();
    const data = await resetPassword({
      minister: { email },
    });
    if (data.error) {
      toastr.error(data.error.data.message);
    } else {
      toastr.success(data.data.message);
    }
  };

  return (
    <main className={Styles['reset-page']}>
      <form className={Styles['reset-form']} onSubmit={submitForm}>
        {
          isResettingPassword && <SmallLoader />
        }
        <div className={Styles['form-header']}>
          <h1>FORGOT YOUR PASSWORD?</h1>
          <p>
            Enter your email address to receive password
            reset instructions
          </p>
        </div>
        <CredentialInput
          icon={<EmailSharp />}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <BlueButton text="CONTINUE" type="submit" />
      </form>
    </main>
  )
}

export default ResetPage
