/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import { HelpJson } from 'mocks/HelpJson';
import Label from 'components/ui/Label';
import { LeftSection, RightSection} from './partials';

const TestimonialUsers = () => (
  <>
    <Row fluid justifycontent="space-between" >
           <Label
          value={HelpJson.label.label}
          intlFormatter
          size="f6"
          color="white"
          bgcolor="green"
          transform="uppercase"
        />
    </Row>
    <Row fluid justifycontent="space-between" >
        <LeftSection HelpJson={HelpJson}  />
        <RightSection  HelpJson={HelpJson}  />
    </Row>
</>
);

TestimonialUsers.displayName = 'TestimonialUsers';

export default TestimonialUsers;
