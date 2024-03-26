import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import { Modify } from './buttons/Modify';
import { Publish } from './buttons/Publish';
import { Disable } from './buttons/Disable';

const DraftRow = ({
  id,
  onPublish,
  onModify,
  onDisable,
  lockActions,
  description,
}) => (
  <Row fluid padding="0" justifycontent="center" key={`action_column_draft_${id}`}>
    <Publish
      id={id}
      handlePublish={onPublish}
      disabled={lockActions}
      description={description}
    />
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

DraftRow.displayName = 'Draft row content';

export const Draft = DraftRow;
