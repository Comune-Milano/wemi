
import React, { useCallback } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useLogger } from 'services/Logger';
import styles from './index.module.css';
import { DEFAULT_ACTION_BUTTONS } from './constants';

export const TextEditor = ({
  editorState,
  initialEditorState,
  onEditorStateChange,
  onContentStateChange,
  customStyles = {
    wrapperStyle: {},
    editorStyle: {},
    toolbarStyle: {},
  },
  customCssClasses = {
    wrapperClassName: '',
    editorClassName: '',
    toolbarClassName: '',
  },
  toolbarHidden,
  readOnly,
  disabled,
  actionButtons = DEFAULT_ACTION_BUTTONS,
}) => {
  const logger = useLogger();

  /**
   * Handles the upload of an image.
   * @param {*} file
   */
  const onImageUpload = useCallback(
    file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onerror = error => reject(error);
      reader.onload = () => resolve({
        data: {
          link: reader.result,
        },
      });
    }),
    []
  );

  /**
   * A set of optional props.
   * NOTE: The editor does not support "editorState" and "initialEditorState"
   *       simultaneously, just choose to handle the editor state in a controlled
   *       or an un-controlled way.
   */
  const optionalProps = {
    ...(editorState && { editorState }),
    ...(initialEditorState && { defaultEditorState: initialEditorState }),
    ...(onEditorStateChange && { onEditorStateChange }),
    ...(onContentStateChange && { onContentStateChange }),
  };

  // Log some info if the management of editor state is wrong and avoid to render to editor at all!
  if (editorState && initialEditorState) {
    logger.error(`
      You CANNOT provide both "editorState" and "initialEditorState" (i.e. controlled vs uncontrolled).
      Make peace with yourself! :)
    `);

    return null;
  }

  // Custom styles.
  const {
    wrapperStyle = {},
    editorStyle = {},
    toolbarStyle = {},
  } = customStyles;

  // Custom css classes.
  const {
    wrapperClassName = '',
    editorClassName = '',
    toolbarClassName = '',
  } = customCssClasses;

  const wrapperCSSClasses = `${styles.editorWrapper} ${wrapperClassName} ${readOnly ? styles.editorReadOnly : ''}`;
  const toolbarCSSClasses = `${styles.editorToolbar} ${toolbarClassName}`;
  const editorCssClasses = `${styles.textEditor} ${editorClassName}`;

  return (
    <Editor
      {...optionalProps}
      readOnly={disabled || readOnly}
      toolbarHidden={toolbarHidden || readOnly}
      wrapperStyle={wrapperStyle}
      editorStyle={editorStyle}
      toolbarStyle={toolbarStyle}
      wrapperClassName={wrapperCSSClasses}
      toolbarClassName={toolbarCSSClasses}
      editorClassName={editorCssClasses}
      toolbar={{
        options: actionButtons,
        image: {
          popupClassName: styles.editorImagePopup,
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          uploadCallback: onImageUpload,
          previewImage: true,
        },
      }}
    />
  );
};

TextEditor.displayName = 'TextEditor';
