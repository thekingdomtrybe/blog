import { ArrowUp, Facebook, Instagram, LinkBox, Youtube } from 'mdi-material-ui';
import Styles from './styles.module.css';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <footer className={Styles.footer}>
      <div className={Styles['line-1']} />
      <div className={Styles['line-2']} />
      <div className={Styles['line-2']} />
      <div className={Styles['line-2']} />
      <div className={Styles['line-3']} />
      <div className={Styles['line-4']} />
      <div className={Styles['line-5']} />
      <div className={Styles['footer-content']}>
        <div className={Styles['social-media-links']}>
          <span className={Styles['footer-section-heading']}>FIND US ON SOCIAL MEDIA</span>
          <ul className={Styles['social-media-links-list']}>
            <li>
              <div className={Styles.img}>
                <Facebook />
              </div>
              <a href="https://www.facebook.com/thekingdomtrybe" rel="noreferrer" target="_blank">THEKINGDOMTRYBE</a>
            </li>
            <li>
              <div className={Styles.img}>
                <Youtube />
              </div>
              <a href="https://www.youtube.com/@tktglobal" rel="noreferrer" target="_blank">@TKTGLOBAL</a>
            </li>
            <li>
              <div className={Styles.img}>
                <Instagram />
              </div>
              <a href="https://www.instagram.com/tktglobal" rel="noreferrer" target="_blank">TKTGLOBAL</a>
            </li>
            <li>
              <div className={Styles.img}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="100%"
                  fill="var(--blue-1)"
                >
                  <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                </svg>
              </div>
              <a href="https://www.tiktok.com/@tktglobal" rel="noreferrer" target="_blank">@TKTGLOBAL</a>
            </li>
          </ul>
        </div>
        <div className={Styles['useful-links']}>
          <span className={Styles['footer-section-heading']}>USEFUL LINKS</span>
          <ul className={Styles['useful-links-list']}>
            <li>
              <a href="https://thekingdomtrybe.church" rel="noreferrer" target="_blank">
                <LinkBox />
                OUR HOMEPAGE
              </a>
            </li>
            <li>
              <a href="https://thekingdomtrybe.church/privacy-policy" rel="noreferrer" target="_blank">
                <LinkBox />
                PRIVACY POLICY
              </a>
            </li>
            <li>
              <a href="https://thekingdomtrybe.church/terms-of-use" rel="noreferrer" target="_blank">
                <LinkBox />
                TERMS OF USE
              </a>
            </li>
          </ul>
        </div>
        <button type="button" onClick={scrollToTop}>
          <ArrowUp />
        </button>
      </div>
      <p className={Styles['copyright-text']}>&copy; 2023 THE KINGDOM TRYBE. ALL RIGHTS RESERVED.</p>
      <div className={Styles['line-5']} />
      <div className={Styles['line-2']} />
    </footer>
  )
}

export default Footer
