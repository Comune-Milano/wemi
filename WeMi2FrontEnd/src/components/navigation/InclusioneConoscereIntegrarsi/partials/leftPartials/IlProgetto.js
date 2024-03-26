import React from 'react';
import TextSubTitle from './TextSubTitle';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { progetto } from '../costants';

const IlProgetto = () => (
  <>
    <TextSubTitle
      value={progetto.subTitle}
    />
    <Text
      value={progetto.text}
      lineHeight="175%"
      tag="div"
      size="f7"
    />
    <Text
      value={progetto.preLink}
      lineHeight="175%"
      size="f7"
    />
     &nbsp;
    <AnchorLink
      to={progetto.link}
      _blank
      align="left"
      display="inline-block"
    >
      <Text
        value={progetto.link}
        decoration="underline"
        fontStyle="italic"
        color="blueIcon"
        lineHeight="175%"
        size="f7"
      />
    </AnchorLink>
  </>
);

IlProgetto.displayName = 'IlProgettoNavigation';

export default IlProgetto;