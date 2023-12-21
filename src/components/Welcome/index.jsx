import Styles from './styles.module.css';

function Welcome() {
  return (
    <div className={Styles.container}>
      <h1 className="hidden">THE KINGDOM TRYBE BLOG</h1>
      <p className="hidden">
        The gospel, when applied to human living
        exposes a vast number of issues. This
        project aims to address these issues in
        an orderly fashion. Each issue falls into
        one of a broader category according to the
        area of life it sprang up from. Gifted and
        trained ministers in these broader areas will
        use the platform provided by this project to
        proffer solutions to these issues.
      </p>
      <img className={`bg ${Styles['bg-1']}`} alt="" src="bg.png" />
      <img className={`bg ${Styles['bg-2']}`} alt="" src="bg.png" />
      <img className={`bg ${Styles['bg-3']}`} alt="" src="bg.png" />
    </div>
  )
}

export default Welcome
