import Styles from './styles.module.css';

function MissionInfo() {
  const missionImageSrc = 'https://img.freepik.com/free-vector/gradient-geometric-background_52683-54215.jpg';

  return (
    <div className={Styles['mission-info']}>
      <div className={`hidden ${Styles['mission-img']}`}>
        <img src={missionImageSrc} alt="" />
      </div>
      <div className={Styles['mission-text']}>
        <span className={`hidden ${Styles['mission-text-heading']}`}>THE MISSION</span>
        <p className="hidden">
          The goal of this project is to proclaim the gospel
          of Christ on the Internet. The gospel, when applied
          to human living exposes a vast number of issues.
          This project aims to address these issues in an orderly
          fashion. Each issue falls into one of a broader
          category according to the area of life it sprang
          up from. Gifted and trained ministers in these
          broader areas will use the platform provided by
          this project to proffer solutions to these issues.
        </p>
      </div>
    </div>
  )
}

export default MissionInfo
