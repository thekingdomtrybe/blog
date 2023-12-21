import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { useDeleteMinisterMutation } from '../../data/ministers';

function MinisterListItem({
  id,
  name,
  image,
}) {
  const [
    deleteMinister,
  ] = useDeleteMinisterMutation();

  return (
    <li className={Styles.container}>
      <img loading="lazy" className={Styles.image} src={image} alt={name} />
      <span className={Styles.name}>{name}</span>
      <button className={Styles['remove-btn']} onClick={() => deleteMinister(id)}>
        <Delete />
      </button>
    </li>
  )
}

MinisterListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MinisterListItem;
