/** @format */

import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { PAGE_ENTI_SERVICE_FLOW } from 'types/url';
import { addListiniPrezzi } from 'redux-modules/actions/forwardEntiActions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Row, Column } from 'components/ui/Grid';
import {
  PriceModal,
  EntServiceModal,
  SchedaEnteModal,
  RatingModal,
} from 'components/navigation/Search/partials/EntGridElement/modals';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Loader from 'components/ui2/Loader';
import { Riepilogo, CompletaRichiesta } from './partials';
import { getListiniPrezzi } from './RequestServiceGraphQL';

const RequestService = ({
  requestService,
  match,
  addListiniPrezzi,
  filtri,
  indirizzo,
  destinatariDisponibili,
  mansioniDisponibili,
  fasceOrarieDisponibili,
  unitaPrezzoServizio,
  entiSelezionati,
  removeEnte,
}) => {
  const [openRating, setOpenRating] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openSchedaEnte, setOpenSchedaEnte] = useState(false);
  const [openEntService, setOpenEntService] = useState(false);

  const {
    dataset,
    setFormField,
    resetFormFields,
    isFormValid,
    errors,
    handleFieldBlur,
    touched,
  } = useFormContext();

  const generateRedirectUrl = () => {
    const obj = {
      idServizio: match.params.idServizio,
      codSezione: match.params.codSezione,
    };
    if (match.params.idCategoria) {
      obj.idCategoria = match.params.idCategoria;
    }
    return generatePath(
      PAGE_ENTI_SERVICE_FLOW,
      obj,
    );
  };

  const checkAllServicesIndividuali = (enti) => (
    enti.every(ente => ente.listinoPrezzi && ente.listinoPrezzi.cdTipoServizioErog === 1)
  );

  const {
    fasceOrarie,
    mansioni,
    destinatari,
  } = filtri;

  const labelFasceOrarie = useMemo(
    () => fasceOrarie.map(
      idFasciaOraria => fasceOrarieDisponibili.find(fascia => fascia.id === idFasciaOraria)?.label
    ),
    [fasceOrarie, fasceOrarieDisponibili]
  );

  const labelMansioni = useMemo(
    () => mansioni.map(
      idMansione => mansioniDisponibili.find(mansione => mansione.id === idMansione)?.label
    ),
    [mansioni, mansioniDisponibili]
  );

  const labelDestinatari = useMemo(
    () => destinatari.map(
      idDestinatario => destinatariDisponibili.find(dest => dest.id === idDestinatario)?.label
    ),
    [destinatari, destinatariDisponibili]
  );

  return (
    <>
      <Row fluid justifycontent="space-between">
        <Row fluid justifycontent="space-between">
          <Column xs={12} md={6} lg={6} padding="0">
            <CompletaRichiesta
              allIndividuale={checkAllServicesIndividuali(entiSelezionati)}
              handleFieldBlur={handleFieldBlur}
              dataset={dataset}
              setFormField={setFormField}
              resetFormFields={resetFormFields}
              formErrors={errors}
              touchedFields={touched}
              completeRequest={requestService.completaRichiesta}
              enti={entiSelezionati}
              indirizzo={indirizzo}
              labelFasceOrarie={labelFasceOrarie}
              labelMansioni={labelMansioni}
              labelDestinatari={labelDestinatari}
              filtri={filtri}
              unitaPrezzoServizio={unitaPrezzoServizio}
            />
          </Column>
          <Column xs={12} md={6} lg={5} padding="0" sizepadding={{ md: '0 0 0 3em' }}>
            <Riepilogo
              entiSelezionati={entiSelezionati}
              dataset={dataset}
              error={errors}
              isFormValid={isFormValid}
              openPrice={openPrice}
              setOpenPrice={setOpenPrice}
              openRating={openRating}
              setOpenRating={setOpenRating}
              setOpenSchedaEnte={setOpenSchedaEnte}
              openSchedaEnte={openSchedaEnte}
              setOpenEntService={setOpenEntService}
              openEntService={openEntService}
              riepilogoRequest={requestService.riepilogo}
              labelFasceOrarie={labelFasceOrarie}
              labelMansioni={labelMansioni}
              labelDestinatari={labelDestinatari}
              match={match}
              redirectUrl={generateRedirectUrl()}
              filtri={filtri}
              indirizzo={indirizzo}
              removeEnte={removeEnte}
            />
          </Column>
        </Row>
        <RatingModal open={openRating} setOpen={setOpenRating} />
        <PriceModal open={openPrice} setOpen={setOpenPrice} />
        <SchedaEnteModal open={openSchedaEnte} setOpen={setOpenSchedaEnte} />
        <EntServiceModal open={openEntService} setOpen={setOpenEntService} />
      </Row>
    </>
  );
};

RequestService.displayName = 'RequestService';

const mapDispatchToProps = {
  addListiniPrezzi,
};

export default connect(null, mapDispatchToProps)(RequestService);
