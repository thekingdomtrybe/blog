import BlueButton from '../../components/BlueButton';
import DraftSolution from '../../components/DraftSolution';
import Solution from '../../components/Solution';
import Search from '../../components/Search';
import Styles from './styles.module.css';
import { useGetSignedInMinisterQuery, useLogoutMinisterMutation } from '../../data/ministers';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIndexArticlesQuery, useIndexDraftsQuery } from '../../data/articles';
import { FacebookSharp, Notes } from '@mui/icons-material';
import OrangeButton from '../../components/OrangeButton';
import Loader from '../../components/Loader/Loader';
import { Instagram, LinkBox, Twitter } from 'mdi-material-ui';

function LoggedInMinisterPage() {
  const parser = new DOMParser();
  const [numArticlesLoaded, setNumArticlesLoaded] = useState(0);
  const [loadedArticles, setLoadedArticles] = useState([]);

  const [
    logoutMinister,
    {
      isSuccess: ministerLoggedOut,
    }
  ] = useLogoutMinisterMutation();

  const {
    data: minister
  } = useGetSignedInMinisterQuery();

  const {
    data: drafts,
    isLoading: draftsLoading,
    isSuccess: draftsLoaded,
  } = useIndexDraftsQuery();

  const {
    data: articles,
    isLoading: isArticlesLoading,
  } = useIndexArticlesQuery(`start=${numArticlesLoaded}&minister_id=${minister?.id}`)

  useEffect(() => {
    if (ministerLoggedOut) window.location.reload();
  }, [ministerLoggedOut]);

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
  }, [isArticlesLoading, draftsLoaded]);

  const firstArticleGroup = loadedArticles.map((article, index) => (index % 2 === 0) ? (
    <Solution
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.html}
      date={article.created_at}
      image={parser.parseFromString(article.html, 'text/html').querySelector('img')?.src}
      displayEditControls
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
      displayEditControls
    />
  ): null)

  const loadMore = () => {
    setNumArticlesLoaded(numArticlesLoaded + 6);
  }

  if (isArticlesLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );

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
      <div className={Styles['minister-info-search']}>
        <div className={Styles['minister-info']}>
          <div className={Styles['minister-photo-actions']}>
            <img loading="lazy" src={minister.image.url} alt="" className={`hidden ${Styles['minister-photo']}`} />
            <div className={`hidden ${Styles['minister-actions']}`}>
              <Link to="/update">
                <BlueButton text="UPDATE PROFILE" />
              </Link>
              <Link to="/change">
                <BlueButton text="SET PASSWORD" />
              </Link>
              <BlueButton text="LOG OUT" onClick={logoutMinister} />
             </div>
          </div>
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
            label="SEARCH YOUR ARTICLES"
            onChange={(value) => {console.log(value)}}
            results={[]}
          />
        </div>
      </div>

      <div className={Styles['construct-drafts']}>
        <div>
          <Link to="/write">
            <BlueButton text="WRITE AN ARTICLE" />
          </Link>
        </div>
        <div className={`hidden ${Styles.drafts}`}>
          <h2>YOUR DRAFTS</h2>
          {
            drafts?.length > 0 && (
              <ul>
                {
                  draftsLoading && <div>loading...</div>
                }
                {
                  draftsLoaded && (
                    drafts.map((draft) =>
                      <DraftSolution key={draft.id} id={draft.id} date={draft.created_at} title={draft.title} />
                    )
                  )
                }
              </ul>
            )
          }
          {
            drafts?.length === 0 && (
              <div className={Styles['no-drafts']}>
                <Notes />
                No Drafts
              </div>
            )
          }
        </div>
      </div>

      <div className={Styles.solutions}>
        <h2 className="hidden">
          YOUR ARTICLES
        </h2>
        {
          loadedArticles.length === 0 && (
            <div className={`hidden ${Styles['no-solutions']}`}>
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

export default LoggedInMinisterPage
