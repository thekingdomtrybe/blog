import Styles from './styles.module.css';
import BlueButton from '../../components/BlueButton';
import Input from '../../components/Input';
import PhotoSelect from '../../components/PhotoSelect';
import SocialMediaLinkInput from '../../components/SocialMediaLinkInput';
import { useGetSignedInMinisterQuery, useUpdateMinisterMutation } from '../../data/ministers';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateMinisterPage() {
  const navigate = useNavigate();

  const {
    data: minister,
  } = useGetSignedInMinisterQuery();

  const [
    updateMinister,
    {
      isSuccess: isMinisterUpdateSuccess,
      isLoading: isUpdatingMinister,
    },
  ] = useUpdateMinisterMutation();

  const [updatedName, setUpdatedName] = useState(minister.name);
  const [updatedDescription, setUpdatedDescription] = useState(minister.description);

  const links = minister.links?.split(';') || [];
  const [updatedLink1, setUpdatedLink1] = useState(links[0]);
  const [updatedLink2, setUpdatedLink2] = useState(links[1]);
  const [updatedLink3, setUpdatedLink3] = useState(links[2]);

  const [updatedImageFile, setUpdatedImageFile] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', updatedImageFile);
    formData.append('id', minister.id);
    formData.append('name', updatedName);
    formData.append('description', updatedDescription);
    formData.append('links', [updatedLink1, updatedLink2, updatedLink3].join(';'));
    updateMinister(formData);
  };

  useEffect(() => {
    if (isMinisterUpdateSuccess) navigate(`/minister/${minister.url}`);
  }, [isMinisterUpdateSuccess, minister.url, navigate])

  return (
    <main className={Styles['update-minister-page']}>
      <img loading="lazy" className={`bg ${Styles.bg}`} src="bg.png" alt="" />
      <img loading="lazy" className={`bg ${Styles.bg1}`} src="bg.png" alt="" />
      <h1>CONFIGURE YOUR ACCOUNT</h1>
      <form className={Styles['update-minister-form']} onSubmit={submitForm}>
        <PhotoSelect defaultValue={minister.image.url} onChange={(file) => setUpdatedImageFile(file)} />
        <Input placeholder="Full name" defaultValue={updatedName} onChange={(e) => {setUpdatedName(e.target.value)}} />
        <textarea rows={10} placeholder="Bio" defaultValue={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
        <h2>Social Links</h2>
        <SocialMediaLinkInput defaultValue={updatedLink1} onChange={(text) => setUpdatedLink1(text)} />
        <SocialMediaLinkInput defaultValue={updatedLink2} onChange={(text) => setUpdatedLink2(text)} />
        <SocialMediaLinkInput defaultValue={updatedLink3} onChange={(text) => setUpdatedLink3(text)} />
        <BlueButton text={isUpdatingMinister ? 'SAVING CHANGES...': 'SAVE CHANGES'} type="submit" />
      </form>
    </main>
  )
}

export default UpdateMinisterPage
