import React from 'react';
import { Row } from 'components/ui/Grid';
import { AccediRegistrati } from './partials';

const LoginModalService = ({ openModal, setState, array }) => (
  <Row justifycontent="center" padding="1em 2em">
    <AccediRegistrati
      openModal={openModal}
      setShowComponent={() => { }}
      showComponent={false}
      array={array}
      setState={setState}
    />
  </Row>
);

LoginModalService.displayName = 'login modal service';

export default LoginModalService;
