/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import {
  useEffect, useRef, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import {
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import EditIcon from '@mui/icons-material/Edit';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import DoneIcon from '@mui/icons-material/Done';

import { $isAtNodeEnd } from '@lexical/selection';
import {
  Grid, IconButton,
} from '@mui/material';
import {
  FloatingDivContainer,
  FloatingDivLink,
  FloatingDivLinkInput,
} from './styles';

const LowPriority = 1;

function getSelectedNode(selection) {
  const { anchor } = selection;
  const { focus } = selection;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  }
  return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

function FloatingLinkEditor({ editor }) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const { activeElement } = document;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null
      && !nativeSelection.isCollapsed
      && rootElement !== null
      && rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(() => mergeRegister(
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateLinkEditor();
      });
    }),

    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateLinkEditor();
        return true;
      },
      LowPriority,
    ),
  ), [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <FloatingDivContainer ref={editorRef}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          {isEditMode ? (
            <FloatingDivLinkInput
              ref={inputRef}
              fullWidth
              value={linkUrl}
              inputProps={{ sx: { height: 10 } }}
              onChange={(event) => {
                setLinkUrl(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (lastSelection !== null) {
                    if (linkUrl !== '') {
                      editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                    }
                    setEditMode(false);
                  }
                } else if (event.key === 'Escape') {
                  event.preventDefault();
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <FloatingDivLink>
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
            </FloatingDivLink>
          )}
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className="link-edit"
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setEditMode(!isEditMode);
            }}
          >
            {isEditMode ? <DoneIcon /> : <EditIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </FloatingDivContainer>
  );
}

FloatingLinkEditor.propTypes = {
  editor: PropTypes.shape({
    getRootElement: PropTypes.func.isRequired,
    getEditorState: PropTypes.func.isRequired,
    dispatchCommand: PropTypes.func.isRequired,
    registerUpdateListener: PropTypes.func.isRequired,
    registerCommand: PropTypes.func.isRequired,
    isEditable: PropTypes.func.isRequired,
  }).isRequired,
};

export default FloatingLinkEditor;
