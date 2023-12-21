import { useNavigate, useParams } from 'react-router-dom';
import MinisterInfo from '../../components/MinisterInfo';
import Styles from './styles.module.css';
import { useReadArticleQuery, useUpdateArticleMutation } from '../../data/articles';
import BlueButton from '../../components/BlueButton';
import { Edit, Publish } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';

function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  const {
    data,
    isLoading,
  } = useReadArticleQuery(id);

  const [
    updateArticle,
    {
      isSuccess: articleUpdated,
    }
  ] = useUpdateArticleMutation();

  const editPost = () => {
    navigate(`/edit/${id}`, { replace: true });
  };

  const publishPost = async () => {
    const { data } = await updateArticle({
      id: id.split('-')[0],
      status: 'published',
    });

    setArticle(data);
  };

  useEffect(() => {
    if (articleUpdated && article) {
      const parsedDate = new Date(article.created_at);

      const idDateString = `${article.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
      const titleURL = article.title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

      navigate(`/${idDateString}/${titleURL}`, { replace: true });
    }
  }, [article, articleUpdated, navigate]);

  if (isLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );
  const articleDate = new Date(data.article.created_at).toDateString();

  return (
    <main className={Styles['preview-page']}>
      <img loading="lazy" alt="" src="bg.png" className={Styles['left-img']} />
      <img loading="lazy" alt="" src="bg.png" className={Styles['right-img']} />
      <h1>{data.article.title}</h1>
      <div className={Styles['minister-info-controls']}>
        <MinisterInfo date={articleDate} name={data.minister.name} image={data.minister.image} />
        <div className={Styles['preview-controls']}>
          <BlueButton title="Edit" onClick={editPost}>
            <Edit />
          </BlueButton>
          <BlueButton title="Publish" onClick={publishPost}>
            <Publish />
          </BlueButton>
        </div>
      </div>
      <div className={Styles.content} dangerouslySetInnerHTML={{__html: data.article.html}} />
    </main>
  )
}

export default PreviewPage
