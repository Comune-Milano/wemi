/** @format */

import React, { useEffect } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import InputUi2 from 'components/ui2/Input';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import TextArea2 from 'components/ui2/TextArea';
import { TextEditor } from 'components/ui2/TextEditor';
import media from 'utils/media-queries';
import { withRouter } from 'react-router';
import InputFile from 'components/ui2/InputFile';
import { noop } from 'utils/functions/noop';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import WeekCalendarTimePicker from 'components/ui2/WeekCalendarTimePicker';
import { convertFasceOrarieToObj } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import Select from 'components/ui2/Select';
import useWindowSize from 'hooks/useWindowSize';

const CalendarRow = styled(Row)`
   background-color: #ECECEC;
`;

const InputAreaTitolo = styled(Input)`
font-size:1.1rem;
`;
const StyledInputColumn = styled(Column)`

`;
const TextAreaEmail = styled(TextArea)`

${media.sm`
width: 48.5rem;
height: 6rem; 
  `}
${media.md`
width: 17rem;
height: 7.5rem; 
  `}
${media.lg`
width: 20rem;
height: 7em; 
`}

`;


const ValoriTestuali = ({
  getAddressValue,
  addressState,
  municipi,
  json,
  getValue,
  draft,
  locale,
  disponibilita,
  setDisponibilita,
  cnt4,
  loaded,
  Telefono,
  Descrizione,
  valorilabel,
  match,
  getTextEditorValue,
  getMunicipalityState,
  municipalityState,
  getAllegatoValue,
  datiContenuto,
  allegatoPdf,
  setAllegatoPdf,
  contenutoDataLoaded,
  bodyHtml1EditorState,
  setBodyHtml1EditorState,
  bodyHtml2EditorState,
  setBodyHtml2EditorState,
  descrizioneValue,
}) => {
  const path = window.location.pathname.split('crud/')[1];
  let nuovaVoce = false;
  if (path === ':new') nuovaVoce = true;


  useEffect(() => {
    if (draft && draft.js_dati_contenuto) {
      // il calendario controllo se c'è altrimento lo inizializzo come vuole il componente
      if (draft.js_dati_contenuto.calendario) {
        setDisponibilita(convertFasceOrarieToObj(draft.js_dati_contenuto.calendario));
      }
      Telefono({ value: draft.js_dati_contenuto.Telefono });
      Descrizione(draft.js_dati_contenuto.Descrizione);
    }
  }, [draft]);

  const renderTlTesto1 = () => {
    if ((!nuovaVoce && !draft) || !json || !json.tl_testo_1) {
      return null;
    }

    if (match.params.tyCnt === '12' || match.params.tyCnt === '8') {
      return (
        <Column xs={12} md={3} padding="1em 0">
          <TextArea
            preserveLineBreaks
            id="tl_testo_1"
            getValue={getValue.bind(this)}
            size="f7"
            material
            name={valorilabel.tl_testo_1}
            initialValue={draft && draft.tl_testo_1 && draft.tl_testo_1[locale]}
            color="blue"
            width="100%"
            height="18.5rem"
          />
        </Column>
      );
    }

    return (
      <StyledInputColumn xs="12" md={cnt4 ? '11' : match.params.tyCnt === '4' ? '5' : '3'} padding="1em 0">
        <InputAreaTitolo
          id="tl_testo_1"
          getValue={getValue.bind(this)}
          required
          initialValue={draft && draft.tl_testo_1 && draft.tl_testo_1[locale]}
          material
          intlLabel={valorilabel.tl_testo_1}
          color="blue"
          width="100%"
          height="15rem"
        />
      </StyledInputColumn>
    );
  };

  const breakpoint = useWindowSize();

  return (
    <>
      <Row fluid>
        <Text value="Valori testuali: " size="f7" color="blue" weight="bold" />
      </Row>
      <Column xs="12" md={cnt4 ? '6' : '12'} lg={cnt4 ? '6' : '12'} padding="0.5em 0 0">
        <Row justifycontent="space-between" fluid>
          {renderTlTesto1()}
          <Row fluid>
            {/* è === ad email per ty cont 7 per l'impaginazione   */}
            {((nuovaVoce || draft) && json && json.tl_testo_2) ?
              valorilabel.tl_testo_2 === 'Email' ? (
                <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} padding="1em 0">
                  <TextAreaEmail
                    id="tl_testo_2"
                    getValue={getValue.bind(this)}
                    material
                    name={valorilabel.tl_testo_2}
                    initialValue={draft && draft.tl_testo_2 && draft.tl_testo_2[locale]}
                    color="blue"
                    width="100%"
                    height="15rem"
                    fontsizePerContenuti
                  />
                  {draft && draft.tl_testo_2 && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )}
                </StyledInputColumn>
              )
                : (
                  <StyledInputColumn xs="12" sm="12" md={cnt4 ? '11' : match.params.tyCnt === '4' ? '5' : '3'} padding="1em 0">
                    <TextArea
                      id="tl_testo_2"
                      getValue={getValue.bind(this)}
                      size="f7"
                      preserveLineBreaks={match.params.tyCnt === '12' || match.params.tyCnt === '8'}
                      material
                      name={valorilabel.tl_testo_2}
                      initialValue={draft && draft.tl_testo_2 && draft.tl_testo_2[locale]}
                      color="blue"
                      width="100%"
                      height="18.5rem"
                      fontsizePerContenuti
                    />
                    {draft && draft.tl_testo_2 && (
                      <Row fluid padding="0" flex direction="column">
                      </Row>
                    )}
                  </StyledInputColumn>
                ) : null
            }

            {(nuovaVoce || draft) && json && json.tl_testo_3 &&
              valorilabel.tl_testo_3 !== 'Sotto titolo pagina informativa' && match.params.tyCnt !== '7' && (
                <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} mdShift="1" padding="1em 0">
                  <TextArea
                    id="tl_testo_3"
                    getValue={getValue.bind(this)}
                    preserveLineBreaks={match.params.tyCnt === '12' || match.params.tyCnt === '8'}
                    size="f7"
                    material
                    name={valorilabel.tl_testo_3}
                    color="blue"

                    initialValue={draft && draft.tl_testo_3 && draft.tl_testo_3[locale]}
                  />
                  {draft && draft.tl_testo_3 && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )
                  }
                </StyledInputColumn>
              )}

            {(nuovaVoce || draft) && parseInt(match.params.tyCnt, 10) === 7 && (
              <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} mdShift="1" flex padding="1em 0" alignitems="center">
                <Row fluid>
                  <Select
                    enableSearch
                    name="municipi"
                    label="Municipi"
                    required
                    items={municipi.data}
                    selectedValue={municipalityState}
                    clickedItem={getMunicipalityState}
                    /* clickedSelectedItem={() => getMunicipalityState()} */
                    placeholder="Seleziona municipio"
                    color="blue"
                  />
                  {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.Municipio && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )}
                </Row>
              </StyledInputColumn>

            )}

            {(nuovaVoce || draft) && parseInt(match.params.tyCnt, 10) === 7 && (
              <Row fluid>
                <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} padding="1em 0">
                  <InputUi2
                    name="specie"
                    label="specie"
                    required
                    placeholder="Inserisci via/vicolo/viale..."
                    color="blue"
                    onChange={(value) => getAddressValue('specie', value)}
                    inputValue={addressState.specie}

                  />
                  {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.specie && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )}
                </StyledInputColumn>

                <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} mdShift="1" padding="1em 0">
                  <InputUi2
                    name="denominazione"
                    label="denominazione"
                    required
                    onChange={(value) => getAddressValue('denominazione', value)}
                    placeholder="Inserisci nome della via"
                    color="blue"
                    inputValue={addressState.denominazione}

                  />
                  {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.denominazione && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )}
                </StyledInputColumn>

                <StyledInputColumn xs="12" mdShift="1" md={cnt4 ? '11' : '3'} padding="1em 0">
                  <InputUi2
                    name="numero civico"
                    label="nr.civico"
                    required
                    placeholder="Inserisci numero civico"
                    color="blue"
                    inputValue={addressState.civico}
                    onChange={(value) => getAddressValue('civico', value)}
                  />
                  {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.civico && (
                    <Row fluid padding="0" flex direction="column">
                    </Row>
                  )}
                </StyledInputColumn>
              </Row>
            )}

            {/* solo per ty contenuto 2 / 10 / 11 */}
            {(nuovaVoce || draft) && json && json.tl_testo_3 && valorilabel.tl_testo_3 === 'Sotto titolo pagina informativa' && (
              <Row fluid>
                <StyledInputColumn xs="12" md={cnt4 ? '11' : '3'} padding="1em 0">
                  <InputAreaTitolo
                    id="tl_testo_3"
                    getValue={getValue.bind(this)}
                    initialValue={draft && draft.tl_testo_3 && draft.tl_testo_3[locale]}
                    material
                    intlLabel={valorilabel.tl_testo_3}
                    color="blue"
                    width="100%"
                    height="15rem"
                  />

                </StyledInputColumn>
              </Row>
            )}
            {
              (nuovaVoce || draft) && (nuovaVoce || contenutoDataLoaded) && json && json.tl_testo_4 &&
              (
                <StyledInputColumn
                  xs="12"
                  md={cnt4 ? '11' : (parseInt(match.params.tyCnt, 10) === 7 ? '12' : '3')}
                  mdShift={parseInt(match.params.tyCnt, 10) === 7 ? 0 : 1}
                  padding="1em 0"
                >
                  {
                    parseInt(match.params.tyCnt, 10) === 7 ? (
                      <>
                        <StyledInputColumn xs="12" padding="0">
                          <Text value={valorilabel.tl_testo_4} size="f8" color="blue" />
                        </StyledInputColumn>
                        <StyledInputColumn xs="12" padding="0.4em 0 1em 0">
                          <TextEditor
                            onEditorStateChange={setBodyHtml1EditorState}
                            initialEditorState={bodyHtml1EditorState}
                          />
                        </StyledInputColumn>
                      </>
                    ) : (
                      <TextArea
                        id="tl_testo_4"
                        getValue={getValue.bind(this)}
                        material
                        name={valorilabel.tl_testo_4}
                        color="blue"
                        width="100%"
                        initialValue={draft && draft.tl_testo_4 && draft.tl_testo_4[locale]}
                      />
                      )
                  }
                  {
                    draft && draft.tl_testo_4 &&
                    (
                      <Row fluid padding="0" flex direction="column">
                      </Row>
                    )
                  }
                </StyledInputColumn>
              )
            }
          </Row>

          <Row fluid>
            {
              (nuovaVoce || draft) &&
              json &&
              json.tl_testo_5 &&
              valorilabel.tl_testo_5.toLowerCase() !== 'area di testo pagina informativa' &&
              (nuovaVoce || contenutoDataLoaded) &&
              (
                parseInt(match.params.tyCnt, 10) === 7 ? (
                  <>
                    <StyledInputColumn xs="12" padding="0">
                      <Text value={valorilabel.tl_testo_5} size="f8" color="blue" />
                    </StyledInputColumn>
                    <StyledInputColumn xs="12" padding="0.4em 0 1em 0">
                      <TextEditor
                        onEditorStateChange={setBodyHtml2EditorState}
                        initialEditorState={bodyHtml2EditorState}
                      />
                    </StyledInputColumn>
                  </>
                ) : (
                  <StyledInputColumn xs="12" md={cnt4 || true ? '11' : '3'} padding="1em 0">
                    <TextArea
                      id="tl_testo_5"
                      getValue={getValue.bind(this)}
                      material
                      name={valorilabel.tl_testo_5}
                      color="blue"
                      initialValue={draft && draft.tl_testo_5 && draft.tl_testo_5[locale]}
                      width="100%"
                      height="15rem"
                    />
                    {
                        draft && draft.tl_testo_5 && (
                          <Row fluid padding="0" flex direction="column"></Row>
                        )
                      }
                  </StyledInputColumn>
                  )
              )
            }

            {
              (nuovaVoce || draft) &&
                json &&
                json.tl_testo_5 &&
                valorilabel.tl_testo_5.toLowerCase() === 'area di testo pagina informativa' ?
                (
                  <>
                    <StyledInputColumn xs="12" md={cnt4 || true ? '11' : '3'} padding="1em 0 0 0">
                      <Text value={valorilabel.tl_testo_5} size="f8" color="blue" />
                    </StyledInputColumn>
                    <StyledInputColumn xs="12" padding="0.4em 0 1em 0">
                      <TextEditor
                        onEditorStateChange={getTextEditorValue}
                        initialEditorState={
                          datiContenuto && datiContenuto.textEditorContent ?
                            EditorState.createWithContent(convertFromRaw(datiContenuto.textEditorContent)) :
                            EditorState.createEmpty()
                        }
                      />
                    </StyledInputColumn>
                    {/** Allega documento pdf */}
                    <Row fluid>
                      <StyledInputColumn xs="12" md={cnt4 || true ? '11' : '3'} padding="1em 0 0 0">
                        <Text value="Allega pdf" size="f8" color="blue" />
                      </StyledInputColumn>
                    </Row>
                    <Column xs="6" padding="0">
                      <Row fluid>
                        <Column padding="0.4em 0">
                          <InputFile
                            onChange={getAllegatoValue}
                            onError={noop}
                            icon="plus"
                            accept="application/pdf"
                            label="Allega-pdf"
                            id="upload-file"
                          />
                          <span style={{ marginLeft: '6px' }}>{allegatoPdf && allegatoPdf.nm_nome_media || 'nessun file'}</span>
                        </Column>
                        <Column xs="12" padding="0.4em 0">
                          <ButtonIcon
                            icon="minus"
                            color="red"
                            aria-controls="filename"
                            disabled={!allegatoPdf || allegatoPdf.removed}
                            onClick={() => {
                              setAllegatoPdf({ id_media: allegatoPdf.id_media, ty_mime_type_media: '-1', removed: true });
                            }}
                          />
                        </Column>
                      </Row>
                    </Column>
                  </>
                ) : null
            }

            {(nuovaVoce || draft) && window.location.pathname.split('/')[4] === '7' && (
              <StyledInputColumn xs="12" md={cnt4 ? '11' : '4'} padding="1.5em 0">
                <TextArea
                  id="Telefono"
                  getValue={Telefono.bind(this)}
                  material
                  name="Telefono"
                  color="blue"
                  width="100%"
                  // height="75%"
                  initialValue={draft && draft.js_dati_contenuto && draft.js_dati_contenuto.Telefono}
                />
                {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.Telefono && (
                  <Row fluid padding="0" flex direction="column">
                  </Row>
                )}
              </StyledInputColumn>
            )}
            {(nuovaVoce || draft) && window.location.pathname.split('/')[4] === '7' && (
              <StyledInputColumn xs="12" md={cnt4 ? '11' : '4'} sizepadding={{ xs: '1em 0', md: '1em 0 0 1em' }}>
                {/* <TextArea
                  id="Descrizione"
                  getValue={Descrizione.bind(this)}
                  material
                  name=
                  color="blue"
                  width="100%"
                  initialValue={draft && draft.js_dati_contenuto && draft.js_dati_contenuto.Descrizione}
                /> */}
                <TextArea2
                  label="Descrizione"
                  hoverColor="blue"
                  color="blue"
                  inputValue={descrizioneValue}
                  onChange={(value) => Descrizione(value)}
                  width="100%"
                  height="7.1em"
                />
                {draft && draft.js_dati_contenuto && draft.js_dati_contenuto.Descrizione && (
                  <Row fluid padding="0" flex direction="column">
                  </Row>
                )}
              </StyledInputColumn>
            )}


          </Row>

          {
            (() => {
              if (parseInt(match.params.tyCnt, 10) !== 7) {
                return null;
              }
              return (
                <CalendarRow fluid margin="10px 0 20px 0">
                  {
                    disponibilita && (
                      <WeekCalendarTimePicker
                        hideRadio
                        maxIntervals={2}
                        calendar={disponibilita}
                        onChange={(range) => {
                          const newObj = {
                            ...disponibilita,
                            ...range,
                          };
                          setDisponibilita(newObj);
                        }}
                      />
                    )}
                </CalendarRow>
              );
            })()
          }
        </Row>

      </Column>
    </>

  );
};

ValoriTestuali.displayName = 'ValoriTestuali';

export default withRouter(ValoriTestuali);
