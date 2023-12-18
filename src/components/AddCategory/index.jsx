import { Save } from '@mui/icons-material';
import BlueButton from '../BlueButton';
import PhotoSelect from '../PhotoSelect';
import Styles from './styles.module.css';
import { useCreateCategoryMutation } from '../../data/categories';
import { useEffect, useState } from 'react';
import toastr from 'toastr';

function AddCategory() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [
    createCategory,
    {
      isSuccess: categoryCreated,
    }
  ] = useCreateCategoryMutation();

  const saveCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', photo);
    formData.append('name', name);
    formData.append('description', description);

    createCategory(formData);
  }

  useEffect(() => {
    if (categoryCreated) {
      setName('');
      setDescription('');
      toastr.info('Category created!');
    }
  }, [categoryCreated]);

  return (
    <form className={Styles['add-category-form']} onSubmit={saveCategory}>
      <div className={Styles['form-header']}>
        <span className={Styles['form-title']}>ADD A NEW CATEGORY</span>
        <BlueButton type="submit">
          <Save />
        </BlueButton>
      </div>
      <PhotoSelect onChange={setPhoto} clearImage={categoryCreated} />
      <input
        placeholder="Category name"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <textarea
        rows={10}
        placeholder="Short description"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
    </form>
  )
}

export default AddCategory;
