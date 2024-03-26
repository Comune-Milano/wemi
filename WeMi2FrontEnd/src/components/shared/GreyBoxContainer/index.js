import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';
import { PAGE_HOME_SPAZIWEMI_URL } from 'types/url';
import { TextContainer } from './components.styled';

const GreyBoxContainer = ({ color }) => (
  <>
    <TextContainer>
      <Column padding="0">
        <Text
          value="Se hai bisogno di supporto per richiedere un servizio, o non hai spid, chiama il nostro servizio di assistenza allo"
          color={color}
          weight="bold"
          lineHeight="175%"
          letterSpacing="0.05em"
          size="f7"
          transform="uppercase"
        />
        &nbsp;
        <a href="tel:020202">
          <Text
            value="020202"
            color={color}
            weight="bold"
            decoration="underline"
            lineHeight="175%"
            letterSpacing="0.05em"
            size="f7"
          />
        </a>
        &nbsp;
        <Text
          value="Oppure rivolgiti allo"
          color={color}
          weight="bold"
          lineHeight="175%"
          letterSpacing="0.05em"
          size="f7"
          transform="uppercase"
        />
        &nbsp;
        <a href={PAGE_HOME_SPAZIWEMI_URL}>
          <Text
            value="SPAZIO WeMi"
            color={color}
            weight="bold"
            lineHeight="175%"
            letterSpacing="0.05em"
            size="f7"
            decoration="underline"
          />
        </a>
        &nbsp;
        <Text
          value="a te più vicino."
          color={color}
          weight="bold"
          lineHeight="175%"
          letterSpacing="0.05em"
          size="f7"
          transform="uppercase"
        />
      </Column>
    </TextContainer>
  </>
  );

GreyBoxContainer.displayName = 'GreyBoxContainer';
export default GreyBoxContainer;
