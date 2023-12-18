import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.module.css';

function PhotoSelect({
  defaultValue,
  onChange,
  clearImage,
}) {
  const [image, setImage] = useState(defaultValue);

  useEffect(() => {
    if (clearImage) {
      setImage(defaultValue);
    }
  }, [clearImage, defaultValue]);

  const selectImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      onChange(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    };
    input.click();
  }

  return (
    <div className={Styles['photo-select']}>
      <div className={Styles['selected-photo']}>
        {
          image && (
            <img src={image} alt="" />
          )
        }
      </div>
      <button type="button" onClick={selectImage}>CHOOSE A PICTURE</button>
    </div>
  )
}

PhotoSelect.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  clearImage: PropTypes.bool,
};

PhotoSelect.defaultProps = {
  defaultValue: null,
  onChange: () => {},
  clearImage: false,
};

export default PhotoSelect
