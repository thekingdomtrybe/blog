import { DarkMode, LightMode } from '@mui/icons-material';
import Styles from './styles.module.css';
import { useState } from 'react';

function ThemeSwitch() {
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  if (theme === 'light') {
    document.body.classList.add('light');
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.body.classList.remove('light');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.body.classList.add('light');
    }
  }

  return (
    <div className={Styles['theme-switch']}>
      <button type="button" onClick={toggleTheme}>
        {
          theme === 'light'
            ? <DarkMode />
            : <LightMode />
        }
      </button>
    </div>
  )
}

export default ThemeSwitch
