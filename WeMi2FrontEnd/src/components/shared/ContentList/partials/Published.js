import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { Disable } from './buttons/Disable';
import { Modify } from './buttons/Modify';

const PublishedRow = ({
  id,
  onModify,
  onDisable,
  lockActions,
  description,
}) => (
  <Row fluid padding="0" justifycontent="center" key={`action_column_published_${id}`}>
    <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
      <Disable
        handleDisable={onDisable}
        id={id}
        disabled={lockActions}
        description={description}
      />
    </Column>
    <Column xs="2" flex justifycontent="center" padding="1em 0" margin="0">
      <Modify
        id={id}
        handleModify={onModify}
        disabled={lockActions}
        description={description}
      />
    </Column>
  </Row>
);

PublishedRow.displayName = 'Published row content';


export const Published = PublishedRow;
