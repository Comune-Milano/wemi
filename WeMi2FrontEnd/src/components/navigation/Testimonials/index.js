/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Label from 'components/ui/Label';
import { LeftSection, RightSection } from './partials';

const TestimonialUsers = ({ contenuto }) => (
  <>
    <Row fluid justifycontent="space-between"   margin="2rem 0">
           <Label
          value="Esperienze dirette"
          intlFormatter
          size="f6"
          color="white"
          bgcolor="purple"
          transform="uppercase"
        />
    </Row>
    <Row>
        <LeftSection contenuto={contenuto} />
        <RightSection contenuto={contenuto}  />
    </Row>
</>
);

TestimonialUsers.displayName = 'TestimonialUsers';

export default TestimonialUsers;
