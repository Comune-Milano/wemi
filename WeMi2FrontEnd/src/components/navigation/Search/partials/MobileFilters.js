/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui/Button';
import Drawer from 'components/ui/Drawer';
import Text from 'components/ui/Text';
import { graphqlRequest, AddEnte, AddFilter } from 'redux-modules/actions/authActions';
import Filtri from './Filtri';

const DrawerHeader = () => {
  return (
    <Row fluid justifycontent="space-between">
      <Text color="white" value="Ottimizza la ricerca" size="f5" />
    </Row>
  );
};

const DrawerBody = ({ bodyValue }) => {
  return (
    <Row fluid padding="5% 10%">
      {bodyValue.entiFiltrati ?
        <Filtri
          entiFiltrati={bodyValue.entiFiltrati}
          enti={bodyValue.enti}
        />
        : null}
    </Row>
  );
};


const MobileFilters = ({
  enti,
  entiFiltrati
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Column xs="12">
      <Button height="3rem" value="Ottimizza la ricerca" type="primary" onClick={() => setOpen(true)} />
      <Drawer
        from="bottom"
        open={open}
        openDrawer={setOpen}
        body={DrawerBody}
        bodyValue={{
          enti,
          entiFiltrati
        }}
        header={DrawerHeader}
        iconcolor="white"
        headerBgColor="primary"
      />
    </Column>
  )
};

MobileFilters.displayName = 'MobileFilters';

const mapDispatchToProps = {
  graphqlRequest,
  AddEnte,
  AddFilter,
};
export default connect(
  null,
  mapDispatchToProps,
)(MobileFilters);
