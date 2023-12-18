import { Save } from '@mui/icons-material';
import PropTypes from 'prop-types';
import BlueButton from '../BlueButton';
import PhotoSelect from '../PhotoSelect';
import Styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { useUpdateCategoryMutation } from '../../data/categories';

function EditCategory({
  id,
  name,
  image,
  description,
  onSaved,
}) {
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const [
    updateCategory,
    {
      isSuccess: categoryUpdated,
    }
  ] = useUpdateCategoryMutation();

  const saveCategory = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', updatedImage);
    formData.append('name', updatedName);
    formData.append('description', updatedDescription);

    updateCategory(formData);
  }

  useEffect(() => {
    if (categoryUpdated) {
      onSaved();
    }
  }, [categoryUpdated, onSaved]);

  return (
    <form className={Styles['edit-category-form']} onSubmit={saveCategory}>
      <div className={Styles['form-header']}>
        <span className={Styles['form-title']}>EDIT CATEGORY</span>
        <BlueButton type="submit">
          <Save />
        </BlueButton>
      </div>
      <PhotoSelect defaultValue={image} onChange={setUpdatedImage} />
      <input placeholder="Category name" value={updatedName} onChange={e => setUpdatedName(e.target.value)} />
      <textarea rows={10} placeholder="Short description" value={updatedDescription} onChange={e => setUpdatedDescription(e.target.value)} />
    </form>
  )
}

EditCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default EditCategory;
