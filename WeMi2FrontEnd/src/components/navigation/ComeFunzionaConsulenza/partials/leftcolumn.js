import Button from 'components/ui2/Button';
import React from 'react';
import withRouter from 'react-router/withRouter';
import { PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO } from 'types/url';
import ComeFunziona from './leftcolumn.partial.js/comefunziona';
import Contatto from './leftcolumn.partial.js/contatto';
import Informazione from './leftcolumn.partial.js/informazione';
import Supporto from './leftcolumn.partial.js/supporto';

const LeftColumn = ({ history }) => (
  <>
    <ComeFunziona />
    <Contatto />
    <Informazione />
    <Supporto />
    <div style={{ margin: '3em 0 0 0' }}>
      <Button
        color="green"
        label="voglio sapere di più sul servizio"
        width="auto"
        onClick={() => { history.push(PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_SERVIZIO); }}
        weight="bold"
        padding="5px 30px"
      />
    </div>
  </>
);

LeftColumn.displayName = 'LeftColumn';
export default withRouter(LeftColumn);
