import { Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import React from 'react';
import withRouter from 'react-router/withRouter';
import { PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO } from 'types/url';
import ComeFunziona from './leftcolumn.partials.js/comefunziona';
import DomandeFrequenti from './leftcolumn.partials.js/domandefrequenti';
import Extrascolastico from './leftcolumn.partials.js/extrascolastico';
import InItalia from './leftcolumn.partials.js/initalia';
import PrePartenza from './leftcolumn.partials.js/prepartenza';

const LeftColumn = ({ history }) => (
  <>
    <ComeFunziona />
    <PrePartenza />
    <InItalia />
    <Extrascolastico />
    <DomandeFrequenti />
    <Column padding="0" margin="3em 0 0 0">
      <Button
        color="purple"
        label="voglio sapere di più sul servizio"
        width="auto"
        onClick={() => { history.push(PAGE_INCLUSIONE_VOGLIO_SAPERNE_DI_PIU_EXTRASCOLASTICO); }}
        weight="bold"
        padding="5px 30px"
      />
    </Column>
  </>
);

LeftColumn.displayName = 'LeftColumn';
export default withRouter(LeftColumn);
