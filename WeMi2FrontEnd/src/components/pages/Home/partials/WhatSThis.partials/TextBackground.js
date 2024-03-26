import React from 'react';
import Text from 'components/ui/Text';
import { WrapperBackground } from './style';
import { colors, fonts } from 'theme';
import AnchorLink from 'components/ui/AnchorLink';

const TextBackground = () => (
  <WrapperBackground>
    <Text
      value="Puoi accedere ai servizi direttamente online, chiamando lo"
      size="f7_5"
      transform="uppercase"
      letterSpacing="0.05rem"
      color="orange"
      weight="bold"
    />
    &nbsp;
    <a style={{ color: colors.orange, textDecoration: 'underline', fontWeight: 'bold', fontSize: fonts.size.f7_5  }} href="tel:020202">020202</a>
    &nbsp;
    <Text
      value="o recandoti nello"
      size="f7_5"
      transform="uppercase"
      letterSpacing="0.05rem"
      color="orange"
      weight="bold"
    />
    &nbsp;
    <AnchorLink
      to="/spazi-wemi"
      align="left"
      display="inline-block"
    >
      <Text
        value="SPAZIO WeMi"
        size="f7_5"
        letterSpacing="0.05rem"
        color="orange"
        weight="bold"
        decoration="underline"
      />
    </AnchorLink>
    &nbsp;
    <Text
      value="a te più vicino."
      size="f7_5"
      transform="uppercase"
      letterSpacing="0.05rem"
      color="orange"
      weight="bold"
    />
  </WrapperBackground>
);

TextBackground.displayName = 'TextBackground';

export default React.memo(TextBackground);
