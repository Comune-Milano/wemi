/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { DivWrapper, ListItem } from '..';

const Body = ({ bodyvalue }) => (
  <>
    {bodyvalue.arr.map(body => {
      if (body.label !== 'nome') {
        return (
          <ListItem key="row">
            <Text value={body.label} color="purple" weight="bold" />
            <Text value={body.value} color="darkgrey" />
          </ListItem>
        );
      }
      return <DivWrapper key="div" />;
    })}
  </>
);

Body.displayName = 'Body';

export default Body;
