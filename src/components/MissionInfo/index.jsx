import Styles from './styles.module.css';

function MissionInfo() {
  const missionImageSrc = 'https://i.ibb.co/vhX9Prf/landing-page-hero-image.jpg';

  return (
    <div className={Styles['mission-info']}>
      <div className={`hidden ${Styles['mission-img']}`}>
        <img loading="lazy" src={missionImageSrc} alt="" />
      </div>
      <div className={Styles['mission-text']}>
        <span className={`hidden ${Styles['mission-text-heading']}`}>OUR MISSION</span>
        <p className="hidden">
          Our mission is to bridge the gap between modern living and timeless wisdom.
          Through this platform, we aim to explore, dissect, and offer practical
          insights on a diverse range of topics.
          Our commitment is to inspire, inform, and foster a community that navigates
          the complexities of today&apos;s world with resilience, knowledge, and a
          renewed sense of purpose.
        </p>
      </div>
    </div>
  )
}

export default MissionInfo
