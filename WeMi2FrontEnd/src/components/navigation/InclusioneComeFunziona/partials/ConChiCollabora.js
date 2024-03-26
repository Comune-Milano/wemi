import React from 'react';
import styled from 'styled-components';
import { List } from 'components/ui2/List';
import TextBox from './TextBox';
import { conChiCollaboraList } from './constants';

const WrapperList = styled.div`
  line-height: 175%;
  margin-top: 2em;
`;

const title = 'CON CHI COLLABORA';

const ConChiCollabora = () => (
  <TextBox
    title={title}
  >
    <WrapperList>
      <List>
        {conChiCollaboraList}
      </List>
    </WrapperList>
  </TextBox>
);

ConChiCollabora.displayName = 'ConChiCollaboraPage';

export default ConChiCollabora;
