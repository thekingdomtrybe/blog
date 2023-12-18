import Styles from './styles.module.css';

function MinisterSolutionSearchResult() {
  return (
    <li className={Styles.container}>
      <div className={Styles['solution-header']}>
        <span className={Styles.name}>SOLUTION TITLE</span>
        <button className={Styles['read-btn']}>READ</button>
      </div>
      <div className={Styles['solution-description']}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ex fugiat mollitia quia similique obcaecati! Reiciendis, saepe fugit.
        Sed, nemo quod eaque corporis id sit optio officiis alias harum et nihil.
      </div>
    </li>
  )
}

export default MinisterSolutionSearchResult;
