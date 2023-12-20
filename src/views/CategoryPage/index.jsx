import { useParams } from 'react-router-dom';
import Search from '../../components/Search';
import Solution from '../../components/Solution';
import { useReadCategoryQuery } from '../../data/categories';
import Styles from './styles.module.css';
import OrangeButton from '../../components/OrangeButton';
import { useEffect, useState } from 'react';
import { useIndexArticlesQuery } from '../../data/articles';
import { Notes } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';

function CategoryPage() {
  const { name } = useParams();
  const [numArticlesLoaded, setNumArticlesLoaded] = useState(0);
  const [loadedArticles, setLoadedArticles] = useState([]);

  const parser = new DOMParser();

  const {
    data: category,
    isLoading,
    isSuccess,
  } = useReadCategoryQuery(name);

  const {
    data: articles,
    isLoading: isArticlesLoading,
  } = useIndexArticlesQuery(`start=${numArticlesLoaded}&category_id=${category?.id}`)

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
  }, [isSuccess, isArticlesLoading]);

  if (isLoading || isArticlesLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );
  if (!isSuccess) return <></>;

  const articleComponents = loadedArticles.map((article) => (
    <Solution
      key={article.id}
      id={article.id}
      title={article.title}
      content={article.html}
      date={article.created_at}
      image={parser.parseFromString(article.html, 'text/html').querySelector('img')?.src}
    />
  ))

  const loadMore = () => {
    setNumArticlesLoaded(numArticlesLoaded + 6);
  }

  return (
    <main className={Styles['category-page']}>
      <section className={Styles['info-section']}>
        <div className={Styles['category-info']}>
          <h1 className="hidden">{category.name.toUpperCase()}</h1>
          <p className="hidden">
            {category.description}
          </p>
        </div>
        <div className={Styles['category-img']}>
          <img className="hidden" src={category.image.url} alt="" />
        </div>

        <div className={`hidden ${Styles.search}`}>
          <Search
            label={`SEARCH SOLUTIONS IN ${category.name.toUpperCase()}`}
            params={`category_id=${category.id}`}
          />
        </div>
      </section>

      <section className={Styles.solutions}>
        <h2 className="hidden">
          SOLUTIONS IN THIS CATEGORY
        </h2>
        {
          loadedArticles.length === 0 && (
            <div className={`hidden ${Styles['no-solutions']}`}>
              <Notes />
              No Solutions
            </div>
          )
        }
        <div className={Styles['solutions-container']}>
          {articleComponents}
        </div>
        {
          loadedArticles.length > 0 && (
            <OrangeButton text={isArticlesLoading ? 'Loading' : 'Load More'} type="button" onClick={loadMore} />
          )
        }
      </section>
    </main>
  )
}

export default CategoryPage
