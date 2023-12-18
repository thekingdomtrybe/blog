import PropTypes from 'prop-types';
import Styles from './styles.module.css';

function CredentialInput({
  icon,
  placeholder,
  onChange,
  type,
  required,
  value,
}) {
  return (
    <div className={Styles.container}>
      <div className={Styles.icon}>
        {icon}
      </div>
      <input
        type={type}
        className={Styles.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        autoComplete="new-password"
      />
    </div>
  )
}

CredentialInput.propTypes = {
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
}

CredentialInput.defaultProps = {
  icon: <></>,
  placeholder: '',
  onChange: () =>  {},
  type: 'text',
  required: false,
  value: '',
}

export default CredentialInput
