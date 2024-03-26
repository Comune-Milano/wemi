import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA } from 'types/url';
import withRouter from 'react-router/withRouter';
import { List } from 'components/ui2/List';
import { conChiCollabora } from './constants';

const ConChiCollabora = ({
  color = 'purple',
  history,
}) => (
  <Row fluid>
    <BackgroundTitle
      bgColor={color}
      label={conChiCollabora.title}
      size={bgTitleSizes.small}
    />
    <Column padding="0" margin="1.8em 0 0 0">
      <List>
        {conChiCollabora.list}
      </List>
    </Column>
    <div style={{ margin: '3em 0 0 0' }}>
      <Button
        label={conChiCollabora.button}
        color="purple"
        width="auto"
        padding="5px 30px"
        weight="bold"
        onClick={() => { history.push(PAGE_ORIENTAMENTO_SCOLASTICO_COME_FUNZIONA); }}
      />
    </div>
  </Row>
  );

ConChiCollabora.displayName = 'ConChiCollaboraNavigation';

export default withRouter(ConChiCollabora);
