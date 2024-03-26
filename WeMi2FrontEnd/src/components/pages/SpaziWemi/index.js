/** @format */

import React from 'react';
import { Helmet } from 'react-helmet';
import { colors } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { EditorState, convertFromRaw } from 'draft-js';
import { isObject } from 'utils/functions/typeCheckers';
import Wrapper from 'components/navigation/NavigationWrapper';
import { TextEditor } from 'components/ui2/TextEditor';
import { HeaderImage } from 'components/ui2/HeaderImage';
import Button from 'components/ui2/Button';
import Loader from 'components/ui2/Loader';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { withRouter } from 'react-router';
import { PAGE_HOME_SPAZIWEMI_URL } from 'types/url';
import { numberRegex } from 'libs/Form/validation/regex';
import { estraiSpazioWemi } from './constants';

const BodyWrapper = styled.div`
  max-width: 800px;
`;

const ComeContattarciStyledWrapper = styled.div`
  margin: 20px 0;
  padding: 20px 0;
  border-bottom: 1px solid ${colors.darkGrey};
  max-width: 800px;
`;

const TextDescrizione = styled(Text)`
  white-space: pre;
`;

const SpaziWemi = ({ match, history }) => {
  // Id spazio WeMi.
  const idSpazi = match.params.idSpazioWeMI;

  // Dati dello spazio WeMi derivante dalla remote call.

  const [spazioWeMiData, callSpazioWeMiData] = useGraphQLRequest(
    undefined,
    estraiSpazioWemi,
    { idContenuto: parseInt(idSpazi, 10) },
    false,
  );

  const fetchSpazioWeMi = React.useCallback(async () => {
    if (!numberRegex.test(idSpazi)) {
      history.push(PAGE_HOME_SPAZIWEMI_URL);
    }
    try {
      await callSpazioWeMiData();
    } catch (error) {
      history.push(PAGE_HOME_SPAZIWEMI_URL);
    }
  }, [callSpazioWeMiData, history, idSpazi]);

  React.useEffect(() => {
    fetchSpazioWeMi();
  }, []);

  // Nome spazio WeMi.
  const nomeSpazio = getObjectValue(spazioWeMiData.data, 'tl_testo_1.it');

  // Body HTML1.
  const textEditorContent1 = getObjectValue(spazioWeMiData.data, 'js_dati_contenuto.bodyHtml1EditorContent');
  const textEditorState1 = textEditorContent1 && isObject(textEditorContent1) ?
    EditorState.createWithContent(convertFromRaw(textEditorContent1)) :
    undefined;

  // Body HTML2.
  const textEditorContent2 = getObjectValue(spazioWeMiData.data, 'js_dati_contenuto.bodyHtml2EditorContent');
  const textEditorState2 = textEditorContent2 && isObject(textEditorContent2) ?
    EditorState.createWithContent(convertFromRaw(textEditorContent2)) :
    undefined;

  // URL di "prenota il tuo appuntamento"
  const url = '';


  /**
   * Renderizza il contenuto dell'editor di testo.
   * @param {*} editorState
   */
  const renderEditorContent = editorState => {
    if (!editorState) {
      return null;
    }

    return (
      <Row>
        <Column padding="0" margin="0">
          <TextEditor readOnly initialEditorState={editorState} />
        </Column>
      </Row>
    );
  };
  renderEditorContent.displayName = 'Spazi WeMi - Contenuto Editor';

  /**
   * Renderizza la sezione "come contattarci".
   */
  const renderSezioneComeContattarci = () => {
    const email = getObjectValue(spazioWeMiData.data, 'tl_testo_2.it', null);
    const indirizzo = getObjectValue(spazioWeMiData.data, 'tl_testo_3.it', '');
    const telefono = getObjectValue(spazioWeMiData.data, 'js_dati_contenuto.Telefono', null);
    const calendario = getObjectValue(spazioWeMiData.data, 'js_dati_contenuto.calendario', null);
    const descrizione = getObjectValue(spazioWeMiData.data, 'js_dati_contenuto.Descrizione', '');

    if (!email && !indirizzo && !telefono && !calendario) {
      return null;
    }

    const title = `WeMi - Spazio WeMi ${nomeSpazio}`;
    const description = `Spazio WeMi: ${nomeSpazio}, ${indirizzo}, ASCOLTO DEI BISOGNI, INFORMAZIONE E ORIENTAMENTO AI SERVIZI, CONDIVISIONE DI SERVIZI, VOLONTARIATO, ATTIVITÀ PER RAGAZZI E ADOLESCENTI, PER MAMME E BAMBINI, DI SOSTEGNO ALLA PERSONA ed AGGREGATIVE`;
    const keywords = `${nomeSpazio}, ${indirizzo}, ASCOLTO DEI BISOGNI, INFORMAZIONE E ORIENTAMENTO AI SERVIZI, CONDIVISIONE DI SERVIZI, VOLONTARIATO, ATTIVITÀ PER RAGAZZI E ADOLESCENTI, PER MAMME E BAMBINI, DI SOSTEGNO ALLA PERSONA ed AGGREGATIVE`;
    return (
      <ComeContattarciStyledWrapper>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
        </Helmet>
        <Row>
          <Column padding="0" margin="1em 0" xs="12">
            <BackgroundTitle
              size={bgTitleSizes.small}
              bgColor="blue"
              label="COME SI ACCEDE"
            />
          </Column>
          {
            calendario ? (
              <Column padding="0" margin="1em 0 0 0" xs="12">
                <Row margin="0" padding="0">
                  <Column margin="0" padding="0" xs="12" md="10" lg="10">
                    {
                      calendario.map(calendarEntry => {
                        const fasceDisponiblita = calendarEntry.disponibilita
                          .filter(disp => !!disp);

                        if (!fasceDisponiblita.length) {
                          return null;
                        }

                        const fasceDispLabel = fasceDisponiblita
                          .map(disp => {
                            const fasciaOraria = disp.oraDa && disp.oraA ?
                              `dalle ${disp.oraDa} alle ${disp.oraA}` :
                              `${disp.oraDa || disp.oraA}`;
                            return fasciaOraria;
                          })
                          .join(', ');

                        return (
                          <Row key={calendarEntry.giorno} margin="0 0 6px 0">
                            <Column padding="0" sm="2">
                              <Text
                                value={`${calendarEntry.giorno}`}
                                weight="bold"
                                size="f6"
                              />
                            </Column>
                            <Column padding="0" sm="10">
                              <Text
                                value={fasceDispLabel}
                                weight="bold"
                                size="f6"
                              />
                            </Column>
                          </Row>
                        );
                      })
                    }
                  </Column>
                </Row>
              </Column>
            ) : undefined
          }
          {
            telefono ? (
              <Row fluid padding="3em 0 0 0" margin="0">
                <Column margin="0" padding="0">
                  <Text
                    value="CHIAMACI"
                    weight="bold"
                    size="f6"
                    color="darkGrey"
                    letterSpacing="0.05em"
                  />
                </Column>
                <Column margin="0" padding="0">
                  <Text
                    value={telefono}
                    size="f6"
                    color="blue"
                    weight="bold"
                  />
                </Column>
              </Row>
            ) : undefined
          }
          {
            email ? (
              <Row fluid padding="0" margin="3em 0 0 0" xs="12">
                <Column margin="0" padding="0">
                  <Text
                    value="SCRIVICI"
                    weight="bold"
                    size="f6"
                    color="darkGrey"
                    letterSpacing="0.05em"
                  />
                </Column>
                <Column margin="0" padding="0">
                  <Text
                    value={email}
                    transform="lowercase"
                    size="f6"
                    color="blue"
                    weight="bold"
                  />
                </Column>
              </Row>
            ) : undefined
          }
          {indirizzo || descrizione ? (
            <Column margin="3em 0 0 0" padding="0">
              <Text
                value="INCONTRACI"
                weight="bold"
                size="f6"
                color="darkGrey"
                letterSpacing="0.05em"
              />
            </Column>
          )
            : null}
          {
            indirizzo ? (
              <Column padding="0" margin="0">
                <Text
                  value={`WeMi ${nomeSpazio} in ${indirizzo}`}
                  weight="bold"
                  color="blue"
                  size="f6"
                />
              </Column>
            ) : undefined
          }
          {
            descrizione ? (
              <Column margin="0" padding="0">
                <TextDescrizione
                  value={descrizione}
                  size="f6"
                  weight="bold"
                />
              </Column>
            ) : undefined
          }
        </Row>
        <Row fluid padding="3.5em 0 0 0">
          <Button
            color="blue"
            label="Prenota il tuo appuntamento"
            onClick={() => window.open(url, 'WeMi')}
            autowidth
          />
        </Row>
      </ComeContattarciStyledWrapper>
    );
  };
  renderSezioneComeContattarci.displayName = 'Spazi WeMi - Come contattarci';
  const imageTitle = nomeSpazio ? `SPAZIO \r\n WeMi ${nomeSpazio}` : null;
  const headerImage = spazioWeMiData.data && spazioWeMiData.data.oj_media1 ? spazioWeMiData.data.oj_media1 : null;

  if (spazioWeMiData.isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/** BANNER IMAGE */}
      <HeaderImage
        imageSrc={headerImage}
        title={imageTitle}
        titleTransform="none"
      />
      {/** end of BANNER IMAGE */}
      <Wrapper>
        <BodyWrapper>
          {/** BODY HTML 1 */}
          {renderEditorContent(textEditorState1)}
          {/** end of BODY HTML 1 */}

          {/** DETTAGLI DI ACCESSO */}
          {renderSezioneComeContattarci()}
          {/** end of DETTAGLI DI ACCESSO */}

          {/** BODY HTML 2 */}
          {renderEditorContent(textEditorState2)}
          {/** BODY HTML 2 */}
        </BodyWrapper>
      </Wrapper>
    </>
  );
};

SpaziWemi.displayName = 'SpaziWemi';

export default withRouter(SpaziWemi);
