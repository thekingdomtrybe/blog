import PropTypes from 'prop-types';
import Styles from './styles.module.css';

function BlueButton({
  text,
  onClick,
  type,
  children,
  title,
  style,
  disabled,
}) {
  return (
    <button
      type={type}
      className={Styles['blue-button']}
      onClick={onClick}
      title={title}
      style={style}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}

BlueButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

BlueButton.defaultProps = {
  onClick: () => {},
  type: 'button',
  children: null,
  title: '',
  text: '',
  style: {},
  disabled: false,
}

export default BlueButton;
