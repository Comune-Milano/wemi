
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { GroupFieldTitle, FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import styled from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { getNomeServizioTCB } from 'types/tcbConstants';
import moment from 'moment';
import { NavLink } from 'components/router';
import { codiciAttributo } from 'components/navigation/CandidaturaLavoratoreTCB/constants/CodiciAttributo';
import TextAccordion from 'components/ui2/TextAccordion';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { EstraiRecensioni as EstraiRecensioniQ } from '../../DatiOperatoreGraphQL';
import FaIcon from 'components/ui2/FaIcon';
import ModalFeedback from './ModalFeedback';

const Wrapper = styled(Row)`
    padding: 1.5em;
    background-color: ${colors.greyInput};
`;

const RightColumn = styled(Column)`
    ${media.md`
        border-left: 2px solid ${colors.darkGrey};
    `} 
`;

const StyledColumn = styled(Column)`
  padding: 0 0 1em;
    ${media.md`
        &:first-child {
          padding-right: 1em;
        }
        &:nth-child(2) {
          padding-left: 1em;
        }
    `} 
`;

const FeedbackEsperienze = ({
  idLavoratore,
  esperienzeLav
}) => {
  const [RisultatoRecensione, setRecensione] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [idRichiesta, setIdRichiesta] = React.useState(false);

  const RecensioneLavoratore = useStatelessGraphQLRequest(EstraiRecensioniQ);

  React.useEffect(() => {
    getRecensione()
  }, [esperienzeLav])

  const getRecensione = async () => {

    const arrId = esperienzeLav.map((element) => {
      return element.idRichiesta;
    });

    if (arrId.length) {
      const resultQ = await RecensioneLavoratore({
        idRecensioni: arrId
      });

      const risultatoFinale = {};
      resultQ.forEach(el => {
        if (el && el.js_dati_recensione) {
          const keys = Object.keys(el.js_dati_recensione);

          keys.forEach(element => {
            if (parseInt(el.js_dati_recensione[element]) > 0 && !risultatoFinale[el.id_rich_serv_rec]) {
              risultatoFinale[el.id_rich_serv_rec] = true;
            };
          });
        }
      })
      setRecensione(risultatoFinale);
    }
  };

  const openModalFeedback = (idRichiesta) => {
    setIdRichiesta(idRichiesta);
    setOpenModal(!openModal);
  };

  const calcolaRecensione = (json, id) => {

    if (!(json && json[id])) {
      return (
        <span style={{ padding: "0 0 0 2em" }}>
          {/* <FaIcon
          padding="0.3em 1em 0 2em"
          icon="fas fa-check"
          color="primary"
          fontSize="f7"
        /> */}
          <Text
            size="f7"
            value={"(feedback da rilasciare)"}
            weight="bold"
            color={colors.darkGrey}
          />
        </span>)
    }

  };

  return (
    <>
      <GroupFieldTitle
        title="Feedback esperienze"
      />
      {esperienzeLav.map(esp => {
        let nomeFamiglia, provincia, comune, email, telefono;
        esp.attributi.forEach(attr => {
          switch (attr.cd_attributo) {
            case codiciAttributo.TX_COGNOME_CONTATTO:
              nomeFamiglia = attr.tx_val;
              break;
            case codiciAttributo.TX_PROVINCIA_SEDE_DI_LAVORO:
              provincia = attr.tx_val;
              break;
            case codiciAttributo.TX_COMUNE_SEDE_DI_LAVORO:
              comune = attr.tx_val;
              break;
            case codiciAttributo.TX_EMAIL_CONTATTO:
              email = attr.tx_val;
              break;
            case codiciAttributo.TX_TELEFONO_CONTATTO:
              telefono = attr.tx_val;
              break;
            default:
              break;
          }
        })
        return (
          <TextAccordion
            label={nomeFamiglia}
            size="f7"
            color="primary"
            nearTitle={calcolaRecensione(RisultatoRecensione, esp.idRichiesta)}
          >
            <Wrapper justifycontent="space-between">
              <Column xs="12" md="3" padding="0" sizepadding={{ md: "0 2em 0 0" }}>
                <Row fluid margin="0 0 2em" direction="column">
                  <FieldTitle
                    label="Servizi prestati:"
                    marginBottom=".5em"
                  />
                  {esp.serviziPrestati.map(el => (
                    <Text
                      size="f6"
                      value={getNomeServizioTCB(el)}
                      weight="bold"
                    />
                  ))}
                  {
                    esp.nomeServizioAltro ?
                      <Text
                        size="f6"
                        value={esp.nomeServizioAltro}
                        weight="bold"
                      />
                      : null
                  }
                </Row>
              </Column>
              <RightColumn xs="12" md="9" padding="2rem 0 0 0" sizepadding={{ md: "0 0 0 2rem" }}>
                <Row fluid margin="0 0 1em" justifycontent="space-between">
                  <StyledColumn md="6">
                    <FieldTitle
                      label="Inizio periodo:"
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={moment(esp.inizioPeriodo).format('DD/MM/YYYY')}
                    />
                  </StyledColumn>
                  <StyledColumn md="6">
                    <FieldTitle
                      label="Fine periodo:"
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={
                        moment(esp.finePeriodo).isSame('9999-12-31') ?
                          'Attualmente in corso' :
                          moment(esp.finePeriodo).format('DD/MM/YYYY')}
                    />
                  </StyledColumn>
                </Row>
                <Row fluid margin="0 0 1em">
                  <StyledColumn md="6">
                    <FieldTitle
                      label="Comune sede di lavoro:"
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={comune}
                    />
                  </StyledColumn>
                  <StyledColumn md="6">
                    <FieldTitle
                      label="Provincia sede di lavoro:"
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={provincia}
                    />
                  </StyledColumn>
                </Row>
                <Row fluid>
                  <StyledColumn md="6">
                    <FieldTitle
                      label={`Email ${nomeFamiglia}:`}
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={email}
                    />
                  </StyledColumn>
                  <StyledColumn md="6">
                    <FieldTitle
                      label={`Telefono ${nomeFamiglia}:`}
                      marginBottom=".5em"
                    />
                    <Text
                      size="f6"
                      value={telefono}
                    />
                  </StyledColumn>
                </Row>
              </RightColumn>
              <Column xs="12" padding="0">
                <Row fluid margin="2em 0 0 0">
                  <FieldTitle
                    label={`Descrizione esperienza:`}
                    marginBottom=".5em"
                  />
                  <Row fluid>
                    <Text
                      tag="p"
                      size="f6"
                      value={esp.descrizioneEsp}
                    />
                  </Row>
                </Row>
                <Row fluid justifycontent="flex-end" alignitems="center" margin="2em 0 0 0">
                  <Button
                    autowidth
                    label="Gestione Feedback"
                    weight="bold"
                    size="f7"
                    margin="0 1em 0 0"
                    onClick={() => { openModalFeedback(esp.idRichiesta) }}
                  />
                </Row>
              </Column>
            </Wrapper>
          </TextAccordion>
        )
      })}
      {idRichiesta ?
        <ModalFeedback
          openModal={openModal}
          setOpenModal={setOpenModal}
          idRichiesta={idRichiesta}
          idLavoratore={idLavoratore}
        />
        : null
      }
    </>
  );
};

FeedbackEsperienze.displayName = 'FeedbackEsperienze';

export default FeedbackEsperienze;
