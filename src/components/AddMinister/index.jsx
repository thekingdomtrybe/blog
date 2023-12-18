import { Save } from '@mui/icons-material';
import BlueButton from '../BlueButton';
import Styles from './styles.module.css';
import { useAddMinisterMutation } from '../../data/ministers';
import { useState } from 'react';
import toastr from 'toastr';

function AddMinister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [
    addMinister,
  ] = useAddMinisterMutation();

  const saveMinister = async (e) => {
    e.preventDefault();
    const response = await addMinister({
      name,
      email,
    });
    if (response.error) {
      toastr.error(response.error.data.error);
    }
    if (response.data?.id) {
      toastr.info('Minister added successfully');
      setName('');
      setEmail('');
    }
  }

  return (
    <form className={Styles['add-minister-form']} onSubmit={saveMinister}>
      <div className={Styles['form-header']}>
        <span className={Styles['form-title']}>ADD A NEW MINISTER</span>
        <BlueButton type="submit">
          <Save />
        </BlueButton>
      </div>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </form>
  )
}

export default AddMinister;
