import { useNavigate, useParams } from 'react-router-dom';
import { $generateHtmlFromNodes } from '@lexical/html';
import Input from '../../components/Input';
import TextEditor from '../../components/TextEditor';
import Styles from './styles.module.css';
import { useReadArticleQuery, useUpdateArticleMutation } from '../../data/articles';
import { useEffect, useState } from 'react';
import { useIndexCategoriesQuery } from '../../data/categories';
import BlueButton from '../../components/BlueButton';
import { PreviewRounded, Publish, Save } from '@mui/icons-material';
import Select from 'react-select';
import Loader from '../../components/Loader/Loader';

function EditPage() {
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [html, setHTML] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [published, setPublished] = useState(false);

  const navigate = useNavigate();

  const {
    data,
    isLoading: articleLoading,
    isSuccess: articleLoaded,
  } = useReadArticleQuery(id.split('-')[0]);

  const {
    data: categories,
    isLoading: categoriesLoading,
    isSuccess: categoriesLoaded,
  } = useIndexCategoriesQuery();

  const [
    updateArticle,
    {
      isSuccess: articleUpdated,
    }
  ] = useUpdateArticleMutation();

  const saveChanges = () => {
    updateArticle({
      id: id.split('-')[0],
      title,
      content,
      html,
      category_id: categoryId,
    });
  };

  const previewPost = async () => {
    const { data } = await updateArticle({
      id: id.split('-')[0],
      title,
      content,
      html,
      category_id: categoryId,
    });
    const parsedDate = new Date(data.created_at);

    const idDateString = `${data.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
    const titleURL = title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

    navigate(`/preview/${idDateString}/${titleURL}`, { replace: true });
  };

  const publishPost = () => {
    updateArticle({
      id: id.split('-')[0],
      title,
      content,
      html,
      status: 'published',
      category_id: categoryId,
    });

    setPublished(true);
  };

  useEffect(() => {
    if (articleLoaded) {
      setTitle(data.article.title);
      setContent(data.article.content);
      setHTML(data.article.html);
      setCategoryId(data.category.id);
    }
  }, [articleLoaded, data]);

  useEffect(() => {
    if (articleUpdated && published) {
      const parsedDate = new Date(data.article.created_at);

      const idDateString = `${data.article.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
      const titleURL = data.article.title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

      navigate(`/${idDateString}/${titleURL}`, { replace: true });
    }
  }, [data, articleUpdated, published, navigate]);

  if (articleLoading) return (
    <div className="loader">
      <Loader />
    </div>
  );

  return (
    <main className={Styles['edit-page']}>
      <img alt="" src="bg.png" className={Styles['left-img']} />
      <img alt="" src="bg.png" className={Styles['right-img']} />
      <div className={Styles['title-controls']}>
        <h1>EDIT SOLUTION</h1>
        <div className={Styles.input}>
          <Input bold placeholder="Solution Title" defaultValue={data.article.title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={Styles.controls}>
          <BlueButton title="Save Changes" onClick={saveChanges}>
            <Save />
          </BlueButton>
          <BlueButton title="Preview" onClick={previewPost}>
            <PreviewRounded />
          </BlueButton>
          <BlueButton title="Publish" onClick={publishPost}>
            <Publish />
          </BlueButton>
        </div>
      </div>
      <div className={Styles.categories}>
        {
          categoriesLoading && <div>loading...</div>
        }
        {
          categoriesLoaded && (
            <Select
              options={categories.map((category) => ({ value: category.id, label: category.name }))}
              name="categories"
              id="categories"
              pageSize={2}
              placeholder="Select a category..."
              defaultValue={{ value: data.category.id, label: data.category.name }}
              onChange={(option) => {
                setCategoryId(option.value)
              }}
          />
          )
        }
        </div>
      <div className={Styles['text-editor']}>
        <TextEditor
          onChange={(editorState, editor) => {
            setContent(JSON.stringify(editorState.toJSON()))
            editorState.read(() => {
              const htmlString = $generateHtmlFromNodes(editor);
              setHTML(htmlString);
            });
          }}
          initialEditorState={data.article.content.trim().length ? data.article.content : null}
        />
      </div>
    </main>
  )
}

export default EditPage
