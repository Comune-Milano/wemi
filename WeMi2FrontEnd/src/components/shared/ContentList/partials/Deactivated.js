import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { withRouter } from 'react-router';
import withAuthentication from 'hoc/withAuthentication';
import { Publish } from './buttons/Publish';
import { Modify } from './buttons/Modify';

const DeactivatedRow = ({
  id,
  onPublish,
  onModify,
  lockActions,
  description,

}) => (
  <Row fluid padding="0" justifycontent="center" key={`action_column_disable_${id}`}>
    <Publish
      id={id}
      disabled={lockActions}
      handlePublish={onPublish}
      description={description}
    />
    <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
      <Modify
        id={id}
        disabled={lockActions}
        handleModify={onModify}
        description={description}
      />
    </Column>
  </Row>
);

DeactivatedRow.displayName = 'Deactivated Actions Row Component';

export const Deactivated = withRouter(withAuthentication(DeactivatedRow));
