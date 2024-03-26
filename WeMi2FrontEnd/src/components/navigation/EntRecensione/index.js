/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Hr from 'components/ui/Hr';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import TextArea from 'components/ui2/TextArea';
import Rating from 'components/ui2/Rating';
import Button from 'components/ui2/Button';
import { isNullOrUndefined } from 'util';
import withAuthentication from 'hoc/withAuthentication';
import withRouter from 'react-router-dom/withRouter';
import { Redirect } from 'react-router';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { OPERATORE_ENTE } from 'types/userRole';
import Modale from './Modale';
import {
  inserisciFeedbackServizioEnte as inserisciFeedbackServizioEnteQ,
  estraiRichiestePerIdEnte as estraiRichiestePerIdEnteQ,
  estraiRecensione as estraiRecensioneQ,
  EstraiEnteServizio as EstraiEnteServizioQ,
  EstraiNomeUtente as EstraiNomeUtenteQ,
  confermaRecensione as confermaRecensioneQ,
  extractRating,
  richiediRecensione as richiediRecensioneQ,
} from './EntRecensioneGraphQL';

import Wrapper from './partials/Wrapper';

const MyColumn = styled(Column)`
  margin-top: 0.5em;
  justify-content: flex-start;

  ${media.sm`
  margin-top: 0;
  justify-content: flex-end;
`}
`;

