import React from 'react';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { Row, Column } from 'components/ui/Grid';
import SchedaPagineMenu from 'components/ui2/SchedaPagineMenu';
import { withRouter } from 'react-router';
import { PAGE_INCLUSIONE_GUIDA_MILANO } from 'types/url';
import { ImmagineMappa } from './guidapermilano.styled';
import { GUIDA_PER_MILANO } from './guidapermilano.constants';

const GuidaPerMilano = ({ history }) => (
  <SchedaPagineMenu
    infoScheda={{
      titoloScheda: {
        text: GUIDA_PER_MILANO.title,
        bgColor: 'orange',
      },
      bgColor: 'greyCardInclusione',
    }}
    justifycontent="unset"
    paddingBody="2.5em 0 3em"
  >
    <Column padding="0 20px">
      <Row justifycontent="center">
        <Text
          size="f6"
          value={GUIDA_PER_MILANO.subTitle}
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          align="center"
        />
      </Row>
      <Row justifycontent="center">
        <ImmagineMappa src={GUIDA_PER_MILANO.image} />
      </Row>
      <Row justifycontent="center">
        <Text
          size="f6"
          value={GUIDA_PER_MILANO.description}
          letterSpacing="0"
          align="center"
        />
      </Row>
      <Row fluid justifycontent="center" margin="2em 0 0 0">
        <Button
          color="orange"
          padding="5px 30px"
          label={GUIDA_PER_MILANO.buttonLabel}
          onClick={() => { history.push(PAGE_INCLUSIONE_GUIDA_MILANO); }}
          width="50%"
        />
      </Row>
    </Column>
  </SchedaPagineMenu>
);

GuidaPerMilano.displayName = 'GuidaPerMilano';
export default withRouter(GuidaPerMilano);
