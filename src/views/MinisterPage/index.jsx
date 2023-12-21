import { Navigate, useParams } from 'react-router-dom';
import Search from '../../components/Search';
import Solution from '../../components/Solution';
import Styles from './styles.module.css';
import { useGetMinisterQuery } from '../../data/ministers';
import OrangeButton from '../../components/OrangeButton';
import { useEffect, useState } from 'react';
import { useIndexArticlesQuery } from '../../data/articles';
import { FacebookSharp, Notes } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
import { Instagram, LinkBox, Twitter } from 'mdi-material-ui';

function MinisterPage() {
  const parser = new DOMParser();
  const [numArticlesLoaded, setNumArticlesLoaded] = useState(0);
  const [loadedArticles, setLoadedArticles] = useState([]);

  const { url } = useParams();

  const {
    data: minister,
    isLoading: isMinisterLoading,
    isError: isMinisterError,
  } = useGetMinisterQuery(url);

  const {
    data: articles,
    isLoading: isArticlesLoading,
  } = useIndexArticlesQuery(`start=${numArticlesLoaded}&minister_id=${minister?.id}`)

  useEffect(() => {
    if (articles && loadedArticles[loadedArticles.length - 1]?.id !== articles[articles.length - 1]?.id)
      setLoadedArticles([...loadedArticles, ...articles]);
  }, [articles, loadedArticles]);

  useEffect(() => {
    const elements = document.querySelectorAll(".hidden");

    const interSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, {
      threshold: 0.3,
    });

    elements.forEach((element) => {
      interSectionObserver.observe(element);
    });
  }, [isArticlesLoading, isMinisterLoading]);

  if (isMinisterLoading || isArticlesLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );

  if (isMinisterError) return <Navigate to="/" />

  const firstArticleGroup = loadedArticles.map((article, index) => (index % 2 === 0) ? (
    <Solution
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.html}
      date={article.created_at}
      image={parser.parseFromString(article.html, 'text/html').querySelector('img')?.src}
      align="right"
    />
  ): null)

  const secondArticleGroup = loadedArticles.map((article, index) => (index % 2 === 1) ? (
    <Solution
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.html}
      date={article.created_at}
      image={parser.parseFromString(article.html, 'text/html').querySelector('img')?.src}
    />
  ): null)

  const loadMore = () => {
    setNumArticlesLoaded(numArticlesLoaded + 6);
  }

  const iconList = {
    ['facebook']: <FacebookSharp />,
    ['x.com']: <Twitter />,
    ['twitter']: <Twitter />,
    ['instagram']: <Instagram />
  }

  const links = minister.links.split(';').map((link) => {
    let linkIcon = <LinkBox />;
    Object.keys(iconList).forEach((icon) => {
      if (link.indexOf(icon) > -1) {
        linkIcon = iconList[icon];
      }
    });

    return (
      <li key={link} className="hidden">
        {linkIcon}
        <a href={link}>{link.split('/')[link.split('/').length - 1]}</a>
      </li>
    )
  });

  return (
    <main className={Styles['minister-page']}>
      <img loading="lazy" className={Styles.bg} src="bg.png" alt="" />
      <div className={Styles['minister-info-search']}>
        <div className={Styles['minister-info']}>
          <img loading="lazy" src={minister.image.url} alt="" className={`hidden ${Styles['minister-photo']}`} />
          <h1 className="hidden">{minister.name.toUpperCase()}</h1>
          <p className="hidden">
            {minister.description}
          </p>
          <ul className={Styles['social-links']}>
            {links}
          </ul>
        </div>

        <div className={`hidden ${Styles.search}`}>
          <Search
            label={`SEARCH ARTICLES BY ${minister.name.toUpperCase()}`}
            params={`minister_id=${minister.id}`}
          />
        </div>
      </div>
      <img loading="lazy" className={Styles['bg-2']} src="bg-2.png" alt="" />
      <div className={Styles.solutions}>
        <h2 className="hidden">
          ARTICLES BY THIS AUTHOR
        </h2>
        {
          loadedArticles.length === 0 && (
            <div className={Styles['no-solutions']}>
              <Notes />
              No Articles
            </div>
          )
        }
        {
          loadedArticles.length > 0 && (
            <div className={Styles.groups}>
              <div className={Styles.group}>
                {firstArticleGroup}
              </div>
              <div className={Styles.track}>
                <div className={Styles.line} />
                {
                  articles.length > 0 && (
                    <OrangeButton text={isArticlesLoading ? 'Loading' : 'Load More'} type="button" onClick={loadMore} />
                  )
                }
              </div>
              <div className={Styles.group}>
                {secondArticleGroup}
              </div>
              <div className={Styles['mobile-load-more-btn']}>
                {
                  articles.length > 0 && (
                    <OrangeButton text={isArticlesLoading ? 'Loading' : 'Load More'} type="button" onClick={loadMore} />
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

export default MinisterPage
