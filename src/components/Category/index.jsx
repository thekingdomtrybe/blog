import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { Link } from 'react-router-dom';

function Category({
  name,
  description,
  image,
}) {
  let className = Styles.container;

  return (
    <Link to={`/category/${name.toLowerCase()}`} className={className}>
      <div className={Styles['category-img']}>
        <img src={image} alt="" />
      </div>
      <div className={Styles['category-text']}>
        <span className={Styles['category-name']}>{name.toUpperCase()}</span>
        <p>
          {description}
        </p>
      </div>
    </Link>
  )
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Category;
