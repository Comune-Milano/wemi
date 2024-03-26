/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import NavLink from 'components/router/NavLink';
import { connect } from 'react-redux';
import { EntEriRichiesta, graphqlRequest } from 'redux-modules/actions/authActions';
import { withRouter } from 'react-router';


const Summary = ({ richiesta, locale, EntEriRichiesta, setdati, match, open, setOpen, graphqlRequest }) => {
  useEffect(() => {
    EntEriRichiesta({ rifiuto: false });
  });

  const idRichiesta = window.location.pathname.split('/handleRequests/')[1].split('/ChiudiRichiesta')[0];

  const SchedaEnteRifiuto = () => {
    EntEriRichiesta({ rifiuto: true });
    EntEriRichiesta({ idRichiesta });
  };


  return (
    <Row fluid margin="1em 0">
      <Column xs="12" padding="0">
        {richiesta && (
        <>
          <Text
            tag="p"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            color="primary"
            value="Servizio:"
            size="f7"
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
                SchedaEnteRifiuto();
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

export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(Summary));
