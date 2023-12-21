import PropTypes from 'prop-types';
import Styles from './styles.module.css';
import { SearchOff } from '@mui/icons-material';
import { useSearchArticlesQuery } from '../../data/articles';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function Search({
  label,
  params,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: results,
  } = useSearchArticlesQuery(`${params}&term=${searchQuery}`);

  const searchResults = useMemo(() => {
    const components = [];
    if (results?.length) {
      results.forEach((result) => {
      const parsedDate = new Date(result.created_at);

      const idDateString = `${result.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
      const titleURL = result.title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-')

        return (
          components.push(
            <li key={result.id}>
              <Link to={`/${idDateString}/${titleURL}`}>
                <img loading="lazy" className="bg" src="/bg.png" />
                <div>
                  <div className={Styles['result-title']}>{result.title}</div>
                  <div className={Styles['result-category']}>{result.category}</div>
                </div>
              </Link>
            </li>
          )
        )
      })
    }

    return components;
  }, [results]);

  return (
    <form className={Styles.search}>
      <span className={Styles.title}>{label}</span>
      <input onChange={(e) => setSearchQuery(e.target.value)} />
      {
        (results?.length > 0 && searchQuery.length > 0) && (
          <ul className={Styles['search-results']}>
            {searchResults}
          </ul>
        )
      }
      {
        (results?.length === 0 || searchQuery.length === 0) && (
          <div className={Styles['search-placeholder']}>
            <SearchOff />
            <h3>NO RESULTS</h3>
          </div>
        )
      }
    </form>
  )
}

Search.propTypes = {
  label: PropTypes.string,
  params: PropTypes.string,
}

Search.defaultProps = {
  label: 'SEARCH THIS LIST',
  params: '',
}

export default Search;
