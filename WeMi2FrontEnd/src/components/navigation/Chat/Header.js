
import React, { memo } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { chatStatus as chatStatusTypes } from 'types/chatStatus';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { isNumber } from 'utils/functions/typeCheckers';
import media from 'utils/media-queries';
import { RICHIESTA_ENTE_INOLTRATA } from 'types/stati-richieste/richiesteEnte';

const StyledHeader = styled.div`
  padding: 3em 6em;
  min-height: 7em;
  background-color: ${colors.greyInput};
`;

const DivButton = styled.div`
  position: absolute;
  ${media.xs`
    right: 1em;
  `};
  ${media.sm`
    right: 1em;
  `};
  ${media.md`
    right: 6em;
  `};
  ${media.lg`
    right: 6em;
  `}; 

`;

const ChatHeader = ({
  requestInfo,
  chatStatus,
  onCloseChat,
  chatTitle,
  chiudiChatVisible,
  messageHeaderVisible,
}) => {
  const getPrezzo = () => {
    let prezzo;
    if (isNumber(requestInfo.prezzoFinale)) {
      prezzo = requestInfo.prezzoFinale;
    } else if (isNumber(requestInfo.prezzoProposto)) {
      prezzo = requestInfo.prezzoProposto;
    }
    if (prezzo === 0) {
      return "Gratuito";
    }
    if (prezzo) {
      return moneyFormat(prezzo, true);
    }
    return "Non erogabile";
  }

  const isChiusa = chatStatus === chatStatusTypes.CHIUSA;
  const isTerminata = chatStatus === chatStatusTypes.TERMINATA;
  const isRichiestaEnteInoltrata = Number.parseInt(requestInfo.statoRichiestaEnte, 10) === Number.parseInt(RICHIESTA_ENTE_INOLTRATA, 10);

  const messageHeader = React.useMemo(
    () => {

      if (isTerminata && !isRichiestaEnteInoltrata) {
        return "Consulta i messaggi.";
      }
      if (isChiusa) {
        return "Potrai inviare messaggi solamente in seguito ad un primo messaggio dell'ente.";
      }
      return "Scrivi il tuo messaggio, l'ente ti risponderà il prima possibile.";

    },
    [isTerminata, isRichiestaEnteInoltrata, isChiusa]
  );

  return (
    <StyledHeader>
      {
        chiudiChatVisible ?
          (
            <DivButton >
              <Button
                autowidth
                type="button"
                name="chiudi-chat"
                label="Termina"
                fontSize="f6"
                color="red"
                disabled={chatStatus === chatStatusTypes.CHIUSA || chatStatus === chatStatusTypes.TERMINATA}
                onClick={onCloseChat}
              />
            </DivButton>
          ) : null
      }
      <Text
        tag="h2"
        value={chatTitle}
        color="black"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f4"
      />
      <Text
        tag="strong"
        value={requestInfo.nomeServizio}
        color="primary"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        size="f6"
      />
      <Row padding="0" margin="2.5em 0 0 0">
        {requestInfo.dataRichiestaBaseDa ?
          <Column xs="8" padding="0 1em 0 0">
            <Text
              tag="strong"
              value="Periodo"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"

            />
            <br />
            <Text
              tag="span"
              value={`Dal ${requestInfo.dataRichiestaBaseDa} Al ${requestInfo.dataRichiestaBaseA}`}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f6"
            />
          </Column>
          : null}
        <Column xs="4" padding="0 0 0 1em">
          <Text
            tag="strong"
            value="IMPORTO"
            color="darkGrey"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            marging="0 0 0.5em 0"
            size="f8"
          />
          <br />
          <Text
            tag="span"
            value={getPrezzo()}
            color="black"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            size="f6"
          />
        </Column>
      </Row>

      {messageHeaderVisible ?
        <Row fluid margin="1em 0 0 0">
          <Text
            value={messageHeader}
            tag="strong"
            color="darkGrey"
            weight="bold"
            size="f7"
          />
        </Row>
        : null
      }
    </StyledHeader>
  );
};

ChatHeader.displayName = 'ChatHeader';

export default memo(ChatHeader);