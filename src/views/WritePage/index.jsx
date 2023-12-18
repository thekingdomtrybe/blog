import { PreviewRounded, Publish, SaveAs } from '@mui/icons-material';
import { $generateHtmlFromNodes } from '@lexical/html';
import BlueButton from '../../components/BlueButton';
import Input from '../../components/Input';
import TextEditor from '../../components/TextEditor';
import Styles from './styles.module.css';
import Select from 'react-select';
import { useCreateArticleMutation } from '../../data/articles';
import { useEffect, useState } from 'react';
import { useIndexCategoriesQuery } from '../../data/categories';
import { useNavigate } from 'react-router-dom';
import { useGetSignedInMinisterQuery } from '../../data/ministers';

function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [html, setHTML] = useState('');
  const [categoryId, setCategoryId] = useState(null);

  const [article, setArticle] = useState(null);

  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: categoriesLoading,
    isSuccess: categoriesLoaded,
  } = useIndexCategoriesQuery();

  const {
    data: signedInMinister,
  } = useGetSignedInMinisterQuery();

  const [
    createArticle,
    {
      isSuccess: articleCreated,
    }
  ] = useCreateArticleMutation();

  const saveDraft = async () => {
    await createArticle({
      title,
      content,
      html,
      status: 'draft',
      category_id: categoryId,
    });

    navigate(`/minister/${signedInMinister.url}`);
  };

  const previewPost = async () => {
    const { data } = await createArticle({
      title,
      content,
      html,
      status: 'draft',
      category_id: categoryId,
    });

    const parsedDate = new Date(data.created_at);

    const idDateString = `${data.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
    const titleURL = title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

    navigate(`/preview/${idDateString}/${titleURL}`, { replace: true });
  };

  const publishPost = async () => {
    const { data } = await createArticle({
      title,
      content,
      html,
      status: 'published',
      category_id: categoryId,
    });

    setArticle(data);
  };

  useEffect(() => {
    if (articleCreated && article) {
      const parsedDate = new Date(article.created_at);

      const idDateString = `${article.id}-${parsedDate.getDate()}-${parsedDate.getMonth()}-${parsedDate.getFullYear()}`;
      const titleURL = article.title.toLowerCase().replace(/(\s+)/g, ' ').trim().replace(/(\W)/g, '-').replace(/(-+)/g, '-');

      navigate(`/${idDateString}/${titleURL}`, { replace: true });
    }
  }, [article, articleCreated, navigate]);

  return (
    <main className={Styles['write-page']}>
      <img alt="" src="bg.png" className={Styles['left-img']} />
      <img alt="" src="bg.png" className={Styles['right-img']} />
      <div className={Styles['title-controls']}>
        <h1>CRAFT A SOLUTION</h1>
        <div className={Styles.input}>
          <Input bold placeholder="Solution Title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={Styles.controls}>
          <BlueButton title="Save Draft" onClick={saveDraft}>
            <SaveAs />
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
              onChange={(option) => {
                setCategoryId(option.value)
              }}
          />
          )
        }
        </div>
      <div className={Styles['text-editor']}>
        <TextEditor onChange={(editorState, editor) => {
          setContent(JSON.stringify(editorState.toJSON()))
          editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor);
            setHTML(htmlString);
          });
        }} />
      </div>
    </main>
  )
}

export default WritePage
