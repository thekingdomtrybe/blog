import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { Link } from 'react-router-dom';

function MinisterInfo({
  date,
  name,
  image,
  url,
}) {
  return (
    <div className={Styles['minister-info']}>
      <div className={Styles['minister-photo']}>
        <img loading="lazy" src={image} alt="" />
      </div>
      <div className={Styles['minister-details']}>
        {
          url.length > 0 && (
            <Link to={`/minister/${url}`} className={Styles['minister-name']}>
              {name.toUpperCase()}
            </Link>
          )
        }
        {
          url.length === 0 && (
            <span className={Styles['minister-name']}>
              {name.toUpperCase()}
            </span>
          )
        }
        <span className={Styles['publication-date']}>{date}</span>
      </div>
    </div>
  )
}

MinisterInfo.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
}

MinisterInfo.defaultProps = {
  url: '',
}

export default MinisterInfo
