/** @format */

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RemoveEnte, graphqlRequest } from 'redux-modules/actions/authActions';
import SingleEnt from 'components/navigation/Search/partials/EntGridElement/index';
import styled, { css } from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import { hexToRgba } from 'utils/functions/hexToRgba'
import { calcPrezzoStimato } from './utils';

const StyledRow = styled(Row)`
    background-color: ${hexToRgba(colors.primary, 0.15)};
    > div {
      width: 100%
    }
`

const EntiSelezionati = ({
  openEntService,
  setOpenEntService,
  openSchedaEnte,
  setOpenSchedaEnte,
  openPrice,
  setOpenPrice,
  openRating,
  setOpenRating,
  array,
  RemoveEnte,
  qPrestazione,
  qPersone,
  dataset,
  match,
}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!array.length > 0) {
      setRedirect(true)
    }
  }, [array])

  return (
    <>
      {
        redirect ? <Redirect to={match.url.split('/forward')[0]} />
          : null
      }
      <StyledRow fluid margin="3em 0" padding="1em" >
        <Text
          value="Riepilogo enti selezionati"
          tag="h2"
          transform="uppercase"
          letterSpacing="0.05em"
          intlFormatter
          color="black"
          weight="normal"
          size="f6"
          padding="0.8em 1.2em 0.8em 1.2em"
        />
        {array.map((ent, index) => {
          let jsDatiPrezzo = ent.js_dati_prezzo;
          let unavailable = parseInt(ent.cd_tipo_servizio_erog) === 1 && parseInt(qPersone) > 1;
          return (
            <div style={{ padding: "0 0 2em 0" }} key={index.toString()}>
              <SingleEnt
                completaRichiesta
                calcLightCost={ent.cd_tipo_offerta_srv === 3 ?
                  !isNaN(dataset[`costoTotalCalcolato${ent.id_servizio_ente}`]) ?
                  '€ ' + parseInt(dataset[`costoTotalCalcolato${ent.id_servizio_ente}`], 10).toFixed(2).replace('.', ',')
                  : 'Non erogabile'
                  : 'Gratuito'
                }
                openPrice={openPrice}
                setOpenPrice={setOpenPrice}
                openRating={openRating}
                setOpenRating={setOpenRating}
                setOpenSchedaEnte={setOpenSchedaEnte}
                openSchedaEnte={openSchedaEnte}
                setOpenEntService={setOpenEntService}
                openEntService={openEntService}
                enteProps={ent}
                removeEnte={() => { RemoveEnte(ent) }}
              />
            </div>
          )
        }
        )}
      </StyledRow>
    </>
  );

};

EntiSelezionati.displayName = 'EntiSelezionati';
function mapStateToProps(state) {
  const { user } = state;
  const { enti } = user;
  return {
    array: enti,
    locale: state.locale,
    loaded: state.loaded,
  };
}
const mapDispatchToProps = {
  RemoveEnte,
  graphqlRequest,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(EntiSelezionati));
