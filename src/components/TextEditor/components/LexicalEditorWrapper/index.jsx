import PropTypes from 'prop-types';
// import { $getRoot, $getSelection } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Box } from '@mui/material';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { MuiContentEditable } from './styles';
// import { MuiContentEditable, placeHolderSx } from './styles';
import { lexicalEditorConfig } from '../../config/lexicalEditorConfig';
import LexicalEditorTopBar from '../LexicalEditorTopBar';
// import TreeViewPlugin from '../CustomPlugins/TreeViewPlugin';
import ImagesPlugin from '../CustomPlugins/ImagePlugin';
import FloatingTextFormatToolbarPlugin from '../CustomPlugins/FloatingTextFormatPlugin';

function LexicalEditorWrapper({
  onChange,
  // eslint-disable-next-line react/prop-types
  initialEditorState,
}) {
  return (
    <LexicalComposer initialConfig={lexicalEditorConfig(initialEditorState)}>
      <Box
        sx={{
          marginBottom: 'var(--spacing-5)',
          width: '100%',
        }}
      >
        <LexicalEditorTopBar />
      </Box>
      <Box sx={{
        position: 'relative',
        display: 'grid',
        minHeight: '500px',
          width: '100%',
          height: 'max-content',
        padding: '32px 16px',
        bgcolor: 'var(--blue)',
        color: 'var(--white)',
      }}
      >
        <RichTextPlugin
          contentEditable={<MuiContentEditable />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <ImagesPlugin captionsEnabled={false} />
        <FloatingTextFormatToolbarPlugin />
      </Box>
    </LexicalComposer>
  );
}

LexicalEditorWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default LexicalEditorWrapper;
