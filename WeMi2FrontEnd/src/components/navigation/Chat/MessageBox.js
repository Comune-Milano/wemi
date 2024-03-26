
import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { hexToRgba } from 'utils/functions/hexToRgba';

const StyledMessageBox = styled.div`
  width: 100%;
  padding: 1rem;
  border-style: solid;
  word-break: break-word;
  border-width: 2px;
  border-color: ${props => colors[props.color] || colors.primary};
  border-radius: 10px;
  background-color: ${props => props.backgroundActive ?
    hexToRgba(colors[props.color], 0.15) :
    colors.white
  };
  position: relative;
`;

const StyledMessageTime = styled.div`
  position: absolute;
  bottom: 2px;
  right: 5px;
`;

const ChatMessageBox = ({
  userName,
  message,
  color,
  backgroundActive,
  messageTime,
}) => (
    <StyledMessageBox
      color={color}
      backgroundActive={backgroundActive}
      className="section-fade-in"
    >
      <Text
        tag="strong"
        value={userName}
        color={color || 'primary'}
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f8"
      />
      <Text
        tag="div"
        value={message}
        color="black"
        size="f7"
        whitespace="pre-line"
      />
      <StyledMessageTime>
        <Text
          tag="span"
          value={messageTime}
          color="grey"
          size="f8"
        />
      </StyledMessageTime>
    </StyledMessageBox>
  );

ChatMessageBox.displayName = 'ChatMessageBox';

export default ChatMessageBox;
