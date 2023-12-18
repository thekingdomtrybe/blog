import PropTypes from 'prop-types';
import {
  CssBaseline,
  Grid,
  ThemeProvider,
} from '@mui/material';
import LexicalEditorWrapper from './components/LexicalEditorWrapper';
import theme from './theme';

function TextEditor({
  onChange,
  // eslint-disable-next-line react/prop-types
  initialEditorState,
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
      >
        <Grid
          sx={{
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <LexicalEditorWrapper
            onChange={onChange}
            initialEditorState={initialEditorState}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextEditor;
