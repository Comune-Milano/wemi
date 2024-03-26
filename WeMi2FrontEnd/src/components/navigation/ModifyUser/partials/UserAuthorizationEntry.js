import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';

const UserAuthorizationEntry = React.memo(({
  id,
  textValue,
  deleteAuthorization
}) => {

  return (
    <Row fluid margin="0 0 0.5em 0">
      <Column padding="1em" lg="5" md="6" xs="10">
        <Text
          value={textValue}
          size="f6"
        />
      </Column>
      <Column padding="1em 0 0 0" lg="2" xs="2">
        <ButtonIcon
          color="red"
          icon="minus"
          onClick={() => deleteAuthorization(id)}
        />
      </Column>
    </Row>
  );
});

UserAuthorizationEntry.displayName = 'ModificaUtenzaNavigation - UserAuthorizationEntry';

export default UserAuthorizationEntry;