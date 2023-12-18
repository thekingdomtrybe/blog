import { Grid } from '@mui/material';
import { createPortal } from 'react-dom';
import useOnClickListener from './useOnClickListener';
import toolbarIconsList from './toolbarIconsList';
import FloatingLinkEditor from './FloatingLinkEditor';

const LexicalEditorTopBar = () => {
  const {
    onClick, selectedEventTypes, blockType, isLink, editor, modal,
  } = useOnClickListener();

  const isIconSelected = (plugin) => selectedEventTypes.includes(plugin.event)
    || blockType.includes(plugin.event);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        py: 2,
        px: 2,
        bgcolor: 'var(--blue)',
      }}
    >
      {toolbarIconsList.map((plugin) => (
        <Grid
          key={plugin.id}
          sx={{
            cursor: 'pointer',
          }}
          item
        >
          <plugin.Icon
            onClick={() => onClick(plugin.event)}
            style={{
              backgroundColor: isIconSelected(plugin) ? 'var(--white)' : '',
              color: isIconSelected(plugin) ? 'var(--blue)' : '',
              fontSize: 'var(--font-size-7)',
              padding: 'var(--spacing-1)',
              borderRadius: 'var(--radius-3)',
            }}
          />
        </Grid>
      ))}
      {modal}
      {isLink
        && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
    </Grid>
  );
};

export default LexicalEditorTopBar;
