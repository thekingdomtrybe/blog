import { Edit } from '@mui/icons-material';
import Styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Delete } from 'mdi-material-ui';
import { useDeleteCategoryMutation } from '../../data/categories';

function CategoryListItem({
  id,
  name,
  image,
  onEdit,
  showEdit,
}) {
  const [
    deleteCategory,
  ] = useDeleteCategoryMutation();

  return (
    <li className={Styles.container}>
      <img loading="lazy" className={Styles.image} src={image} alt={name} />
      <span className={Styles.name}>{name}</span>
      {
        showEdit && (
          <button className={Styles.btn} onClick={() => onEdit(id)}>
            <Edit />
          </button>
        )
      }
      <button className={Styles.btn} onClick={() => deleteCategory(id)}>
        <Delete />
      </button>
    </li>
  )
}

CategoryListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired,
};

export default CategoryListItem;
