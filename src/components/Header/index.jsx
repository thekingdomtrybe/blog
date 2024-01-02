import { Link } from 'react-router-dom';
import Styles from './styles.module.css';
import { useGetSignedInMinisterQuery } from '../../data/ministers';
import { useGetSignedInAdminQuery } from '../../data/admin';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';

function Header() {
  const {
    data: signedInMinister,
  } = useGetSignedInMinisterQuery();

  const {
    data: signedInAdmin,
  } = useGetSignedInAdminQuery();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={Styles.header}>
      <div className={Styles.menu}>
        <button type="button" onClick={toggleMenu}>
          <Menu />
        </button>
        {
          menuOpen && (
            <div className={Styles.dropdown}>
              <Link to="https://thekingdomtrybe.church" target="_blank">
                <div className={Styles['nav-item']}>
                  <div className={Styles['nav-item-title']}>HOME</div>
                  <div className={Styles['nav-item-description']}>Our homepage</div>
                </div>
              </Link>
              <Link to="https://thekingdomtrybe.church/live" target="_blank">
                <div className={Styles['nav-item']}>
                  <div className={Styles['nav-item-title']}>SERVICE</div>
                  <div className={Styles['nav-item-description']}>Watch live</div>
                </div>
              </Link>
              <Link to="https://thekingdomtrybe.church/give" target="_blank">
                <div className={Styles['nav-item']}>
                  <div className={Styles['nav-item-title']}>GIVE</div>
                  <div className={Styles['nav-item-description']}>Donate</div>
                </div>
              </Link>
              <Link to="https://discord.com/invite/uhKb8JXpjR" target="_blank">
                <div className={Styles['nav-item']}>
                  <div className={Styles['nav-item-title']}>COMMUNITY</div>
                  <div className={Styles['nav-item-description']}>Join us</div>
                </div>
              </Link>
            </div>
          )
        }
      </div>
      <Link to="/" className={Styles.logo}>
        <img loading="lazy" src="https://i.ibb.co/gWkqhC3/favicon-white.png" alt="" className={`${Styles.favicon} ${Styles['light-mode']}`} />
        <img loading="lazy" src="https://i.ibb.co/jM6pSrF/favicon.png" alt="" className={`${Styles.favicon} ${Styles['dark-mode']}`} />
        <div className={Styles['logo-text']}>
          THE KINGDOM TRYBE
        </div>
      </Link>
      <nav className={Styles.nav}>
        <Link to="https://thekingdomtrybe.church" target="_blank">
          <div className={Styles['nav-item']}>
            <div className={Styles['nav-item-title']}>HOME</div>
            <div className={Styles['nav-item-description']}>Our homepage</div>
          </div>
        </Link>
        <Link to="https://thekingdomtrybe.church/live" target="_blank">
          <div className={Styles['nav-item']}>
            <div className={Styles['nav-item-title']}>SERVICE</div>
            <div className={Styles['nav-item-description']}>Watch live</div>
          </div>
        </Link>
        <Link to="https://thekingdomtrybe.church/give" target="_blank">
          <div className={Styles['nav-item']}>
            <div className={Styles['nav-item-title']}>GIVE</div>
            <div className={Styles['nav-item-description']}>Donate</div>
          </div>
        </Link>
        <Link to="https://discord.com/invite/uhKb8JXpjR" target="_blank">
          <div className={Styles['nav-item']}>
            <div className={Styles['nav-item-title']}>COMMUNITY</div>
            <div className={Styles['nav-item-description']}>Join us</div>
          </div>
        </Link>
      </nav>
      <div className={Styles['account-link']}>
        {
          signedInAdmin && (
            <Link to="/admin">
              ADMIN
            </Link>
          )
        }
        {
          signedInMinister && (
            <Link to={`/minister/${signedInMinister.url}`}>
              PROFILE
            </Link>
          )
        }
        {
          !signedInAdmin && !signedInMinister && (
            <Link to="/login">
              LOG IN
            </Link>
          )
        }
      </div>
    </header>
  )
}

export default Header;
