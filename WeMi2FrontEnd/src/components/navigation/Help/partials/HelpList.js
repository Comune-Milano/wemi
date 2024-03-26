/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import Mail from 'images/homepage/help/icona-mail.png';
import Phone from 'images/homepage/help/icona-phone.png';
import Question from 'images/homepage/help/question.png';
import Text from 'components/ui/Text';
import AnchorLink from 'components/ui/AnchorLink';
import { HelpJson } from 'mocks/HelpJson';

const Image = styled.div`
  background-image: url(${props => props.src});
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 8rem;
  ${media.sm`
    height: 2rem;
  `};
  ${media.md`
    height: 3rem;
  `};
  ${media.lg`
    height: 3rem;
  `};
`;
const MyColumn = styled(Column)`
  padding: 0;
  text-align: center;
`;
const MyRow = styled(Row)`
justify-content:center;
`;

const HelpList = () => (
  <MyRow justifycontent="center">
    <MyColumn lg={4} md={4} sm={12} xs={12}>
      <AnchorLink
        to="mailto:wemi.tatecolfbadanti@comune.milano.it"
      >
        <Image src={Mail} />
        <Text
          value={HelpJson.Icona.titolo}
          weight={HelpJson.Icona.weightBold}
          color={HelpJson.Icona.color}
          intlFormatter
          size="f4"
        />
      </AnchorLink>
      <div />
      <Text value={HelpJson.Icona.sottotitolo} weight={HelpJson.Icona.weight} intlFormatter />
      <Text
        value={HelpJson.Icona.sottotitoloBold}
        weight={HelpJson.Icona.weightBold}
        intlFormatter
      />
      <Text value={HelpJson.Icona.sottotitolo1} weight={HelpJson.Icona.weight} intlFormatter />
    </MyColumn>

    <MyColumn lg={4} md={4} sm={12} xs={12}>
      <AnchorLink
        intlFormatter
        intlNumber={`${HelpJson.Icona1.sottotitoloNumero}`}
      >
        <Image src={Phone} />
        <Text
          value={HelpJson.Icona1.titolo}
          weight={HelpJson.Icona1.weightBold}
          color={HelpJson.Icona1.color}
          intlFormatter
          size="f4"
        />
      </AnchorLink>
      <div />
      <Text value={HelpJson.Icona1.sottotitolo} weight={HelpJson.Icona1.weight} intlFormatter />
      <div />
      <Text
        value={HelpJson.Icona1.sottotitoloNumero}
        weight={HelpJson.Icona1.weightBold}
        color={HelpJson.Icona1.colorNumero}
        intlFormatter
        size="f4"
      />
    </MyColumn>

    <MyColumn lg={4} md={4} sm={12} xs={12}>
      <Image src={Question} />
      <Text
        value={HelpJson.Icona2.titolo}
        weight={HelpJson.Icona2.weightBold}
        color={HelpJson.Icona2.color}
        intlFormatter
        size="f4"
      />
      <div />
      <Text value={HelpJson.Icona2.sottotitolo} weight={HelpJson.Icona2.weight} intlFormatter />
      <Text
        value={HelpJson.Icona2.sottotitoloBold}
        weight={HelpJson.Icona2.weightBold}
        intlFormatter
      />
      <Text value={HelpJson.Icona2.sottotitolo1} weight={HelpJson.Icona2.weight} intlFormatter />
    </MyColumn>
  </MyRow>
);

HelpList.displayName = 'HelpList';

export default HelpList;
