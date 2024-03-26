/** @format */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { graphqlRequest, overlaySpinner } from 'redux-modules/actions/authActions';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import DatePicker from 'components/ui2/DatePicker';
import Input from 'components/ui2/Input';
import Tooltip from 'components/ui2/Tooltip';
import TextArea from 'components/ui2/TextArea';
import { serviziByUtente as serviziByUtenteQ } from 'components/navigation/RequestsIndex/RequestIndexsGraphQL';
import Hr from 'components/ui/Hr';
import withAuthentication from 'hoc/withAuthentication';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';
import styled from 'styled-components';
import { getObjectValue } from 'utils/extensions/objectExtensions';

const RiepilogoTitleColumn = styled(Column)`
  border-bottom: 1px solid;
`;

const CompletaRichiesta = ({
  userProfile,
  completeRequest,
  overlaySpinner,
  graphqlRequest,
  handleFieldBlur,
  dataset,
  setFormField,
  formErrors,
  enti,
  indirizzo,
  labelFasceOrarie,
  labelMansioni,
  labelDestinatari,
  indiceRichieste,
  richiestaInoltrata,
  touchedFields,
  filtri,
  unitaPrezzoServizio,
}) => {
  const { fromDay, toDay, messaggioAgliEnti, infoDisp } = dataset;

  const { datiLogin } = userProfile;

  const [inoltrata, setInoltrata] = useState(false);

  const testEnti = (array) => {
    if (array.length !== enti.length) {
      return false;
    }
    for (let i = 0; i <= array.length; i += 1) {
      if (array[i] && enti[i] &&
        array[i].id_servizio_erogato_ente !== enti[i].idServizioEnte) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (richiestaInoltrata && richiestaInoltrata.InserisciModificaRichiestaServizioEnte &&
      richiestaInoltrata.InserisciModificaRichiestaServizioEnte.id_richiesta_servizio_ente &&
      testEnti(richiestaInoltrata.InserisciModificaRichiestaServizioEnte.enti)
    ) {
      setInoltrata(true);
    }
    if (inoltrata) {
      const { datiLogin } = userProfile;

      graphqlRequest(serviziByUtenteQ({
        idUtente: datiLogin.idCittadino,
        numElementi: 0,
      }));
      overlaySpinner();
    }
    const { datiLogin } = userProfile;
    setFormField('infoDisp', datiLogin?.isYoung ? 2 : 1);
  }, [inoltrata, richiestaInoltrata, indiceRichieste, userProfile]);

  const sostantivoQuantita = getObjectValue(unitaPrezzoServizio, 'tl_testo_sostantivo.it', '');
  const aggettivoSostantivoQuantita = getObjectValue(unitaPrezzoServizio, 'fg_genere_maschile') ? 'richiesti' : 'richieste';

  return (
    <>
      {inoltrata ?
        <Redirect to={PAGE_REQUESTSINDEX_URL} />
        : null
      }
      <Text
        value="Completa la tua richiesta"
        size="f6"
        tag="h2"
        weight="bold"
        color="black"
        transform="uppercase"
        letterSpacing="0.05em"
      />
      <Text
        value="Verifica i dettagli della tua richiesta"
        intlFormatter
        tag="p"
        size="f7"
      />
      <Hr height="1.5px" color="darkGrey" width="100%" left="0" top="1em" bottom="1.5em" />

      <Row fluid margin="1em 0 0">
        <Column xs="6" padding="0 0.5em 0 0">
          <Tooltip
            position="bottom"
            color="white"
            fluid
            bgcolor="blue"
            value="Funzionalità di acquisto non disponibile per cittadini minori di 18 anni"
            posAdjustment="0%"
            preventOnHover={!datiLogin?.isYoung}
          >
            <Button
              label="Richiedi disponibilità"
              fontSize="f7"
              disabled={datiLogin?.isYoung}
              padding="0.5em 0.6em"
              isActive={infoDisp === 1}
              onClick={() => setFormField('infoDisp', 1)}
            />
          </Tooltip>
        </Column>
        <Column xs="6" padding="0 0 0 0.5em">
          <Button
            label="Richiedi informazioni"
            fontSize="f7"
            padding="0.5em 0.6em"
            isActive={infoDisp === 2}
            onClick={() => setFormField('infoDisp', 2)}
          />
        </Column>
      </Row>

      {
        infoDisp === 1 ?
          (
            <>
              <Row fluid margin="1em 0 0">
                <Column xs={12} padding="0 0 .5em">
                  <Text
                    value={completeRequest.labelSection.first.label}
                    tag="h3"
                    weight="bold"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    intlFormatter
                    color="primary"
                    margin="0"
                    size="f6"
                  />
                </Column>
                <Column md={6} padding="0.5em 0 0 0" sizepadding={{ md: '0 0.5em 0 0' }}>
                  <div style={{ position: 'relative' }}>
                    <DatePicker
                      required
                      label="Dal giorno"
                      error={formErrors.fromDay ? formErrors.fromDay : null}
                      onBlur={() => handleFieldBlur('fromDay')}
                      onChange={(day) => {
                        setFormField('fromDay', day);
                      }}
                      selectedDate={fromDay}
                      disabledDays={(date) => {
                        const today = new Date();
                        return date < today.setDate(today.getDate() - 1);
                      }}
                    />
                  </div>
                </Column>
                <Column md={6} padding="1em 0 0 0" sizepadding={{ md: '0 0 0 0.5em' }} relative>
                  <div style={{ position: 'relative' }}>
                    <DatePicker
                      required
                      label="Al giorno"
                      error={formErrors.toDay ?
                        formErrors.toDay : null
                      }
                      onBlur={() => handleFieldBlur('toDay')}
                      onChange={(day) => {
                        setFormField('toDay', day);
                      }}
                      selectedDate={toDay}
                      disabledDays={(date) => fromDay ? date < fromDay : false}
                    />
                  </div>
                </Column>
              </Row>
            </>
          ) : null
      }
      <Row fluid margin="1em 0 0">
        <Column xs={12} padding="0 0 .5em">
          <Text
            value="Messaggio"
            tag="h3"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            intlFormatter
            color="primary"
            margin="0"
            size="f6"
          />
        </Column>
        <Column xs="12" padding="0.5em 0 2em 0" sizepadding={{ md: '0' }}>
          <TextArea
            required={infoDisp === 2}
            width="100%"
            placeholder="Scrivi qui..."
            error={infoDisp === 2 && touchedFields.messaggioAgliEnti && formErrors.messaggioAgliEnti ?
              formErrors.messaggioAgliEnti : null}
            height="8em"
            onChange={(value) => {
              handleFieldBlur('messaggioAgliEnti');
              setFormField('messaggioAgliEnti', value);
            }}
            inputValue={messaggioAgliEnti}
            label="Scrivi agli enti"
          />
        </Column>
      </Row>

      <Row margin="2em 0">
        <RiepilogoTitleColumn
          padding="0 0 0.4em 0"
          margin="0 0 0.8em 0"
          xs="12"
        >
          <Text
            value="Riepilogo"
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
          />
        </RiepilogoTitleColumn>
        {
          indirizzo ? (
            <Column padding="1em 0 0" xs="12">
              <Text value="Indirizzo " />
              <Text
                weight="bold"
                value={indirizzo}
              />
            </Column>
          ) : null
        }
        <Column padding="0" xs="12">
          <Text value="Numero di persone " />
          <Text
            weight="bold"
            value={filtri.quantitaPersone}
          />
        </Column>
        <Column padding="0" xs="12">
          <Text value={`Numero di ${sostantivoQuantita} ${aggettivoSostantivoQuantita} `} />
          <Text
            weight="bold"
            value={filtri.quantitaUnita}
          />
        </Column>
        {
          labelFasceOrarie?.length ? (
            <Column padding="0" xs="12">
              <Text value="Momento della giornata " />
              <Text
                weight="bold"
                value={labelFasceOrarie.join(', ')}
              />
            </Column>
          ) : null
        }
        {
          labelDestinatari?.length ? (
            <Column padding="0" xs="12">
              <Text value="Destinatari " />
              <Text
                weight="bold"
                value={labelDestinatari.join(', ')}
              />
            </Column>
          ) : null
        }
        {
          labelMansioni?.length ? (
            <Column padding="0" xs="12">
              <Text value="Mansioni " />
              <Text
                weight="bold"
                value={labelMansioni.join(', ')}
              />
            </Column>
          ) : null
        }
      </Row>

    </>
  );
};

CompletaRichiesta.displayName = 'CompletaRichiesta';
const mapDispatchToProps = {
  graphqlRequest,
  overlaySpinner,
};
const mapStoreToProps = store => ({
  error: store.error.log,
  dataFiltri: store.user.filtri,
  indiceRichieste: store.graphql.RequestIndexByUtente,
  richiestaInoltrata: store.graphql.ServizioBaseAdd,
  loaded: store.graphql.loaded,
  locale: store.locale,
});
export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(withAuthentication(CompletaRichiesta));
