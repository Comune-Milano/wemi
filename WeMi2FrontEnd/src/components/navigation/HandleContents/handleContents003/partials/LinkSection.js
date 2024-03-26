/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Text from 'components/ui/Text';

const LinkSection = ({ json, getValue, draft,valorilabel }) => (
    <Column xs="12" md="7" padding="0.5em 0 0">
       
    <Row fluid>
          <Text value="Links: " size="f7" color="blue" weight="bold" />
      </Row>
  <Row justifycontent="space-between" fluid>
      {(window.location.pathname.split('crud/')[1]===':new'||draft)&& json.ln_link_1 &&
          <Column xs="12" padding="1em 0">
              <Input id="ln_link_1" getValue={getValue.bind(this)}
               material
                initialValue={draft && draft.ln_link_1 ==="null"? null: draft && draft.ln_link_1} 
                intlLabel={valorilabel.ln_link_1} color="blue" />
              {draft && draft.ln_link_1 && <Row fluid padding="0" flex direction="column">
              </Row> }        
          </Column>
      }
      {(window.location.pathname.split('crud/')[1]===':new'||draft)&& json.ln_link_2 &&
          <Column xs="12"   padding="1em 0">
              <Input id="ln_link_2" getValue={getValue.bind(this)} material intlPlaceholder="ln_link_2" intlLabel="Link 2" color="blue" />
              {draft && draft.ln_link_2 && <Row fluid padding="0" flex direction="column">
                <Text tag="p" value={'Valore attuale: '} size="f8" color="darkGrey" weight="bold" padding="0.5em 0.5em 0 0" />              
              <Text tag="p" value={draft.ln_link_2} size="f8" color="darkGrey" padding="0.5em 0.5em 0 0" />
              </Row> }    
          </Column>
      }
  </Row>
</Column>
);

LinkSection.displayName = 'LinkSection';

export default LinkSection;
