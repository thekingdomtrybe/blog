import PropTypes from 'prop-types';
import Styles from './styles.module.css';

function Input({
  bold,
  placeholder,
  defaultValue,
  onChange,
}) {
  let className = Styles.input;
  if (bold) className += ` ${Styles.bold}`;

  return (
    <div className={Styles.container}>
      <input className={className} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} />
    </div>
  )
}

Input.propTypes = {
  bold: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  bold: false,
  placeholder: 'Enter Text',
  defaultValue: '',
  onChange: () => {},
}

export default Input
