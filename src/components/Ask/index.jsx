import { Send } from 'mdi-material-ui';
import BlueButton from '../BlueButton';
import Styles from './styles.module.css';
import { useState } from 'react';
import { useAskQuestionMutation } from '../../data/questions';
import SmallLoader from '../SmallLoader';
import toastr from 'toastr';

function Ask() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);

  const [
    askQuestion,
    {
      isLoading: isSending,
    },
  ] = useAskQuestionMutation();

  const submitQuery = async (e) => {
    e.preventDefault();

    const resp = await askQuestion({
      query,
    });

    if (resp.data?.id) {
      setQuery('');
      toastr.info('Question sent successfully!');
    } else {
      toastr.error('Failed to send question!');
    }
  };

  return (
    <div className={`${Styles.container} ${active && Styles.active}`}>
      <img alt="" src="bg.png" />
      <div className={Styles['ask-text']}>
        <span className={`hidden ${Styles['ask-text-title']}`}>
          COULDN&apos;T FIND WHAT YOU
          <br />
          WERE SEARCHING FOR?
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
      </div>

      <form className={`hidden ${Styles['ask-form']}`} onSubmit={submitQuery}>
        <div className={Styles['ask-form-heading']}>
          <span className={Styles['ask-form-title']}>ASK A QUESTION</span>
          <BlueButton type="submit">
            {
              !isSending && <Send />
            }
            {
              isSending && <SmallLoader />
            }
          </BlueButton>
        </div>
        <textarea
          rows={10}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        />
      </form>
    </div>
  )
}

export default Ask;
