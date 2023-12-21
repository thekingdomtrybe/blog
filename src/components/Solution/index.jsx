import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../data/articles';

function Solution({
  displayEditControls,
  id,
  title,
  content,
  date,
  image,
  align,
}) {
  const [
    deleteArticle
  ] = useDeleteArticleMutation();

  const parser = new DOMParser();

  const parsedDate = new Date(date);

  const idDateString = `${id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
  const titleURL = title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-')

  const deleteSolution = async () => {
    await deleteArticle(id);
    window.location.reload();
  }

  const editControls = (
    <div className={Styles['edit-controls']}>
      <Link to={`/edit/${idDateString}`}>EDIT</Link>
      <Link onClick={deleteSolution}>DELETE</Link>
    </div>
  );

  let description;

  const paragraphs = parser.parseFromString(content, 'text/html').querySelectorAll('p');
  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i];
    if (p.innerText.length > 20) {
      description = p.innerText;
      break;
    }
  }

  const fallbackImage = 'https://img.freepik.com/free-vector/gradient-geometric-background_52683-54215.jpg';

  return (
    <div className={`hidden ${Styles.container} ${align === 'right' && Styles['align-right']}`}>
      <Link to={`/${idDateString}/${titleURL}`} className={Styles['solution-img']}>
        <img loading="lazy" src={image || fallbackImage} alt="" />
      </Link>
      {
        displayEditControls && editControls
      }
      <Link to={`/${idDateString}/${titleURL}`}  className={Styles['solution-info']}>
        <span className={Styles['solution-title']}>{title}</span>
        <p>
          {description}
        </p>
      </Link>
    </div>
  )
}

Solution.propTypes = {
  displayEditControls: PropTypes.bool,
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  align: PropTypes.string,
};

Solution.defaultProps = {
  displayEditControls: false,
  id: 0,
  title: '',
  content: '',
  date: '',
  align: 'left',
}

export default Solution
