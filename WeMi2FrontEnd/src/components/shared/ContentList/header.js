import React from 'react';
import { withRouter } from 'react-router-dom';
import { Column, Row } from 'components/ui/Grid';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Text from 'components/ui/Text';

const Header = ({ contentNewUrl = '', history, rightColumnChildren }) => (
  <Row flex alignitems="center" fluid>
    <Column xs="12" md="6" padding="1rem 0">
      <ButtonIcon
        icon="plus"
        onClick={() => {
          history.push(contentNewUrl);
        }}
        aria-label="Aggiungi nuova voce"
      />
      <Text
        value="Aggiungi nuova voce"
        size="f7"
        padding="0 0 0 1.2em"
      />
    </Column>
    <>
      {rightColumnChildren ? (
        <Column xs="12" md="3" mdShift="3" padding="1rem 0">
          {rightColumnChildren}
        </Column>
      ) : <></>}
    </>
  </Row>
);

Header.displayName = 'Header Content List Component';

export default withRouter(Header);
