/** @format */
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { injectIntl } from 'react-intl';
import HeaderPropTypes from './propTypes';

const StyledHeaderTitle = styled.div`
transition: all 2s linear;
  padding: ${({ theme }) => theme.spacing.p2} 0;
  hr {
    margin: 0;
  }
  ${media.sm`
  span{
  font-size: ${({ theme }) => theme.fonts.f8} !important;
`};
`;
StyledHeaderTitle.displayName = 'StyledHeaderTitle';

const HeaderTitle = ({ intl, activeIntl, title, titleBold, fontsize, ...rest }) => {
  const titleIntl = activeIntl ? title ? intl.formatMessage({ id: title }) : undefined : title;
  const titleIntlBold = activeIntl ? titleBold ? intl.formatMessage({ id: titleBold }) : undefined : titleBold;
  return (
    <StyledHeaderTitle >
      {titleIntl ?
        <Text
          value={titleIntl}
          size={fontsize}
          weight="normal"
          transform="uppercase"
          letterSpacing="0.05em"
          color="darkGrey"
        />
        : null}
      {titleIntlBold ?
        <Text
          value={titleIntlBold}
          size={fontsize}
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          color="darkGrey"
          {...rest}
        />
        : null}

      <Hr height="1px" width="10rem" color="primary" type="solid" top="2px" bottom="5px" />
    </StyledHeaderTitle>
  );
};

HeaderTitle.displayName = 'HeaderTitle';
// HeaderTitle.propTypes = HeaderPropTypes;
export default injectIntl(HeaderTitle);
