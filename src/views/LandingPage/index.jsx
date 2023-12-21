import PropTypes from 'prop-types';
import Ask from '../../components/Ask';
import Browse from '../../components/Browse';
import Category from '../../components/Category';
import MissionInfo from '../../components/MissionInfo';
import Solution from '../../components/Solution';
import Welcome from '../../components/Welcome';
import Styles from './styles.module.css';
import { ArrowBackIosNew, ArrowForwardIos, Notes } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';

function LandingPage({
  categories,
  articles,
  categoriesLoaded,
  articlesLoaded,
}) {
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
  }, [categoriesLoaded, articlesLoaded]);

  if (
    !categoriesLoaded ||
    !articlesLoaded
  ) return (
    <div className="loader">
      <Loader />
    </div>
  )

  const parser = new DOMParser();

  const viewPreviousCategories = () => {
    const categoryList = document.querySelector(`.${Styles['category-list']}`);
    categoryList.scrollLeft -= 300;
  }

  const viewNextCategories = () => {
    const categoryList = document.querySelector(`.${Styles['category-list']}`);
    categoryList.scrollLeft += 300;
  }

  return (
    <>
      <Welcome />
      <MissionInfo />
      <Browse />
      <section className={Styles['categories-section']}>
        <h2 className="hidden">ALL CATEGORIES</h2>
        <div className={Styles['category-list']}>
          <button type="button" className={Styles['category-list-prev-btn']} onClick={viewPreviousCategories}>
            <ArrowBackIosNew />
          </button>
          {
            categories.map((category, index) => (
              <Category
                key={category.id}
                dir={index % 2 ? '' : 'rtl'}
                name={category.name}
                description={category.description}
                image={category.image.url}
              />
            ))
          }
          <button type="button" className={Styles['category-list-next-btn']} onClick={viewNextCategories}>
            <ArrowForwardIos />
          </button>
        </div>
        {
          categories.length === 0 && (
            <div className={Styles['no-categories']}>
              <Notes />
              No Categories
            </div>
          )
        }
      </section>
      {
        articles.length > 0 && (
          <section className={`hidden ${Styles['recently-published']}`}>
            <div className={Styles['mobile-track']}>
              <div className={Styles.line} />
            </div>
            <div className={Styles.groups}>
              <div className={Styles.group}>
                {
                  articles[1] && (
                    <Solution
                      id={articles[1].id}
                      title={articles[1].title}
                      content={articles[1].html}
                      date={articles[1].created_at}
                      image={parser.parseFromString(articles[1].html, 'text/html').querySelector('img')?.src}
                      align="right"
                    />
                  )
                }
                {
                  articles[2] && (
                    <Solution
                      id={articles[2].id}
                      title={articles[2].title}
                      content={articles[2].html}
                      date={articles[2].created_at}
                      image={parser.parseFromString(articles[2].html, 'text/html').querySelector('img')?.src}
                      align="right"
                    />
                  )
                }
              </div>
              <div className={Styles.track}>
                <div className={Styles.line} />
              </div>
              <div className={Styles.group}>
                <h2>RECENTLY PUBLISHED</h2>
                {
                  articles[0] && (
                    <Solution
                      id={articles[0].id}
                      title={articles[0].title}
                      content={articles[0].html}
                      date={articles[0].created_at}
                      image={parser.parseFromString(articles[0].html, 'text/html').querySelector('img')?.src}
                    />
                  )
                }
                {
                  articles[3] && (
                    <Solution
                      id={articles[3].id}
                      title={articles[3].title}
                      content={articles[3].html}
                      date={articles[3].created_at}
                      image={parser.parseFromString(articles[3].html, 'text/html').querySelector('img')?.src}
                    />
                  )
                }
              </div>
            </div>
          </section>
        )
      }
      {
        articles.length === 0 && (
          <div className={Styles['no-solutions']}>
            <h2>RECENTLY PUBLISHED</h2>

            <div className={Styles['no-solutions-content']}>
              <Notes />
              No Articles
            </div>
          </div>
        )
      }
      <Ask />
    </>
  )
}

LandingPage.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
      description: PropTypes.string,
    })
  ),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      html: PropTypes.string,
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  categoriesLoaded: PropTypes.bool,
  articlesLoaded: PropTypes.bool,
}

export default LandingPage
