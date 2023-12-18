import { Link, useParams } from 'react-router-dom';
import MinisterInfo from '../../components/MinisterInfo';
import Solution from '../../components/Solution';
import Styles from './styles.module.css';
import { useIndexArticlesQuery, useReadArticleQuery } from '../../data/articles';
import { Notes } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';

function ReadPage() {
  const parser = new DOMParser();
  const { id } = useParams();

  const {
    data,
    isLoading,
  } = useReadArticleQuery(id);

  const {
    data: similarArticles,
    isLoading: similarArticlesLoading,
  } = useIndexArticlesQuery(`category_id=${data?.category?.id}`);

  if (isLoading || similarArticlesLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );
  const articleDate = new Date(data.article.created_at).toDateString();

  const articlesToDisplay = similarArticles?.filter((article) => article.id !== Number(id.split('-')[0]));

  return (
    <main className={Styles['read-page']}>
      <img alt="" src="/bg.png" className={Styles['right-img']} />
      <h1>{data.article.title}</h1>
      <div className={Styles['minister-info']}>
        <MinisterInfo date={articleDate} name={data.minister.name} image={data.minister.image} url={data.minister.url} />
      </div>
      <div className={Styles.content} dangerouslySetInnerHTML={{__html: data.article.html}} />
      <div className={Styles['more-solutions']}>
        <img alt="" src="/bg.png" className={Styles['divider-img']} />
        <h2>
          MORE SOLUTIONS FROM
          {' '}
          <Link to={`/category/${data.category.name.toLowerCase()}`}>{data.category.name.toUpperCase()}</Link>
        </h2>
        {
          articlesToDisplay.length === 0 && (
            <div className={Styles['no-solutions']}>
              <Notes />
              No Solutions
            </div>
          )
        }
        {
          articlesToDisplay.length > 0 && (
            <div className={Styles.groups}>
              <div className={Styles.group}>
                {
                  articlesToDisplay[0] && (
                    <Solution
                      id={articlesToDisplay[0].id}
                      title={articlesToDisplay[0].title}
                      content={articlesToDisplay[0].html}
                      date={articlesToDisplay[0].created_at}
                      image={parser.parseFromString(articlesToDisplay[0].html, 'text/html').querySelector('img')?.src}
                      align="right"
                    />
                  )
                }
                {
                  articlesToDisplay[1] && (
                    <Solution
                      id={articlesToDisplay[1].id}
                      title={articlesToDisplay[1].title}
                      content={articlesToDisplay[1].html}
                      date={articlesToDisplay[1].created_at}
                      image={parser.parseFromString(articlesToDisplay[1].html, 'text/html').querySelector('img')?.src}
                      align="right"
                    />
                  )
                }
              </div>
              <div className={Styles.track}>
                <div className={Styles.line} />
              </div>
              <div className={Styles['mobile-track']}>
                <div className={Styles.line} />
              </div>
              <div className={Styles.group}>
                {
                  articlesToDisplay[2] && (
                    <Solution
                      id={articlesToDisplay[2].id}
                      title={articlesToDisplay[2].title}
                      content={articlesToDisplay[2].html}
                      date={articlesToDisplay[2].created_at}
                      image={parser.parseFromString(articlesToDisplay[2].html, 'text/html').querySelector('img')?.src}
                    />
                  )
                }
                {
                  articlesToDisplay[3] && (
                    <Solution
                      id={articlesToDisplay[3].id}
                      title={articlesToDisplay[3].title}
                      content={articlesToDisplay[3].html}
                      date={articlesToDisplay[3].created_at}
                      image={parser.parseFromString(articlesToDisplay[3].html, 'text/html').querySelector('img')?.src}
                    />
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </main>
  )
}

export default ReadPage
