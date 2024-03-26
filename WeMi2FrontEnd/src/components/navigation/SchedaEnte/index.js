/** @format */

import React, { useState } from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Hr from 'components/ui/Hr';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors, fonts } from 'theme';
import FaIcon from 'components/ui2/FaIcon';
import TriggerDownload from 'components/shared/TriggerDownload';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { EstraiMediaBase64 as EstraiMediaBase64Q } from '../Search/partials/EntGridElement/modals/ModaleSchedaGraphql';

export const StyledDivDownload = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  &:hover, &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)};
  }
`;


const StyledRow = styled(Row)`
    ${media.md`
        > div:first-child {
            border-right: 2px solid ${colors.grey};
        }
    `}
`;

const StyledList = styled.ul`
  box-sizing: border-box;
  padding: 1em 0em;
  margin: 0;
  width: 100%;

  > li {
    padding-bottom: 1em;
    margin-left: 1em;
    text-indent: -1em;
    clear: both;
    font-size: ${fonts.size.f6};
    color: ${colors.darkGrey};

    &:before {
        content: '';
        background-color: ${colors.primary};
        height: 0.4em;
        width: 0.4em;
        display: inline-block;
        margin-right: 0.6em;
        border-radius: 100%;
        vertical-align: 10%;
    }
  }
`;

const SchedaEnte = ({ ente, locale, estraiAllegati, logoEnte }) => {
  const [verificaDownload, setVerifica] = useState(false);

  const estraibase64 = useStatelessGraphQLRequest(EstraiMediaBase64Q, undefined, res => res.EstraiMediaBase64.oj_media);

  const tl_descrizione_ente = getObjectValue(ente, `datiEnte.tl_descrizione_ente.${locale}`, '');
    // ci sono tutti questi controlli perchè viene insterito erroneamente null a mò di stringa
    // quindi la funzione getObjectValue viene aggirata
  const servizi = getObjectValue(ente, 'serviziAccreditati', []);

  return (
    <>
      <StyledRow>
        <Column xs="12" md="7" lg="8" padding="0" sizepadding={{ md: '0 3.9rem 0 0' }}>
          <Text
            transform="uppercase"
            value="presentazione"
            size="f6"
            color="primary"
            tag="h3"
            weight="bold"
            letterSpacing="0.05em"
          />
          <Hr height="1.5px" width="100%" color="primary" top="0" />
          <Text
            tag="p"
            size="f7"
            color="black"
            padding="1em 0"
            whitespace="pre-line"
            value={tl_descrizione_ente}
          />
        </Column>
        <Column xs="12" md="5" lg="4" padding="2em 0 0 0" sizepadding={{ md: '0 0 0 3.9rem' }}>
          <img
            src={logoEnte}
            alt="Logo Ente"
            style={{ maxHeight: '80%', maxWidth: '80%' }}
          />
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="servizi offerti"
            size="f6"
            color="primary"
            tag="h3"
            weight="bold"
            padding="3.9rem 0 0 0"
          />
          <Hr height="1.5px" width="100%" color="primary" top="0" />
          <StyledList>
            {servizi.map((item, i) => (
              <li key={`serv${i}`}>
                <Text
                  value={item.txTitoloServizio[locale]}
                  color="darkGrey"
                  tag="strong"
                  weight="normal"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  size="f6"
                />
              </li>
                        ))}
          </StyledList>
        </Column>
      </StyledRow>
      {estraiAllegati && estraiAllegati.length > 0 ? (
        <Column margin="3.91rem 0 0 0" padding="0">
          {estraiAllegati.map(element => {
            const isValue = element.tl_valore_testuale;
            const isLocalValue = isValue && element.tl_valore_testuale[locale];
            const TrimValue = isLocalValue && element.tl_valore_testuale[locale].trim();
            const testoMedia = TrimValue ? element.tl_valore_testuale[locale] : element.nm_nome_media.split('.')[0];
            return (
              <Row>
                <TriggerDownload
                  dataCallback={() => !verificaDownload ? estraibase64({ id_media: element.id_media }) : null}
                  onDownloadStart={() => { setVerifica(true); }}
                  onDownloadDone={() => { setVerifica(false); }}
                  fileName={element.nm_nome_media}
                >
                  {({ triggerClick }) => (
                    <>
                      <StyledDivDownload
                        onClick={!verificaDownload ? triggerClick : null}
                                        // onKeyDown={(event) => handleKeyDown(event, triggerClick)}
                        tabIndex={0}
                        role="button"
                      >
                        <FaIcon
                          fontSize="f7"
                          icon="fa fa-download"
                          color="primary"
                        />

                        <Text
                          weight="bold"
                          value={testoMedia}
                          size="f7"
                          padding="0 0 0 1em"
                          decoration="underline"
                          color="black"
                          tag="p"
                        />
                      </StyledDivDownload>
                    </>
                            )}
                </TriggerDownload>
              </Row>
            );
          })}
        </Column>
    )
                : null
            }
    </>
  );
};

SchedaEnte.displayName = 'SchedaEnte';


export default SchedaEnte;
