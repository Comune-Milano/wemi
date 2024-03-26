/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';

const OrderNm = ({
  getValue,
  draft,
  max
}) => {
  useEffect(()=>{
    //inizializza ordine visualizzazione senza questo invia 0 cioè l'inizializzazione della variabile
    if(draft && draft.nr_ordine_visualizzazione){
      getValue(draft.nr_ordine_visualizzazione)
    }
  },[draft])
  
  return (
    <Column xs="12" padding="0.5em 0 0">
      <Row justifycontent="space-between" fluid>
        <Column xs="12" md="3" padding="1em 0">
          <Input
            type="number"
            min="1"
            required
            /*max={window.location.pathname.split('/')[7] ==':new' ? Number(max)+1 :Number(max)}*/
            getValue={getValue.bind(this)}
            material
            intlPlaceholder={draft && draft.nr_ordine_visualizzazione}
            intlLabel="Ordine di visualizzazione"
            color="blue"
          />
          {draft && draft.nr_ordine_visualizzazione && <Row fluid padding="0" >
            {/* <Text tag="p" value={'Valore attuale: '} size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />               */}
            {/* <Text tag="p" value={draft.nr_ordine_visualizzazione} size="f8" color="darkGrey" padding="0.5em 0.5em 0 0" /> */}
          </Row>}
        </Column>
      </Row>
    </Column>
  )
};

OrderNm.displayName = 'OrderNm';

export default OrderNm;
