/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { graphqlRequest, EntEriRichiesta } from 'redux-modules/actions/authActions';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import { connect } from 'react-redux';

import withAuthentication from 'hoc/withAuthentication';
import { withRouter } from 'react-router';


const Summary = ({ richiesta, locale, EntEriRichiesta, match, setOpen, setdati }) => {

  useEffect(() => {
    EntEriRichiesta(false);
  });


  const { idRichiesta } = match.params;

  const SchedaEnteAccettazione = () => {
    EntEriRichiesta(true);
    EntEriRichiesta({ rifiuto: false });
    EntEriRichiesta({ idRichiesta });
  };


  return (
    <Row fluid margin="1em 0">
      <Column xs="12" padding="0">
        {richiesta && (
        <>
          <Text
            value="Servizio:"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="primary"
          />
          <NavLink
            to=""
          >
            <Text
              tag="p"
              color="darkGrey"
              decoration="underline"
              value={richiesta.servizioEnte.service.txTitoloServizio[locale]}
              size="f6"
              onClick={(event) => {
                SchedaEnteAccettazione();
                event.preventDefault();
                event.stopPropagation();
                setOpen(true);
                setdati();
              }}
            />
          </NavLink>
        </>
)}
      </Column>
    </Row>
  );
};

Summary.displayName = 'Summary';

const mapDispatchToProps = ({
  EntEriRichiesta,
  graphqlRequest,
});

const mapStoreToProps = store => ({
  Accettazione: store.entEriRichiesta.Accettazione,
});

const FormWithAuth = withAuthentication(Summary);

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(FormWithAuth));
