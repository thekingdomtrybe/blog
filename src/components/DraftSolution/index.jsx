import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDeleteArticleMutation } from '../../data/articles';
import { Delete, EyeCircle } from 'mdi-material-ui';
import { Edit } from '@mui/icons-material';

function DraftSolution({
  id,
  title,
  date,
}) {
  const parsedDate = new Date(date);
  const idDateString = `${id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
  const titleURL = title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

  const [
    deleteArticle,
  ] = useDeleteArticleMutation();

  const deleteDraft =() => {
    deleteArticle(id);
  };

  return (
    <li className={Styles.container}>
      <img loading="lazy" src="/bg.png" className="bg" />
      <span className={Styles.name}>{title}</span>
      <div className={Styles.controls}>
        <Link to={`/${idDateString}/${titleURL}`} title="Read">
          <EyeCircle />
        </Link>
        <Link
          to={`/edit/${idDateString}`}
          className={Styles.btn}
          title="Edit"
        >
          <Edit />
        </Link>
        <Link onClick={deleteDraft} title="Delete">
          <Delete />
        </Link>
      </div>
    </li>
  )
}

DraftSolution.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default DraftSolution;
