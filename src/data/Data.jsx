import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useIndexCategoriesQuery } from "./categories";
import { useIndexArticlesQuery } from './articles';
import { useIndexMinistersQuery } from './ministers';

function Data({
  categoriesCallback,
  articlesCallback,
  ministersCallback,
}) {
  const {
    data: categories,
    isSuccess: categoriesFetched,
  } = useIndexCategoriesQuery();

  const {
    data: articles,
    isSuccess: articlesFetched,
  } = useIndexArticlesQuery();

  const {
    data: ministers,
    isSuccess: ministersFetched,
  } = useIndexMinistersQuery();

  useEffect(() => {
    if (categoriesFetched) categoriesCallback(categories, true);
  }, [categoriesFetched, categoriesCallback, categories]);

  useEffect(() => {
    if (articlesFetched) articlesCallback(articles, true);
  }, [articlesFetched, articlesCallback, articles]);

  useEffect(() => {
    if (ministersFetched) ministersCallback(ministers, true);
  }, [ministersFetched, ministersCallback, ministers]);

  return (
    <></>
  )
}

Data.propTypes = {
  categoriesCallback: PropTypes.func.isRequired,
  articlesCallback: PropTypes.func.isRequired,
  ministersCallback: PropTypes.func.isRequired,
}

export default Data
