import Styles from './styles.module.css';

const lexicalEditorTheme = {
  ltr: Styles['ltr'],
  rtl: Styles['rtl'],
  placeholder: Styles['editor-placeholder'],
  paragraph: Styles['editor-paragraph'],
  quote: Styles['editor-quote'],
  heading: {
    h1: Styles['editor-heading-h1'],
    h2: Styles['editor-heading-h2'],
    h3: Styles['editor-heading-h3'],
    h4: Styles['editor-heading-h4'],
    h5: Styles['editor-heading-h5'],
  },
  list: {
    nested: {
      listitem: Styles['editor-nested-listitem'],
    },
    ol: Styles['editor-list-ol'],
    ul: Styles['editor-list-ul'],
    listitem: Styles['editor-listitem'],
  },
  image: Styles['editor-image'],
  link: Styles['editor-link'],
  text: {
    bold: Styles['editor-text-bold'],
    italic: Styles['editor-text-italic'],
    overflowed: Styles['editor-text-overflowed'],
    hashtag: Styles['editor-text-hashtag'],
    underline: Styles['editor-text-underline'],
    strikethrough: Styles['editor-text-strikethrough'],
    underlineStrikethrough: Styles['editor-text-underline-strike-through'],
  },
};
export default lexicalEditorTheme;
