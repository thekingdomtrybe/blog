import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { FacebookSharp, Instagram, Twitter } from '@mui/icons-material';

function SocialMediaLinkInput({
  defaultValue,
  onChange,
}) {
  const inputElement = useRef();
  const [icon, setIcon] = useState(null);

  const addIcon = useCallback((text) => {
    const iconList = {
      ['facebook']: <FacebookSharp />,
      ['x.com']: <Twitter />,
      ['twitter']: <Twitter />,
      ['instagram']: <Instagram />
    }

    let found = false;
    Object.keys(iconList).forEach((icon) => {
      if (text.indexOf(icon) > -1) {
        found = true;
        setIcon(iconList[icon]);
      }
    });
    if (!found) setIcon(null);
  }, []);

  const inputChanged = (e) => {
    const text = e.target.value;
    addIcon(text);
    onChange(text);
  };

  useEffect(() => {
    addIcon(defaultValue);
  }, [defaultValue, addIcon]);

  return (
    <div className={Styles.container}>
      <div className={Styles.icon}>
        {icon}
      </div>
      <input
        ref={inputElement}
        className={Styles.input}
        onChange={inputChanged}
        defaultValue={defaultValue}
      />
    </div>
  )
}

SocialMediaLinkInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

SocialMediaLinkInput.defaultProps = {
  defaultValue: '',
  onChange: () => {},
}

export default SocialMediaLinkInput;
