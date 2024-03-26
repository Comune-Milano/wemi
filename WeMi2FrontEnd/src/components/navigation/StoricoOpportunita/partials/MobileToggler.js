import React from 'react';
import styled, { css } from 'styled-components';
import AnchorLink from 'components/ui/AnchorLink';
import FaIcon from 'components/ui2/FaIcon';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';

const MobileToggler = ({ section }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Row fluid justifycontent="flex-end">
        <AnchorLink
          to={null}
          aria-label="Filtra"
          tabIndex="0"
          onClick={() => { setOpen(!open); }}
        >
          <Text
            size="f7"
            value="Filtra"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            padding="0 .5em 0 0"
          />
          <FaIcon
            icon="angle-down"
            fontSize="f6"
            title={"Espandi i filtri"}
            color="primary"
          />
        </AnchorLink>
      </Row>
      {open ? section : null}
    </>
  );
};

MobileToggler.displayName = 'Sezione a scomparsa mobile';

export default MobileToggler;
