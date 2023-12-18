import { useMemo, useState } from 'react';
import Styles from './styles.module.css';
import { useSearchArticlesQuery } from '../../data/articles';
import { Link } from 'react-router-dom';
import { SearchOff } from '@mui/icons-material';

function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [active, setActive] = useState(false);

  const {
    data: results,
  } = useSearchArticlesQuery(`term=${searchQuery}`);

  const seaarchResults = useMemo(() => {
    const components = [];
    if (searchQuery.length) {
      results.forEach((result) => {
      const parsedDate = new Date(result.created_at);

      const idDateString = `${result.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
      const titleURL = result.title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-')

        return (
          components.push(
            <li key={result.id}>
              <Link to={`/${idDateString}/${titleURL}`}>
                <img src="bg.png" />
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
  }, [results, searchQuery]);

  return (
    <form className={`${Styles['browse-form']} ${active && Styles.active}`}>
      <div className={`${Styles['browse-text-title-input']}`}>
        <span className={`hidden ${Styles['browse-text-title']}`}>
          LOOKING FOR SOMETHING SPECIFIC?
        </span>
        <p className="hidden">
          Lorem ipsum, dolor sit amet
          consectetur adipisicing elit.
          Repudiandae, explicabo numquam velit
          inventore aliquam minus voluptate aut
          necessitatibus eaque veniam iure sed!
          Culpa, reprehenderit modi ipsam distinctio
          sunt ex quas!
        </p>
        <input
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          className="hidden"
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
      </div>
      <div className="hidden">
        {
          searchQuery.length !== 0 && results?.length !== 0 && (
            <ul className={Styles['search-results']}>
              {seaarchResults}
            </ul>
          )
        }
        {
          (searchQuery.length === 0 || results?.length === 0) && (
            <div className={Styles['search-placeholder']}>
              <SearchOff />
              <h3>NO RESULTS</h3>
            </div>
          )
        }
      </div>
    </form>
  )
}

export default Browse;
