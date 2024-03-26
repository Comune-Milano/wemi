import React, { useState, useEffect } from 'react';
import Accordion from 'components/ui/Accordion';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';
import TextArea from 'components/ui/TextArea';
import Icon from 'components/ui/Icon';
import FaIcon from 'components/ui/FaIcon';
import InputFile from 'components/ui/InputFile';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import {
  EstraiAllegatoEnte as EstraiAllegatoEnteQ,
} from 'components/pages/DatiEnte/enteGraphQL';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import TriggerDownload from 'components/shared/TriggerDownload';
import styled from 'styled-components';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { colors } from 'theme';
import AccordionBodyWrapper from './AccordionBodyWrapper';

export const StyledDivDownload = styled.div`
  width: 100%
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  &:hover, &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)};
  }
`;

const SocialSection = ({
  Data,
  setControllo,
  controllo,
  CatchNotes,
  Key,
  ruolo,
  stato,
  disabilitaPerSalvare,
  userProfile,
  disabilitaModificaCampi,
  disableNotes,
}) => {
  const isAmministratore = checkAdmin(userProfile.datiLogin);

  const [logo, setLogo] = useState({ file: Data.logo, fileName: Data.nm_nome_media });
  const [allegatiEnte, setAllegatiEnte] = useState(Data.allegatiEnte.map(el => ({ ...el, elimina: !el.id_media })));
  const [preventDownload, setPreventDownload] = useState(false);

  useEffect(() => {
    const verificaAllegati = allegatiEnte
    .filter(
      el =>
        el.cd_dominio === 'PRIVACY_POLICY' ||
        el.cd_dominio === 'CONDIZIONI_UTILIZZO' ||
        el.cd_dominio === 'MODULO_RECESSO'
    )
    .every(el => !el.elimina || el.oj_media);

    if (logo.file && verificaAllegati) {
      setControllo(true);
    } else {
      setControllo(false);
    }
  }, [logo, allegatiEnte]);

  const performEstraiAllegatoEnte = useStatelessGraphQLRequest(EstraiAllegatoEnteQ);

  const handleStateFile = async(event, data, isLogo) => {
    try {
      const reader = new FileReader();
      const file = event.target.files[0];
      const fileName = file.name;
      const mimeType = file.type;
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        gestisciStatoMedia(
          event,
          {
            fileName,
            mimeType,
            base64: event.target.result,
          },
          { ...data },
          isLogo,
          false
        );
      };
    } catch (error) {
      throw (error);
    }
  };

  const handleFileDownload = (data) => {
    return performEstraiAllegatoEnte(
      {
        id_media: data.id_media,
        id_ente: Key.id_ente_rif,
      }
    );
  };

  const handleKeyDown = (event, callback) => {
    if (event.keyCode === keyCodes.ENTER) {
      callback();
    }
  };

  const handleDeleteFile = (event, data, isLogo) => {
    gestisciStatoMedia(event, {}, data, isLogo, true);
  };

  const gestisciStatoMedia = (event, { fileName, mimeType, base64 }, data, isLogo, elimina) => {
    if (!Data.gestisciMedia) {
      Data.gestisciMedia = [];
    }

    const media = {
      isLogo,
      id_media: isLogo ? data.id_img_logo : data.id_media,
      base64,
      id_ente: Key.id_ente_rif,
      cd_dominio: isLogo ? null : data.cd_dominio,
      ty_mime_type_media: elimina ? data.ty_mime_type_media : mimeType,
      nm_nome_media_old: data.nm_nome_media,
      nm_nome_media_new: fileName,
      elimina,
    };

    const aggiungiModificaStatoLogo = () => {
      const logoIndex = Data.gestisciMedia.findIndex(el => el.isLogo);
      if (logoIndex === -1) {
        Data.gestisciMedia.push(media);
      } else {
        Data.gestisciMedia[logoIndex] = media;
      }

      setLogo({
        file: elimina ? null : event.target.result,
        fileName: elimina ? null : fileName,
      });
    };

    const aggiungiModificaStatoAllegato = () => {
      const allegatoIndex = Data.gestisciMedia.findIndex(el => el.cd_dominio === data.cd_dominio);
      if (allegatoIndex === -1) {
        Data.gestisciMedia.push(media);
      } else if (elimina) {
        Data.gestisciMedia.splice(allegatoIndex, 1);
      } else {
        Data.gestisciMedia[allegatoIndex] = media;
      }

      const allegatiEnteCopy = [...allegatiEnte];
      const indexAllegatoEnte = allegatiEnteCopy.findIndex(el => el.cd_dominio === data.cd_dominio);
      const allegatoEnte = allegatiEnteCopy[indexAllegatoEnte];
      allegatoEnte.id_media = data.id_media;
      allegatoEnte.ty_mime_type_media = elimina ? null : mimeType;
      allegatoEnte.nm_nome_media = elimina ? null : fileName;
      allegatoEnte.elimina = elimina;

      setAllegatiEnte(allegatiEnteCopy);
    };

    if (isLogo) {
      aggiungiModificaStatoLogo();
    } else {
      aggiungiModificaStatoAllegato();
    }
  };

  return (
    <Accordion
      headerBgColorOpen="blue"
      headerBgColor="grey"
      maxHeight="none"
      headerColorOpen="white"
      headerColor="blue"
      arrowOpenColor="white"
      arrowClosedColor="blue"
      arrowSize="f1"
      headerPadding="0.75rem 1.25rem"
      aperto={false}
      AccordionHeader={() => <Text weight="bold" value={Data.titolo} intlFormatter size="f4" />}
    >
      <>
        <AccordionBodyWrapper>
          <>
            <Row fluid margin="1em 0">
              <Column lg={10} padding="0 1em">
                <Row division={12} fluid margin="1em 0">
                  <Column lg={2} padding="0 1em">
                    <Text value="Logo" color="black" />
                    <Text value=" *" color="red" />
                    <Text value=" :" />
                  </Column>
                  {!isNullOrUndefined(logo.file) ? (
                    <a href={logo.file} download={logo.fileName}>
                      <Column lg={5} padding="0 1em">
                        <Icon src={logo.file} height="7em" />
                      </Column>
                    </a>
              ) : null}
                  {!disabilitaModificaCampi && (
                    <>
                      <Column lg={3} padding="0 1em">
                        <InputFile
                          icon
                          height="auto"
                          width="100%"
                          value="Allega file"
                          tabIndex={0}
                          onDone={event => {
                            handleStateFile(event, Data, true);
                          }}
                          accept="image/*"
                          fontsize="f7"
                        />
                      </Column>
                      {logo.file ? (
                        <Column
                          lg={3}
                          padding="0 1em"
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={event => handleDeleteFile(event, Data, true)}
                            onKeyDown={(event) => handleKeyDown(event, () => handleDeleteFile(event, Data, false))}
                          >
                            <FaIcon
                              icon="\f068"
                              radius="50%"
                              noShadow
                              width="2em"
                              height="2em"
                              bgcolor="red"
                              fontSize="f7"
                              padding="0.5em"
                              color="white"
                              display="inline-flex"
                            />
                            <Text
                              value="Elimina file "
                              padding="0 0 0 1em"
                            />
                          </div>
                        </Column>
                      ) : null}
                    </>
              )}
                </Row>
              </Column>
            </Row>
            {allegatiEnte.map((el, index) => (
              <Row key={index.toString()} fluid margin="1em 0">
                <Column lg={12} padding="0 1em">
                  <Row fluid margin="1em 0">
                    <Column lg={3} padding="0 1em">
                      <Text
                        value={el.tl_valore_testuale && el.tl_valore_testuale.trim() ? el.tl_valore_testuale : `Documento ${(index + 1).toString()}`}
                        color="black"
                      />
                      <Text value={el.cd_dominio === 'PRIVACY_POLICY' || el.cd_dominio === 'CONDIZIONI_UTILIZZO' || el.cd_dominio === 'MODULO_RECESSO' ? ' *' : ''} color="red" />
                      <Text value=" :" />
                    </Column>
                    <Column lg={5} padding="0 1em">
                      <TriggerDownload
                        dataCallback={() => handleFileDownload(el)}
                        onDownloadStart={() => setPreventDownload(true)}
                        onDownloadDone={() => setPreventDownload(false)}
                        fileName={el.nm_nome_media}
                      >
                        {({ triggerClick }) => (
                          <Row
                            fluid
                            justifycontent="flex-start"
                            alignitems="center"
                          >
                            {el.nm_nome_media ? (
                              <StyledDivDownload
                                onClick={() => el.id_media && !preventDownload ? triggerClick() : Promise.resolve()}
                                onKeyDown={(event) => handleKeyDown(event, triggerClick)}
                                tabIndex={0}
                                role="button"
                              >
                                <FaIcon
                                  fontSize="f7"
                                  height="3em"
                                  width="3em"
                                  margin="0"
                                  noShadow
                                  icon={'\f1c1'}
                                />
                                <Text
                                  whitespace="nowrap"
                                  weight="bold"
                                  value={el.nm_nome_media}
                                  size="f7"
                                  padding="0 0.5em 0 0"
                                  color="darkGrey"
                                  tag="p"
                                />
                              </StyledDivDownload>
                            ) : null}
                          </Row>
                        )}
                      </TriggerDownload>
                    </Column>
                    {!disabilitaModificaCampi && (
                      <>
                        <Column lg={2} padding="0 1em">
                          <InputFile
                            icon
                            height="auto"
                            width="100%"
                            value="Allega file"
                            tabIndex={0}
                            onDone={event => {
                              handleStateFile(event, el, false);
                            }}
                            accept="application/pdf"
                            fontsize="f7"
                          />
                        </Column>
                        {!el.elimina ? (
                          <Column
                            lg={2}
                            padding="0 1em"
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={event => handleDeleteFile(event, el, false)}
                              onKeyDown={(event) => handleKeyDown(event, () => handleDeleteFile(event, el, false))}
                            >
                              <FaIcon
                                icon="\f068"
                                radius="50%"
                                noShadow
                                width="2em"
                                height="2em"
                                bgcolor="red"
                                fontSize="f7"
                                padding="0.5em"
                                color="white"
                                display="inline-flex"
                              />
                              <Text
                                value="Elimina file "
                                padding="0 0 0 1em"
                              />
                            </div>
                          </Column>
                      ) : null}
                      </>
                    )}
                  </Row>
                </Column>
              </Row>
              ))}

            <Row division={12}>
              {/* link sito web */}
              <Column lg="6">
                <Input
                  material
                  id="txWeb"
                  initialValue={Data && Data.sito ? Data.sito : ''}
                  intlLabel="Web"
                  disabled={disabilitaModificaCampi}
                  onChange={event => {
                    Data.sito = event.target.value;
                    Key.js_altre_info.txWeb = event.target.value;
                  }}
                />
              </Column>

              {/* link facebook */}
              <Column lg="6">
                <Input
                  material
                  id="txFacebook"
                  initialValue={Data && Data.facebook ? Data.facebook : ''}
                  intlLabel="Facebook"
                  disabled={disabilitaModificaCampi}
                  onChange={event => {
                    Data.facebook = event.target.value;
                    Key.js_altre_info.txFacebook = event.target.value;
                  }}
                />
              </Column>
            </Row>

            <Row division={12}>
              {/* link instagram */}
              <Column lg="6">
                <Input
                  material
                  id="txInstagram"
                  initialValue={Data && Data.instagram ? Data.instagram : ''}
                  intlLabel="Instagram"
                  disabled={disabilitaModificaCampi}
                  onChange={event => {
                    Data.instagram = event.target.value;
                    Key.js_altre_info.txInstagram = event.target.value;
                  }}
                />
              </Column>

              {/* link twitter */}
              <Column lg="6">
                <Input
                  material
                  id="txTwitter"
                  initialValue={Data && Data.twitter ? Data.twitter : ''}
                  disabled={disabilitaModificaCampi}
                  intlLabel="Twitter"
                  onChange={event => {
                    Data.twitter = event.target.value;
                    Key.js_altre_info.txTwitter = event.target.value;
                  }}
                />
              </Column>
            </Row>

            <Row division={12}>
              {/* link youtube */}
              <Column lg="6">
                <Input
                  material
                  id="txYoutube"
                  initialValue={ Data.youtube }
                  intlLabel="Youtube"
                  disabled={disabilitaModificaCampi}
                  onChange={event => {
                    Data.youtube = event.target.value;
                    Key.js_altre_info.txYoutube = event.target.value;
                  }}
                />
              </Column>
              </Row>

            {/* Indicazioni della redazione WeMi */}
            <Row division={12}>
              <Column lg="12">
                {isAmministratore || Data.note ? (
                  <TextArea
                    material
                    id="note4"
                    name="Indicazioni della redazione WeMi"
                    preserveLineBreaks
                    backgroundColor="yellow"
                    disabledBackgroundColor="yellow"
                    initialValue={Data.note}
                    readOnly={disableNotes ? 'true' : 'false'}
                    getValue={value => {
                      CatchNotes(value);
                    }}
                  />
            ) : null}
              </Column>
            </Row>
          </>
        </AccordionBodyWrapper>
      </>
    </Accordion>
  );
};

SocialSection.displayName = 'SocialSection';

export default withAuthentication(SocialSection);
