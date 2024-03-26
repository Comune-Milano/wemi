/** @format */

import React, { useEffect } from 'react';
import { Row } from 'components/ui/Grid';
import { setFilter } from 'redux-modules/actions/filterActions';
import { connect } from 'react-redux';
import { AddParameters } from 'redux-modules/actions/goi003Actions';
import { resetField } from 'redux-modules/actions/authActions';
import AreaPersonaleColumn from './AreaPersonaleColumn';

const Personale = ({
  Card,
  filtri,
  setFilter,
  goi003,
  AddParameters,
  resetField,
  paddingDescription
}) => {

  useEffect(() => {
    if (filtri && (filtri.statoGestioneEnti || filtri.ricercaNome)) {
      setFilter({
        ...filtri,
        statoGestioneEnti: '',
        ricercaNome: ""
      });
    }
    if (goi003) {
      AddParameters({
        ...goi003,
        eliminaMedia: [],
        media1: {},
        media2: {},
        sedi: [],
        operatori: [],
        eliminaUsers: []
      });
    }
  }, [setFilter, AddParameters]);

  useEffect(() => {
    resetField('usersCollegatiEnte');
    resetField('enteDatiPK');
  }, [resetField])


  //fare una styled column che assegna ai figli un margin bottom per separarli
  return (
    <Row justifycontent="center">
      {
        Card.map((element, index) => (
          <AreaPersonaleColumn
            element={element}
            paddingDescription={paddingDescription}
            key={'AreaPersonaleCard-' + index}
          />
        ))
      }
    </Row>
  )
};
const mapDispatchToProps = {
  setFilter,
  AddParameters,
  resetField,
};
function mapStateToProps(state) {
  const { filter, goi003 } = state;
  return {

    filtri: filter.filter,
    goi003: goi003
  };
}

Personale.displayName = 'Personale';


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personale);