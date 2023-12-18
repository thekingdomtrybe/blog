import PropTypes from 'prop-types';
import Styles from './styles.module.css';

function OrangeButton({
  text,
  onClick,
  type,
}) {
  return (
    <button type={type} className={Styles['orange-button']} onClick={onClick}>
      {text}
    </button>
  )
}

OrangeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

OrangeButton.defaultProps = {
  type: 'button',
}

export default OrangeButton
