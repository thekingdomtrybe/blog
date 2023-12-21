import { Link } from 'react-router-dom';
import Styles from './styles.module.css';
import { useGetSignedInMinisterQuery } from '../../data/ministers';
import { useGetSignedInAdminQuery } from '../../data/admin';

function Header() {
  const {
    data: signedInMinister,
  } = useGetSignedInMinisterQuery();

  const {
    data: signedInAdmin,
  } = useGetSignedInAdminQuery();

  return (
    <header className={Styles.header}>
      <Link to="/" className={Styles.logo}>
        <img src="https://i.ibb.co/gWkqhC3/favicon-white.png" alt="" className={`${Styles.favicon} ${Styles['light-mode']}`} />
        <img src="https://i.ibb.co/jM6pSrF/favicon.png" alt="" className={`${Styles.favicon} ${Styles['dark-mode']}`} />
        <div className={Styles['logo-text']}>
          THE KINGDOM TRYBE
        </div>
      </Link>
      <nav className={Styles.nav}>
        <Link to="/events">
          <div className={Styles['nav-item']}>
            BROWSE
          </div>
        </Link>
        <Link to="/about">
          <div className={Styles['nav-item']}>
            CATEGORIES
          </div>
        </Link>
        <Link to="/ministers">
          <div className={Styles['nav-item']}>
            RECENT
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
