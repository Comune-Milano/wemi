import React, { memo } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import InputFile from 'components/ui2/InputFile';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { formatErrorFile } from 'components/ui2/InputFile/utils/errors';
import { MAXIMUM_FILE_SIZE } from 'types/maxInput';

const StyledHeader = styled.div`
  padding: 3em 6em;
  min-height: 7em;
  background-color: ${colors.greyInput};
`;

const ChatFooter = ({
  message,
  attachment,
  sendDisabled,
  textAreaDisabled,
  onChangeMessage,
  onSendMessage,
  onUploadFile,
  fileDisabled,
  textAreaVisible,
  sendButtonVisible,
  uploadFileVisible,
}) => {
  const [errorFile, setErrorFile] = React.useState(false);
  /**
   * The handler for the click on send button.
   */
  const sendClickHandler = () => {
    if (!message || !message.trim()) {
      return;
    }
    onSendMessage(message);
  };

  const onUploadFileControl = (file) => {
    setErrorFile(false);
    onUploadFile(file);
  };

  const messageErrorFile = (errors, errorMessage) => {
    setErrorFile(formatErrorFile(errorMessage, MAXIMUM_FILE_SIZE.value));
  };

  return (
    <StyledHeader>
      {
        textAreaVisible ?
          (
            <Row padding="0 0 1rem 0">
              <Column xs={12} padding="0">
                <TextArea
                  placeholder="Scrivi qui..."
                  name="chat-message"
                  id="chat-message"
                  bgColor="white"
                  height="7rem"
                  inputValue={message}
                  onChange={onChangeMessage}
                  readOnly={textAreaDisabled}
                  xsSize="f5"
                  maxLength={STRING_MAX_VALIDATION.value}
                />
              </Column>
            </Row>
          ) : null
      }
      <Row padding="0 0 1rem 0" alignitems="center" flex>
        <Column
          xs={6}
          md={8}
          padding="0"
          alignitems="center"
        >
          {
            attachment ? (
              <>
                <Text
                  tag="div"
                  value="Allegato: "
                  color="darkGrey"
                  weight="bold"
                  display="inline-block"
                  margin="0 1em 0 0"
                  size="f8"
                />
                <div style={{ display: 'inline-block' }}>
                  <a
                    title="Scarica allegato"
                    href={attachment.oj_media}
                    download={attachment.nm_nome_media}
                  >
                    <Text
                      tag="span"
                      value={attachment.nm_nome_media}
                      color="darkGrey"
                      weight="bold"
                      size="f8"
                    />
                  </a>
                </div>
              </>
            ) : null
          }
        </Column>
        <Column
          xs={6}
          md={4}
          padding="0"
          justifycontent="end"
          alignitems="end"
        >
          <div style={{ textAlign: 'right' }}>
            {
              sendButtonVisible ?
                <>
                  {
                    uploadFileVisible ?
                      <InputFile
                        label="upload-file"
                        id="upload-file"
                        onChange={onUploadFileControl}
                        onError={messageErrorFile}
                        disabled={fileDisabled}
                        maxDimension={MAXIMUM_FILE_SIZE.byte}
                      />
                      : null
                  }

                  <Button
                    autowidth
                    type="button"
                    label="Invia"
                    fontSize="f6"
                    name="send-button"
                    color="orange"
                    margin="0 0 0 1em"
                    disabled={sendDisabled}
                    onClick={sendClickHandler}
                  />
                </>
                : null
            }
          </div>
        </Column>
      </Row>
      {errorFile ? (
        <Text
          tag="div"
          value={errorFile}
          weight="bold"
          size="f8"
          color="red"
        />
      )
        : null
      }
    </StyledHeader>
  );
};

ChatFooter.displayName = 'ChatFooter';

export default memo(ChatFooter);