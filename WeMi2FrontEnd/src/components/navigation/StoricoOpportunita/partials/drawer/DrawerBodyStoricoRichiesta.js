import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { withRouter, generatePath } from 'react-router';
import { PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, PAGE_FEEDBACK_LAVORATORE_LAVORATORE_URL } from 'types/url';
import checkAdmin from 'utils/functions/checkAdmin';

const StyledBody = styled.div`
  padding: 3em 3em;

  ${media.md`
    padding: 3em 6em;
  `}
`;

const DrawerBodyStoricoRichiesta = ({ data, userProfile, history }) => {
  const isAdmin = checkAdmin(userProfile.datiLogin);

  const buttonData = [
    {
      text: 'Visualizza la recensione lasciata dalla famiglia',
      buttonText: 'Visualizza Recensione',
      buttonColor: 'primary',
      disabled: data && data.cdStatoRecensione !== 3,
      btnClick: () => {
        const path = generatePath(
          isAdmin ? PAGE_FEEDBACK_LAVORATORE_ADMIN_URL : PAGE_FEEDBACK_LAVORATORE_LAVORATORE_URL,
          { idRichiesta: data.idRichiesta }
        );
        history.push(path, { isFromBackoffice: true, idLavoratore: data.idLavoratore });
      },
    },
  ];

  return (
    <>
      {data ? (
        <StyledBody>
          {buttonData.map((btnData, index) => (
            <Row fluid key={index.toString()} padding="0 0 1em 0">
              <Column xs="7" md="7" padding="0" alignself="center">
                <Text
                  intlFormatter
                  tag="h1"
                  value={btnData.text}
                  color="black"
                  weight="bold"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  marging="0 0 0.5em 0"
                  size="f8"
                />
              </Column>
              <Column xs="5" md="5" padding="0" alignself="center">
                <Button
                  disabled={btnData.disabled}
                  color={btnData.buttonColor}
                  label={btnData.buttonText}
                  value={btnData.buttonText}
                  onClick={() => btnData.btnClick(btnData.buttonType)}
                  fontSize="f8"
                />
              </Column>
            </Row>
            ))}
        </StyledBody>
      ) : null}
    </>
  );
};

DrawerBodyStoricoRichiesta.displayName = 'DrawerBodyStoricoRichiesta';
export default withRouter(DrawerBodyStoricoRichiesta);