const EntRecensione = ({
  match,
  graphqlRequest,
  recensione,
  New,
  EstraiEnteServizio,
  locale,
  EstraiNomeUtente,
  readOnly,
  userProfile,
  history,
  confirmFromFeedback,
}) => {
  const { datiLogin } = userProfile;
  const [valutazioneGenerale, setValutazioneGenerale] = useState(0);
  const [valutazioneVelocita, setValutazioneVelocita] = useState(0);
  const [valutazionePuntualita, setValutazionePuntualita] = useState(0);
  const [valutazioneCortesia, setValutazioneCortesia] = useState(0);
  const [apriModale, setApriModale] = useState(false);
  const [scriviNota, setScriviNota] = useState('');
  const [redirectRequestsIndex, setRedirectRequestsIndex] = useState(false);
  const richiediRecensione = useStatelessGraphQLRequest(richiediRecensioneQ);
  const sendFeedback = useStatelessGraphQLRequest(inserisciFeedbackServizioEnteQ);

  const idRichiestaServizioEnte = match.params.idRichiesta;

  const [rating] = useGraphQLRequest(
    undefined,
    extractRating,
    {
      idRichiestaEnte: Number.parseInt(idRichiestaServizioEnte, 10),
    },
    true
  );

  useEffect(() => {
    if (rating.isLoading || rating.pristine) {
      return;
    }

    const cd_stato_recensione = rating?.data?.ultimoStato?.cd_stato_recensione;

    const isRequestedByInstiution =
      cd_stato_recensione && ['1', '2', '3'].includes(cd_stato_recensione);

    if (!rating.data || !isRequestedByInstiution) {
      history.push('/');
    }
  }, [rating]);

  const confermaFeedbackCittadino = () => {
    const datiFeedback = {};
    datiFeedback.id_rich_serv_rec = parseInt(idRichiestaServizioEnte, 10);
    datiFeedback.qt_media_singola_recensione = valutazioneGenerale || 0.0; // type Float
    datiFeedback.qtVelocita = valutazioneVelocita || 0;
    datiFeedback.qtCortesia = valutazioneCortesia || 0;
    datiFeedback.qtPuntualita = valutazionePuntualita || 0;
    datiFeedback.txNotaRecensione = scriviNota;
    sendFeedback(datiFeedback);
    setApriModale(true);
  };

  const confermaFeedbackEnte = () => {
    graphqlRequest(confermaRecensioneQ(idRichiestaServizioEnte));
    setApriModale(true);
    graphqlRequest(estraiRichiestePerIdEnteQ(datiLogin.idEnte, 0));
  };

  const richiediFeedbackEnte = async () => {
    await richiediRecensione({ idRichiestaEnte: parseInt(idRichiestaServizioEnte, 10) });
    graphqlRequest(estraiRichiestePerIdEnteQ(datiLogin.idEnte, 0));
    setRedirectRequestsIndex(true);
  };

  const categoryRating = [
    {
      title: 'Valutazione generale del servizio offerto',
      set: setValutazioneGenerale,
      stars: valutazioneGenerale,
    },
    {
      title: "Puntualità dell'operatore",
      set: setValutazionePuntualita,
      stars: valutazionePuntualita,
    },
    {
      title: 'Velocità nel rispondere alla richiesta',
      set: setValutazioneVelocita,
      stars: valutazioneVelocita,
    },
    {
      title: "Professionalità dell'operatore",
      set: setValutazioneCortesia,
      stars: valutazioneCortesia,
    },
  ];

  const [statoValiditaRecensione, setValiditaRecensione] = useState();
  const [statoValiditaConfermaRecensione, setConfermaRecensione] = useState();

  useEffect(() => {
    if (New) {
      graphqlRequest(estraiRecensioneQ(parseInt(idRichiestaServizioEnte)));
      graphqlRequest(EstraiEnteServizioQ(parseInt(idRichiestaServizioEnte)));
    } else {
      graphqlRequest(estraiRecensioneQ(parseInt(idRichiestaServizioEnte)));
      graphqlRequest(EstraiNomeUtenteQ(parseInt(idRichiestaServizioEnte)));
    }
  }, []);

  useEffect(() => {
    if (recensione) {
      setValutazioneGenerale(getObjectValue(recensione, 'qt_media_singola_recensione', null));
      setValutazioneVelocita(getObjectValue(recensione, 'js_dati_recensione.qtVelocita', null));
      setValutazionePuntualita(getObjectValue(recensione, 'js_dati_recensione.qtPuntualita', null));
      setValutazioneCortesia(getObjectValue(recensione, 'js_dati_recensione.qtCortesia', null));
      setScriviNota(getObjectValue(recensione, 'js_dati_recensione.txNotaRecensione', ''));
      setValiditaRecensione(
        recensione.ultimoStato.cd_stato_recensione === '3' ||
          recensione.ultimoStato.cd_stato_recensione === '2'
      );
      setConfermaRecensione(
        !isNullOrUndefined(recensione) &&
          (recensione.ultimoStato.cd_stato_recensione === '3' ||
            recensione.ultimoStato.cd_stato_recensione === '1')
      );
    }
  }, [recensione]);

  // if (New || recensione)
  return (
    <Wrapper fluid>
      {EstraiEnteServizio && (
        <Row fluid margin="0">
          <Text
            intlFormatter
            value="Per offrirti un servizio migliore, ti chiediamo di valutare il servizio"
            size="f7"
          />
          &nbsp;
          <Text
            intlFormatter
            value={EstraiEnteServizio.tl_testo_1[locale]}
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
            size="f7"
          />
          &nbsp;
          <Text intlFormatter value="rilasciato dall’ente" size="f7" />
          &nbsp;
          <Text
            intlFormatter
            value={EstraiEnteServizio.nm_ente}
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
            size="f7"
          />
        </Row>
      )}
      {EstraiNomeUtente &&
        recensione &&
        recensione.ultimoStato &&
        (recensione.ultimoStato.cd_stato_recensione === '2' ||
          recensione.ultimoStato.cd_stato_recensione === '3') && (
          <Row fluid margin="0">
            <Text intlFormatter value="Recensione rilasciata da " size="f7" />
            &nbsp;
            {
              datiLogin?.Profilo !== OPERATORE_ENTE ? (
                <Text
                  intlFormatter
                  value={EstraiNomeUtente.ptx_username}
                  transform="uppercase"
                  letterSpacing="0.05em"
                  weight="bold"
                  size="f7"
                />
              ) : undefined
            }
            &nbsp;
            <Text
              intlFormatter
              value={` ${datiLogin?.Profilo !== OPERATORE_ENTE ? '(' : ''}${EstraiNomeUtente.tx_nome_utente} ${EstraiNomeUtente.tx_cognome_utente} ${datiLogin?.Profilo !== OPERATORE_ENTE ? ')' : ''}`}
              transform="uppercase"
              letterSpacing="0.05em"
              weight="bold"
              size="f7"
            />
          </Row>
        )}
      <Hr width="100%" height="1.5px" color="darkGrey" type="solid" top="4px" bottom="1em" />
      {categoryRating.map((rating, i) => (
        <Row fluid margin="0" alignitems="center" key={i.toString()} padding="1em 0 0 0">
          <Column xs="12" sm="8" md="9" lg="9" padding="0 1.5rem 0 0" alignself="center">
            <Text
              intlFormatter
              value={rating.title}
              transform="uppercase"
              letterSpacing="0.05em"
              weight="bold"
              color="primary"
              size="f6"
              padding="0 0.2rem 0 0"
              aria-label={rating.title}
              tabindex="0"
            />
          </Column>
          <MyColumn
            xs="12"
            sm="4"
            md="3"
            lg="3"
            flex
            justifycontent="flex-end"
            padding="0"
            alignself="center"
          >
            <Rating
              fontSize="f6"
              color="primary"
              onClick={(valore) => {
                rating.set(valore);
              }}
              stars={rating.stars}
              readOnly={!New || statoValiditaRecensione}
              border
              spacingRight="0.2em"
            />
          </MyColumn>
          <Hr width="100%" height="1.5px" color="grey" type="solid" top="0px" bottom="0px" />
        </Row>
      ))}

      <Row fluid padding="2.5rem 0 0 0">
        <TextArea
          material
          height="8.5rem"
          readOnly={!New || readOnly || statoValiditaRecensione}
          label="COMMENTO"
          onChange={(valore) => {
            setScriviNota(valore);
          }}
          inputValue={scriviNota}
        />
      </Row>

      <Modale
        open={apriModale}
        setOpenModal={setApriModale}
        userProfile={userProfile}
        confirmFromFeedback={confirmFromFeedback}
      />

      {New ? (
        <Row fluid justifycontent="flex-end" padding="2em 0">
          <Button
            autowidth
            label="INVIA RECENSIONE"
            disabled={
              !valutazioneGenerale ||
              !valutazioneVelocita ||
              !valutazionePuntualita ||
              !valutazioneCortesia
            }
            onClick={confermaFeedbackCittadino}
            fontSize="f6"
            color="primary"
            name="INVIA RECENSIONE"
            padding="0.4em 3em"
            disabled={statoValiditaRecensione}
          />
        </Row>
      ) : (
        !readOnly && (
          <Row fluid padding="2em 0">
            <Column flex xs="12" smShift="1" sm="5" padding="1rem 0">
              <Button
                disabled={statoValiditaConfermaRecensione}
                submit
                label="CONFERMA RECENSIONE"
                name="CONFERMA RECENSIONE"
                fontSize="f7_5"
                width="100%"
                color="primary"
                onClick={confermaFeedbackEnte}
                padding="0.4rem 1rem"
              />
            </Column>
            {redirectRequestsIndex ? (
              <Redirect to={`/e/${datiLogin.idEnte}/handleRequests`} />
            ) : null}
            <Column flex xs="12" smShift="1" sm="5" padding="1rem 0">
              <Button
                disabled={statoValiditaConfermaRecensione}
                submit
                label="RICHIEDI FEEDBACK"
                name="RICHIEDI FEEDBACK"
                fontSize="f7_5"
                width="100%"
                color="primary"
                onClick={richiediFeedbackEnte}
                padding="0.4rem 1rem"
              />
            </Column>
          </Row>
        )
      )}
    </Wrapper>
  );
  // else if (isNull(recensione))
  //   return (window.history.go(-1) && <Loader margin="0 auto" />)
  // else
  //   return <Loader margin="0 auto" />
};
const mapDispatchToProps = {
  graphqlRequest,
};
const mapStoreToProps = (store) => ({
  recensione:
    store.graphql.EstraiRecensione &&
    store.graphql.EstraiRecensione.EstraiRecensioneRichiestaServizioEnte,
  EstraiEnteServizio: store.graphql.EstraiEnteServizio,
  locale: store.locale,
  EstraiNomeUtente: store.graphql.EstraiNomeUtente,
});

EntRecensione.displayName = 'EntRecensione';
const EntRecensioneWithRouter = withRouter(EntRecensione);
export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(withAuthentication(EntRecensioneWithRouter));
