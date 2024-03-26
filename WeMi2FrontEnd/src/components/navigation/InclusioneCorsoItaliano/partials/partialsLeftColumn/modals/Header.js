import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import AnchorLink from 'components/ui/AnchorLink';

const WrapperHeader = styled.div`
  background-color: ${colors.greyInput};
  padding: 1.7rem 3rem 2rem 3rem;
  justify-content: space-between;
  display: flex;
`;

const WrapperButton = styled.span`
  margin: 0 3rem 0 0;
`;

const Header = ({
  color = 'blue',
  label,
  pdf,
}) => (
  <WrapperHeader>
    <Text
      value={label}
      color={color}
      transform="uppercase"
      weight="bold"
      lineHeight="175%"
      size="f5"
      letterSpacing="0.05em"
    />
    <WrapperButton>
      <AnchorLink
        download={pdf}
        _blank
      >
        <Button
          width="auto"
          label="Stampa"
          color="blue"
        />
      </AnchorLink>
    </WrapperButton>
  </WrapperHeader>
);

export default Header;
